import { AiFillDelete } from "react-icons/ai"; 
import { AiFillCheckCircle } from "react-icons/ai"; 
import React from 'react'

export const TodoItems = ({text, id, isComplete, deleteTodo, toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2 '>
        <div  onClick={()=>{toggle(id)}}className="flex flex-1 items-center cursor-pointer ">
            {isComplete && <AiFillCheckCircle className="text-2xl"/>}
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete ? "":""}`}>{text}</p>
        </div>
        <AiFillDelete onClick={()=>{deleteTodo(id)}} className="text-2xl cursor-pointer"/>
    </div>
  )
}
