import React from 'react'
import { MdDeleteForever } from "react-icons/md";

export default function Note({ id, text, date, handleDeleteNote }) {
  return (
      <div 
      className='bg-yellow-200 mb-10 p-2 rounded-lg h-[170px] flex flex-col justify-between whitespace-pre-wrap'>
      <span>{text}</span>
      <div className='flex flex-row justify-between align-middle'>
            <small>{date}</small>
            <MdDeleteForever
                  className='w-5 h-5 text-red-600 hover:text-red-400 hover:cursor-pointer'
                  onClick={() => handleDeleteNote(id)}/>
      </div>
    </div>
  )
}
