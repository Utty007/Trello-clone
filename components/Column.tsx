import { Todo, TypedColumn } from '@/typings'
import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import TodoCard from './TodoCard'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/boardStore'
import MyModal from './AddTodoForm'

type props = {
    id: TypedColumn,
    todos: Todo[],
    index: number
}

function Column({ id, todos, index }: props) {
    const [searchString, setAddTodo, setNewTaskType] = useBoardStore(state => [state.searchString, state.setAddTodo, state.setNewTaskType])

    const idToTextColumn: {[key in TypedColumn]: string
    } = {
        "todo": 'Todo',
        "inProgress": "In Progress",
        "done": "Done"
    }

    const handleAddTodo = () => {
        setNewTaskType(id)
        setAddTodo(true)
    }
    return (
      <>
        <Draggable draggableId={id} index={index}>
            {(provided) => (
                <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >{
                    <Droppable droppableId={index.toString()} type='card'>
                        {(provided, snapShot) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className={`p-2 rounded-2xl shadow-sm ${snapShot.isDraggingOver? "bg-green-200" : "bg-white/50" }`}>
                                <h2 className='flex justify-between p-2 font-bold text-xl'>{idToTextColumn[id]} <span className='bg-gray-500 text-gray-200 rounded-full px-2 py-1 text-sm font-normal'>{!searchString? todos.length : todos.filter((todo) => todo.title.toLowerCase().includes(searchString.toLowerCase())).length}</span></h2> 
                                    <div className='space-y-2'>{todos.map((todo, index) => {
                                        if (searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())) return null;
                                        return <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
                                            {(provided) => (
                                                <TodoCard
                                                    todo={todo} index={index} id={id}
                                                    innerRef={provided.innerRef}
                                                    draggableProps={provided.draggableProps}
                                                    dragHandleProps={provided.dragHandleProps} />
                                            )}
                                        </Draggable>
                                    })}
                                    {provided.placeholder}
                                        <div className='flex items-end justify-end p-2'>
                                        <button onClick={handleAddTodo} className='text-green-500 hover:text-green-600'>
                                            <PlusCircleIcon className='h-10 w-10' />
                                        </button>
                                    </div>
                                    
                                    </div>
                            </div>
                        )}
                </Droppable>
                }</div>
            )}
        </Draggable>
        <MyModal />
      </>
  )
}

export default Column