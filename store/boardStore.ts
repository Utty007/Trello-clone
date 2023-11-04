import { create } from 'zustand'
import { Board, TypedColumn, Column, Todo } from '@/typings';
import { getTodosGroupedBycolumn } from '@/lib/getTodosGroupedByColumn';
import { ID, databases, storage } from '@/appwrite';

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  deleteTodo: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
  addTodo: boolean;
  setAddTodo: (addTodo: boolean) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  addTask: (todo: string, columnId: TypedColumn) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;
};

export const useBoardStore = create<BoardState>((set, get) => ({
  board: { columns: new Map<TypedColumn, Column>() },
  getBoard: async () => {
    const board = await getTodosGroupedBycolumn()
    set({board})
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columnId) => {
    await databases.updateDocument(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_TODOS_ID!, todo.$id, {
      title: todo.title,
      status: columnId
    })
  },
  searchString: "",
  setSearchString: (searchString) => set({ searchString }),
  deleteTodo: async (taskIndex, todo, id) => {
    const newColumns = new Map(get().board.columns)
    newColumns.get(id)?.todos.splice(taskIndex, 1)

    set({ board: { columns: newColumns } })

    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_ID!, todo.$id
    )
  }, 
  addTodo: false,
  setAddTodo: (addTodo) => set({ addTodo: addTodo }),
  newTaskInput: "",
  setNewTaskInput: (newTaskInput) => {
    set({newTaskInput: newTaskInput})
  },

  addTask: async (todo, columnId) => {
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
      }
    );
    set({ newTaskInput: "" });

    set((state) => {
        const newColumns = new Map(get().board.columns)
        
        const newTodo: Todo = {
          $id, $createdAt: new Date().toISOString(),
          title: todo, status: columnId
        }

        const column = newColumns.get(columnId)

        if (!column) {
          newColumns.set(columnId, {
            id: columnId, todos: [newTodo]
          })
        } else {
          newColumns.get(columnId)?.todos.push(newTodo)
      }
      console.log('Got here')
      return {
        board: {
          columns: newColumns
        }
      }
    })
  },
  newTaskType: "todo",
  setNewTaskType: (columnId) => set({newTaskType: columnId})
}))