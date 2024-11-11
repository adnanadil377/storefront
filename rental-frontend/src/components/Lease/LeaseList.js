import axios from 'axios';
import React, { useEffect, useState } from 'react';

function LeaseList({ token }) {
  const [rentals, setRentals] = useState([]);
  const [tools, setTools] = useState([]);  // State to store tools data
  const [customers, setCustomers] = useState([]);  // State to store customers data

  useEffect(() => {
    // Fetch rental data
    axios
      .get('http://localhost:8000/api/rentals/', {
        headers: {
          // Authorization: `Bearer ${token}`,  // Uncomment if needed for authentication
        },
      })
      .then((res) => setRentals(res.data))
      .catch((err) => console.error("Error fetching rentals:", err));

    // Fetch tool data
    axios
      .get('http://localhost:8000/api/tools/', {
        headers: {
          // Authorization: `Bearer ${token}`,  // Uncomment if needed for authentication
        },
      })
      .then((res) => setTools(res.data))
      .catch((err) => console.error("Error fetching tools:", err));

    // Fetch customer data
    axios
      .get('http://localhost:8000/api/customers/', {
        headers: {
          // Authorization: `Bearer ${token}`,  // Uncomment if needed for authentication
        },
      })
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching customers:", err));
  }, [token]);

  const handleReturn = (rentalId) => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    axios
      .patch(`http://localhost:8000/api/rentals/${rentalId}/`, { return_date: today }, {
        headers: {
          // Authorization: `Bearer ${token}`,  // Uncomment if needed for authentication
        },
      })
      .then((res) => {
        // Update state with the new return date
        setRentals((prevRentals) =>
          prevRentals.map((rental) =>
            rental.id === rentalId ? { ...rental, return_date: today } : rental
          )
        );
      })
      .catch((err) => console.error("Error updating rental return date:", err));
  };

  // Utility function to get tool name by id
  const getToolName = (toolId) => {
    const tool = tools.find((tool) => tool.id === toolId);
    return tool ? tool.name : 'Unknown Tool';
  };

  // Utility function to get customer name by id
  const getCustomerName = (customerId) => {
    const customer = customers.find((customer) => customer.id === customerId);
    return customer ? customer.cname : 'Unknown Customer';
  };

  return (
    <div className='p-5 bg-white bg-opacity-40 shadow-md rounded-lg md:ml-20 md:mr-20 md:mt-5'>
      <h1 className='text font-bold text-2xl text-fuchsia-950 ml-10'>Lease List</h1>
      <div className='relative overflow-x-auto'>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Tool ID</th>
              <th scope="col" className="px-6 py-3">Tool Name</th>
              <th scope="col" className="px-6 py-3">Customer ID</th>  {/* Display customer name */}
              <th scope="col" className="px-6 py-3">Customer Name</th>  {/* Display customer name */}
              <th scope="col" className="px-6 py-3">Rental Date</th>
              <th scope="col" className="px-6 py-3">Return Date</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rentals.map((rental) => (
              <tr key={rental.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{rental.id}</th>
                <td className="px-6 py-4">{rental.tool}</td>
                <td className="px-6 py-4">{getToolName(rental.tool)}</td> {/* Display tool name */}
                <td className="px-6 py-4">{rental.user}</td>
                <td className="px-6 py-4">{getCustomerName(rental.user)}</td> {/* Display customer name */}
                <td className="px-6 py-4">{new Date(rental.rental_date).toLocaleDateString()}</td>
                <td className="px-6 py-4">{rental.return_date ? new Date(rental.return_date).toLocaleDateString() : "Not returned"}</td>
                <td className="px-6 py-4">
                  {rental.return_date ? (
                    <span className="text-gray-500">Returned</span>
                  ) : (
                    <button
                      onClick={() => handleReturn(rental.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaseList;
