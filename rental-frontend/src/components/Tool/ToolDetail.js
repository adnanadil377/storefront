import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ToolDetail = () => {
    const { id } = useParams(); // Get the tool ID from the URL
    const [tool, setTool] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchToolDetail = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/tools/${id}/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTool(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchToolDetail();
    }, [id]);

    if (loading) return <p className="text-center text-gray-500">Loading...</p>;
    if (error) return <p className="text-red-500 text-center">Error: {error}</p>;

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
            {tool ? (
                <>
                    <h1 className="text-2xl font-bold mb-4">{tool.name}</h1>
                    <p className="text-gray-700 mb-2">{tool.description}</p>
                    <p className="text-lg font-semibold mb-2">Price per day: <span className="text-green-500">${tool.rental_price}</span></p>
                    <p className="text-lg mb-2">Category: <span className="text-blue-500">{tool.category}</span></p>
                    <p className="text-lg">Available quantity: <span className="text-yellow-500">{tool.quantity}</span></p>
                </>
            ) : (
                <p className="text-center text-gray-500">Tool not found.</p>
            )}
        </div>
    );
};

export default ToolDetail;
