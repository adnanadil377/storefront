import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SupplierList = () => {
    const [details, setDetails] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/customers/")
            .then((res) => {
                setDetails(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        
        <div className='p-5 bg-white shadow-md rounded-lg md:ml-20 md:mr-20 md:mt-5'>
            <h1 className='text font-bold text-2xl text-fuchsia-950 ml-10'>Customer List</h1>
            
            <div className='relative overflow-x-auto'>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead>
                        <tr>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Address</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {details.map((supplier) => (
                            <tr key={supplier.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{supplier.id}</th>
                                <td className="px-6 py-4">{supplier.cname}</td>
                                <td className="px-6 py-4">{supplier.address}</td>
                                <td className="px-6 py-4">{supplier.phone_number}</td>
                                <td className="px-6 py-4">{supplier.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        
    );
};

export default SupplierList;
