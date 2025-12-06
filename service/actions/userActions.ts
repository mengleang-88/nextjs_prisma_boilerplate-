'use server';

import { UserRepository, UserInput } from '@/service/repositories/UserRepository';
import { revalidatePath } from 'next/cache';

const userRepository = new UserRepository();

export async function getUsers() {
  try {
    const users = await userRepository.list();
    return { success: true, data: users };
  } catch (error) {
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
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to create user' };
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
  } catch (error) {
    return { success: false, error: 'Failed to delete user' };
  }
}
