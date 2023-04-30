import { PrismaClient } from "@prisma/client";

import { User, UserUpdateDTO, UserWithoutIdDTO } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async add(user: UserWithoutIdDTO): Promise<User> {
    const { name, email } = { ...user };

    try {
      const newUser = await this.db.user.create({
        data: {
          name: name,
          email: email
        }
      });

      return newUser;
    } catch (error) {
      return Promise.reject();
    }
  }

  async edit(id: number, partialUser: UserUpdateDTO): Promise<User> {
    const { email, name } = { ...partialUser };

    try {
      const user = await this.db.user.update({
        where: {
          id: id
        },
        data: {
          email: email,
          name: name
        }
      });

      return user;
    } catch (error) {
      return Promise.reject();
    }
  }

  async getById(id: number): Promise<User | null> {
    try {
      const user = await this.db.user.findUnique({
        where: {
          id
        }
      });

      return user;
    } catch (error) {
      return Promise.reject();
    }
  }

  async getList(skip?: number, size?: number): Promise<User[]> {
    try {
      const users = await this.db.user.findMany({
        skip: skip,
        take: size
      });

      return users;
    } catch (error) {
      return Promise.reject();
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.db.user.delete({
        where: {
          id: id
        }
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  }
}
