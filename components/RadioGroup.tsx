import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useBoardStore } from '@/store/boardStore'

type props = {
  className: string
}

const plans = [
  {
    id: "todo",
    name: 'Todo',
    description: 'A new task to be completed',
    color: ' bg-red-500',
  },
  {
    id: "inProgress",
    name: 'In Progress',
    description: 'A task currently being worked on',
    color: ' bg-yellow-500',
  },
  {
    id: "done",
    name: 'Done',
    description: 'A task that has been completed',
    color: ' bg-green-500',
  },
]

export default function TodoTypeRadioGroup() {
  const [newTaskType, setNewTaskType] = useBoardStore(state => [state.newTaskType, state.setNewTaskType])
  // const [selected, setSelected] = useState(newTaskType)

  return (
    <div className="w-full px-4 py-8">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={newTaskType} onChange={(e) => {setNewTaskType(e)}}>
          <div className="space-y-2">
            {plans.map((plan) => (
              <RadioGroup.Option
                key={plan.id}
                value={plan.id}
                className={({ active, checked }) =>
                  `${active
                      ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${checked ? `text-white ${plan.color}` : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                            <span>
                              {plan.name}
                            </span>{' '}
                            <span aria-hidden="true">&middot;</span>{' '}
                            <span>{plan.description}</span>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

function CheckIcon({className}: props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
