import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ToolReg = () => {
    const [name, setToolName] = useState('');
    const [description, setDescription] = useState('');
    const [rental_price, setPrice] = useState('');
    const [quantity, setQty] = useState('');
    const [category, setCategory] = useState('');
    const [supplier_id, setSupplier_id] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [suppliers, setSuppliers] = useState([]); // State to hold suppliers

    // Fetch suppliers when the component mounts
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/suppliers/");
                setSuppliers(response.data); // Assuming the API returns an array of suppliers
            } catch (err) {
                console.error(err);
                setError('Failed to fetch suppliers. Please try again.');
            }
        };

        fetchSuppliers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (rental_price < 0 || quantity < 0) {
            setError('Price and quantity must be non-negative');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/tools/", {
                name,
                description,
                rental_price,
                quantity,
                category,
                supplier_id,
            }, {
                headers: {
                    "Content-Type": 'application/json'
                }
            });
            console.log(response);
            setSuccess('Successful');
            // Clear form
            setToolName('');
            setDescription('');
            setPrice('');
            setQty('');
            setCategory('');
            setSupplier_id('');
        } catch (err) {
            console.error(err);
            setError('Failed to register the tool. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-row justify-center bg-slate-50'>
            <form className='bg-white rounded-lg shadow-lg' onSubmit={handleSubmit}>
                <div className='p-2'>
                    <input type='text'
                        placeholder='Tool Name'
                        className='rounded-2xl'
                        value={name}
                        onChange={(e) => setToolName(e.target.value)}
                        required />
                </div>
                <div className='p-2'>
                    <input type='text'
                        placeholder='Description'
                        className='rounded-2xl'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required />
                </div>
                <div className='p-2'>
                    <input type='number'
                        placeholder='Price'
                        className='rounded-2xl'
                        value={rental_price}
                        onChange={(e) => setPrice(e.target.value)}
                        required />
                </div>
                <div className='p-2'>
                    <input type='number'
                        placeholder='Quantity'
                        className='rounded-2xl'
                        value={quantity}
                        onChange={(e) => setQty(e.target.value)}
                        required />
                </div>
                <div className='p-2'>
                    <input type='text'
                        placeholder='Category'
                        className='rounded-2xl w-full'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required />
                </div>
                <div className='p-2'>
                    <select
                        className='rounded-2xl w-full'
                        value={supplier_id}
                        onChange={(e) => setSupplier_id(e.target.value)}
                        required>
                        <option value='' disabled>Select Supplier</option>
                        {suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>
                                {supplier.sname} {/* Adjust this if your supplier model has a different field for the name */}
                            </option>
                        ))}
                    </select>
                </div>
                {error && <div className='text-red-500'>{error}</div>}
                {success && <div className='text-green-500'>{success}</div>}
                <button 
                    className='w-full bg-cyan-950 text-white py-2 rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500'
                    disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
            </form>
        </div>
    );
}

export default ToolReg;
