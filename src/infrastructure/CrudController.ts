import { Request, Response } from "express";

export interface CrudController {
  create(req: Request, res: Response): Promise<void>;

  edit(req: Request, res: Response): Promise<void>;

  delete(req: Request, res: Response): Promise<void>;

  getList(_req: Request, res: Response): Promise<void>;

  getById(req: Request, res: Response): Promise<void>;
}
