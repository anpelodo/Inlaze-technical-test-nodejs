export class User {
    constructor(
        readonly id: number,
        readonly email: string,
        readonly name: string
    ) { }
}

export type UserWithoutIdDTO = Omit<User, "id">;
export type UserUpdateDTO = Partial<UserWithoutIdDTO>;