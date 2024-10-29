import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div  className='grid md:grid-cols-3  gap-5 p-5 m-10 max-h-full' >
        <Link to='/customers' className='drop-shadow-xl bg-white rounded-lg flex flex-col' >
            <div className='text-9xl  ml-auto mr-auto p-5'>
            🙍‍♂️
            </div>
            <div className='font-roboto ml-auto mr-auto p-5'>
                Customers
            </div>
        </Link>
        <Link to='/tool' className='drop-shadow-xl bg-white rounded-lg flex flex-col' >
            <div className='text-9xl  ml-auto mr-auto p-5'>
            🛠️
            </div>
            <div className='font-roboto ml-auto mr-auto p-5'>
                Tools
            </div>
        </Link>
        <Link to='/suppliers' className='drop-shadow-xl bg-white rounded-lg flex flex-col' >
            <div className='text-9xl  ml-auto mr-auto p-5'>
            👨‍💼
            </div>
            <div className='font-roboto ml-auto mr-auto p-5'>
                Suppliers
            </div>
        </Link>
        <Link to='/suppliers' className='drop-shadow-xl bg-white rounded-lg flex flex-col' >
            <div className='text-9xl  ml-auto mr-auto p-5'>
            🤝
            </div>
            <div className='font-roboto ml-auto mr-auto p-5'>
                Lease
            </div>
        </Link>
        <Link to='/invoice' className='drop-shadow-xl bg-white rounded-lg flex flex-col' >
            <div className='text-9xl  ml-auto mr-auto p-5'>
            🧾
            </div>
            <div className='font-roboto ml-auto mr-auto p-5'>
                Invoice
            </div>
        </Link>
        <Link to='/suppliers' className='drop-shadow-xl bg-white rounded-lg flex flex-col' >
            <div className='text-9xl  ml-auto mr-auto p-5'>
            🛒
            </div>
            <div className='font-roboto ml-auto mr-auto p-5'>
                Purchase order
            </div>
        </Link>
    </div>
  )
}

export default Home