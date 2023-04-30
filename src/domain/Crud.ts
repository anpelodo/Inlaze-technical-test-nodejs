export interface Crud<T> {
  add(t: Omit<T, "id">): Promise<T>;
  edit(id: number, t: Partial<Omit<T, "id">>): Promise<T>;
  getById(id: number): Promise<T | null>;
  getList(skip?: number | undefined, size?: number | undefined): Promise<T[]>;
  delete(id: number): Promise<void>;
}
