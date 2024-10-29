import React from 'react'
import { Link } from 'react-router-dom'


const Tool = () => {
  return (
    <div className='grid grid-cols-2 m-10'>
        <Link to='/tool/toollist' className='drop-shadow-xl bg-white rounded-lg flex flex-col hover:drop-shadow-sm' >
            <div className='text-9xl  ml-auto mr-auto p-5'>
            📖
            </div>
            <div className='font-roboto ml-auto mr-auto p-5'>
                View
            </div>
        </Link>
        <Link to='/tool/toolreg' className='drop-shadow-xl bg-white rounded-lg flex flex-col hover:drop-shadow-sm' >
            <div className='text-9xl  ml-auto mr-auto p-5'>
            📝
            </div>
            <div className='font-roboto ml-auto mr-auto p-5'>
                Add
            </div>
        </Link>
    </div>
  )
}

export default Tool