import { Request, Response } from "express";

import { UserCrud } from "../application/UserCrud";
import { User, UserWithoutIdDTO } from "../domain/User";
import { CrudController } from "./CrudController";

export class UserController implements CrudController {
  constructor(private readonly userCrud: UserCrud) {}

  async create(req: Request, res: Response): Promise<void> {
    const { name, email } = { ...req.body } as UserWithoutIdDTO;

    //TODO use validator

    const user = await this.userCrud
      .create({ name, email })
      .catch(() => res.status(500));

    res.status(200).send({
      user
    });
  }

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const { name, email } = { ...req.body } as User;

    //TODO use validator

    await this.userCrud
      .edit(Number(id), { name, email })
      .catch(() => res.status(500));

    res.status(200).send();
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id;

    //TODO use validator

    await this.userCrud.delete(Number(id)).catch(() => res.status(500));

    res.status(200).send();
  }

  async getList(_req: Request, res: Response) {
    const list = await this.userCrud.getList().catch(() => res.status(500));

    res.status(200).send(list);
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id;

    //TODO use validator

    const user = await this.userCrud
      .getById(Number(id))
      .catch(() => res.status(500));

    res.status(200).send({
      user
    });
  }
}
