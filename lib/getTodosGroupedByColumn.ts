import { databases } from "@/appwrite"
import { Board, Column, TypedColumn } from "@/typings";

export const getTodosGroupedBycolumn = async () => {
    const data = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_ID!)
    const todos = data.documents;

    const column = todos.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            })
        }

        acc.get(todo.status)!.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
        }) 
        return acc
    }, new Map<TypedColumn, Column>)

    const columnTypes: TypedColumn[] = ["todo", "inProgress", "done"]
    for (const columnType of columnTypes) {
        if (!column.get(columnType)) {
            column.set(columnType, {
                id: columnType, todos: []
            })
        }
    }

    console.log(column)

    const sortedColumns = new Map(Array.from(column.entries()).sort(
        (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    ));

    const board: Board = {
        columns: sortedColumns
    }

    return board
}


 