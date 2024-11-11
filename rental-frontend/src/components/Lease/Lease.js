import React from 'react'
import { Link } from 'react-router-dom'

const Lease = () => {
  return (
    <div>
        <div className='block mb-2 bg-opacity-80 text-2xl font-medium m-5 ml-7'>Lease</div>
        <div className='grid grid-cols-2 m-10'>
            <Link to='/lease/leaselist' className='drop-shadow-xl bg-white rounded-lg flex flex-col hover:drop-shadow-sm' >
                <div className='text-9xl  ml-auto mr-auto p-5'>
                📖
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    View
                </div>
            </Link>
            <Link to='/lease/addlease' className='drop-shadow-xl bg-white rounded-lg flex flex-col hover:drop-shadow-sm' >
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

export default Lease