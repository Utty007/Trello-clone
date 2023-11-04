import { Dialog, Transition } from '@headlessui/react'
import { FormEvent, Fragment } from 'react'
import { useBoardStore } from '@/store/boardStore'
import TodoTypeRadioGroup from './RadioGroup'

export default function MyModal() {
  const [addTodo, setAddTodo, newTaskInput, setNewTaskInput, addTask, newTaskType] = useBoardStore(state => [state.addTodo, state.setAddTodo, state.newTaskInput, state.setNewTaskInput, state.addTask, state.newTaskType])

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!newTaskInput) return;
    addTask(newTaskInput, newTaskType)
    setAddTodo(false)
  }
  return (
    <>
      <Transition appear show={addTodo} as={Fragment}>
        <Dialog as="form" className="relative z-10" onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
        <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto" onClick={() => {setAddTodo(false)}}>
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add a task
                  </Dialog.Title>
                  <div className="mt-2">
                    <input type='text' value={newTaskInput} onChange={e => setNewTaskInput(e.target.value)} placeholder='Enter a task here...' className='border border-gray-300 shadow-md bg-white w-full p-5 outline-none rounded-md focus:border-black-2' />
                    <TodoTypeRadioGroup />
                  </div>
                  
                   <div className="mt-4">    
                    <button
                      disabled={!newTaskInput}
                      type="button" onClick={handleSubmit}
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed"
                    >
                      Add Task
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
