export interface Crud<T> {
    add(t: Partial<Omit<T, "id">>): Promise<T>;
    edit(id: number, t: Omit<T, "id">): Promise<void>;
    getById(id: number): Promise<T | null>;
    getList(skip?: number | undefined, size?: number | undefined): Promise<T[] | null>;
    delete(id: number): Promise<void>;
}