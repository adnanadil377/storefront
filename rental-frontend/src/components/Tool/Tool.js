import React from 'react'
import { Link } from 'react-router-dom'


const Tool = () => {
  return (
    <div>
        <div className='block mb-2 bg-opacity-80 text-2xl font-medium m-5 ml-7'>Tools</div>
        <div className='grid grid-cols-2 m-10'>
            <Link to='/tool/toollist' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col hover:drop-shadow-sm' >
                <div className='text-9xl  ml-auto mr-auto p-5'>
                📖
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    View
                </div>
            </Link>
            <Link to='/tool/toolreg' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col hover:drop-shadow-sm' >
                <div className='text-9xl  ml-auto mr-auto p-5'>
                📝
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    Add
                </div>
            </Link>
        </div>

    </div>
  )
}

export default Tool