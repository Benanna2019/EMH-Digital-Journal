import { init, tx, id } from "@instantdb/core";

export type Todo = {
    id: string;
    name: string;
    completed: boolean;
    createdAt: string;
    updatedAt?: string;
}

type Schema = {
    todos: Todo
}

export const db = init<Schema>({ appId: "90ce8bcd-38c8-4ee5-a168-7d10d24966eb" });

export { tx, id }



