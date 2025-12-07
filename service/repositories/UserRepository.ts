import { User } from '@/service/models/User';
import { PrismaClient } from '@prisma/generated/client';
import { prisma as prismaSingaton } from '@/service/config/prisma';

export interface UserInput {
  name: string;
  email: string;
}

export interface UserRepositoryInterface {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  list(): Promise<User[]>;
  create(input: UserInput): Promise<User>;
  update(id: string, patch: Partial<UserInput>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}

export class UserRepository implements UserRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this.prisma = prisma ?? prismaSingaton;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });
    return user ? this.map(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ 
      where: { email },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });
    return user ? this.map(user) : null;
  }

  async list(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });
    return users.map((u) => this.map(u));
  }

  async create(input: UserInput): Promise<User> {
    const created = await this.prisma.user.create({
      data: { name: input.name, email: input.email, password: "" },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
    });
    return this.map(created);
  }

  async update(id: string, patch: Partial<UserInput>): Promise<User | null> {
    try {
      const updated = await this.prisma.user.update({
        where: { id },
        data: patch,
        select: { id: true, name: true, email: true, createdAt: true, updatedAt: true }
      });
      return this.map(updated);
    } catch (e) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.user.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  private map(u: User): User {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    };
  }
}
