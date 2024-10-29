import axios from 'axios';
import React, { useState } from 'react';

const AddSupplier = () => {

    const [sname,setSname]=useState('')
    const [address, setAddress]=useState('')
    const [phone_number,setPhone_number]=useState('')
    const [email,setEmail]=useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

const handleSubmit=async (e) =>{
    e.preventDefault();
    try{
        const response=await axios.post("http://localhost:8000/api/suppliers/",{
            sname,
            address,
            phone_number,
            email,
        },{
            headers:{
                "Content-Type":"application/json"
            }
        }
    );
    console.log(response)
    setSuccess('Successful');
    setSname('');
    setAddress('');
    setPhone_number('');
    setEmail('');
    } catch (err){
        console.log(err)
        setError('Failed to add supplier.');
    }
}


  return (
    <div className='p-5 bg-white shadow-md rounded-lg md:ml-20 md:mr-20 md:mt-5'>
        
      <form className='pl-20 pr-20'
            onSubmit={handleSubmit}
      >
        {/* Supplier Name */}
        <div className="mb-6">
          <label 
            htmlFor="supplierName" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input 
            type="text" 
            id="supplierName" 
            value={sname}
            onChange={(e)=>setSname(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="Indigo" 
            required 
          />
        </div> 

        {/* Address */}
        <div className="mb-6">
          <label 
            htmlFor="address" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input 
            type="text" 
            id="address" 
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="123 Main St, City, Country" 
            required 
          />
        </div> 

        {/* Phone Number */}
        <div className="mb-6">
          <label 
            htmlFor="phone" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone Number
          </label>
          <input 
            type="tel" 
            id="phone" 
            value={phone_number}
            onChange={(e)=>setPhone_number(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="(123) 456-7890" 
            required 
          />
        </div> 

        {/* Email */}
        <div className="mb-6">
          <label 
            htmlFor="email" 
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
            placeholder="john.doe@company.com" 
            required 
          />
        </div> 
        {error && <div className='text-red-500'>{error}</div>}
        {success && <div className='text-green-500'>{success}</div>}

        {/* Submit Button */}
        <button 
          type="submit" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
                     focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
                     text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;
