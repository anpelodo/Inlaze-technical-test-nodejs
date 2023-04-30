import { User, UserUpdateDTO, UserWithoutIdDTO } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserCrud {
  constructor(private readonly userRepo: UserRepository) {}

  async create(user: UserWithoutIdDTO): Promise<User> {
    return await this.userRepo.add(user);
  }

  async edit(id: number, updateUser: UserUpdateDTO): Promise<User> {
    return await this.userRepo.edit(id, updateUser);
  }

  async delete(id: number): Promise<void> {
    return await this.userRepo.delete(id);
  }

  async getList(skip?: number, size?: number): Promise<User[] | null> {
    return await this.userRepo.getList(skip, size);
  }

  async getById(id: number): Promise<User | null> {
    return await this.userRepo.getById(id);
  }
}
