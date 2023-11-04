'use client'

import { useBoardStore } from '@/store/boardStore';
import { Todo, TypedColumn } from '@/typings'
import { XCircleIcon } from '@heroicons/react/24/solid';
import React from 'react'
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
type propsData = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

function TodoCard({ todo, index, id, innerRef, draggableProps, dragHandleProps }: propsData) {
  const deleteTodo = useBoardStore(state => state.deleteTodo)
  return (
    <div className='bg-white rounded-md drop-shadow-md my-2 py-2 pl-1' ref={innerRef} {...dragHandleProps} {...draggableProps}>
      <div className='flex justify-between items-center p-2'>
        <p>{todo.title}</p>
        <button onClick={() => deleteTodo(index, todo, id)} className='text-red-500 hover:text-red-600'><XCircleIcon className='ml-5 h-8 w-8' /></button>
      </div>
      {/*Add image here */}
    </div>
  )
}

export default TodoCard