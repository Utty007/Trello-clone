export interface Board {
 columns: Map<TypedColumn, Column>
}

export type TypedColumn = "todo" | "inProgress" | "done"

export interface Column {
    id: TypedColumn;
    todos: Todo[]
}

interface Todo {
    $id: string,
    $createdAt: string,
    title: string,
    status: TypedColumn,
}