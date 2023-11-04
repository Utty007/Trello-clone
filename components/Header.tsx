'use client'
import Image from 'next/image'
import React from 'react'
import Avatar from 'react-avatar'
import { UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { useBoardStore } from '@/store/boardStore'

function Header() {
  const [searchString, setSearchString] = useBoardStore(state => [state.searchString, state.setSearchString])
  return (
    <header>
      <div className='flex flex-col md:flex-row items-center justify-between bg-gray-500/10 p-5 rounded-b-2xl'>
        <div className='absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-pink-400 to-[#0055d1] rounded-md filter blur-3xl opacity-50 -z-50' />
        <Image src='https://links.papareact.com/c2cdd5' alt='Trello Clone' width={300} height={100} className='w-44 md:w-56 pb-10 md:pb-0 object-contain' />
        <div className='flex items-center flex-1 space-x-5 justify-end w-full'>
              <form className='flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial'>
                  <MagnifyingGlassIcon className='h-6 w-6 text-gray-400' />
                  <input type='text' value={searchString} onChange={e => setSearchString(e.target.value)} placeholder='Search' className='flex-1 p-2 outline-none'/>
                  <button hidden>search</button>
          </form>
          <Avatar name='Kayode Uthman' size='50' round color='#0055d1' />
        </div>
      </div>
    </header>
  )
}

export default Header

//