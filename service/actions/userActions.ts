'use server';

import { UserRepository, UserInput } from '@/service/repositories/UserRepository';
import { revalidatePath } from 'next/cache';
import { prisma } from "../config/prisma";
import bcrypt from "bcryptjs";

export async function signupAction(formData: { email: string; password: string; name: string }): Promise<{ success: boolean; error?: string }> {
  const { email, password, name } = formData;
  if (!email || !password || !name) return { success: false, error: "Email, password, and name required" };
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { success: false, error: "Email already exists" };
  const hash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email, password: hash, name } });
  return { success: true };
}

interface UserResult {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export async function loginAction(formData: { email: string; password: string }): Promise<{ success: boolean; user?: UserResult; error?: string }> {
  const { email, password } = formData;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) return { success: false, error: "Invalid credentials" };
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return { success: false, error: "Invalid credentials" };
  // Return only safe fields
  const { id, name, email: userEmail, createdAt, updatedAt } = user;
  return { success: true, user: { id, name, email: userEmail, createdAt, updatedAt } };
}

const userRepository = new UserRepository();

export async function getUsers() {
  try {
    const users = await userRepository.list();
    return { success: true, data: users };
  } catch(error) {
    console.log('Failed to fetch users', error);
    return { success: false, error: 'Failed to fetch users' };
  }
}

export async function createUser(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!name || !email) {
      return { success: false, error: 'Name and email are required' };
    }

    const userInput: UserInput = { name, email };
    const user = await userRepository.create(userInput);
    
    revalidatePath('/users');
    return { success: true, data: user };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
    return { success: false, error: errorMessage };
  }
}

export async function deleteUser(id: string) {
  try {
    const deleted = await userRepository.delete(id);
    if (deleted) {
      revalidatePath('/users');
      return { success: true };
    }
    return { success: false, error: 'User not found' };
  } catch {
    return { success: false, error: 'Failed to delete user' };
  }
}
