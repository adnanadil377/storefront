import React from 'react'
import { Link } from 'react-router-dom'

const Supplier = () => {
  return (
    <div>
        <div className='block mb-2 bg-opacity-80 text-2xl font-medium m-5 ml-7'>Supplier</div>
        
        <div className='grid grid-cols-2 m-10'>
            <Link to='/suppliers/supplierlist' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col hover:drop-shadow-sm' >
                <div className='text-9xl  ml-auto mr-auto p-5'>
                📖
                </div>
                <div className='font-roboto ml-auto mr-auto p-5'>
                    View
                </div>
            </Link>
            <Link to='/suppliers/addsupplier' className='drop-shadow-xl bg-white bg-opacity-80 rounded-lg flex flex-col hover:drop-shadow-sm' >
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

export default Supplier