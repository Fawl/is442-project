import React, { useEffect, useState } from 'react'
import { ResponsiveContainer } from 'recharts'
import EventDetail from './event-detail'

export default function EventTable({ ticketEvents, onSelect, onSet }: any) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='mt-3 text-center sm:ml-0 sm:mt-0 sm:text-left border rounded-lg border-gray-300 p-4 shadow-md overflow-auto'>
      <p className='mb-5'>Event Details</p>
      <ResponsiveContainer width='99%' height={400}>
        <div>
          <div className='relative inline-block text-left w-full mb-4'>
            <div>
              <button
                type='button'
                onClick={toggleMenu}
                className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                id='menu-button'
                aria-expanded={isOpen}
                aria-haspopup='true'
              >
                Select event
                <svg
                  className='-mr-1 h-5 w-5 text-gray-400'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>

            {isOpen && (
              <div
                className='absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='menu-button'
              >
                <div className='py-1' role='none'>
                  {ticketEvents.map((event: any) => (
                    <a
                      key={event.eventName}
                      href='#'
                      className={`text-gray-700 block px-4 py-2 text-sm ${
                        event.selected == true ? 'bg-orange-100' : ''
                      }`}
                      role='menuitem'
                      id='menu-item-0'
                      onClick={() => {
                        toggleMenu()
                        onSelect(event.eventName)
                      }}
                      >
                      {event.eventName}
                    </a>
                  ))}  
                </div>
              </div>
            )}
          </div>
          {ticketEvents.map((event: any) => (event.selected && <EventDetail key={event.eventName} event={event}/>))}
        </div>
      </ResponsiveContainer>
    </div>
  )
}
function suseEffect(arg0: () => void, arg1: any[]) {
  throw new Error('Function not implemented.')
}

