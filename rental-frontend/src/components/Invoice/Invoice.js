import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Invoice({ token }) {
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);
  const [tool, setTool] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);

  // Fetch rental data when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/rentals/', {
        headers: {
          // Authorization: `Bearer ${token}`, // Uncomment for authentication if needed
        },
      })
      .then((res) => {
        setRentals(res.data);
      })
      .catch((err) => {
        setError("Error fetching rentals.");
        console.error("Error fetching rentals:", err);
      });
  }, [token]);

  const fetchToolData = (toolId) => {
    setTool(null); // Reset tool state for loading indication
    axios
      .get(`http://localhost:8000/api/tools/${toolId}/`)
      .then((res) => setTool(res.data))
      .catch((err) => console.error("Error fetching tool data:", err));
  };

  const fetchCustomerData = (customerId) => {
    setCustomer(null); // Reset customer state for loading indication
    axios
      .get(`http://localhost:8000/api/customers/${customerId}/`)
      .then((res) => setCustomer(res.data))
      .catch((err) => console.error("Error fetching customer data:", err));
  };

  const calculatePrice = () => {
    if (!selectedRental || !tool) return;
    const rentalDate = new Date(selectedRental.rental_date);
    const returnDate = selectedRental.return_date ? new Date(selectedRental.return_date) : new Date();
    const diffDays = Math.ceil((returnDate - rentalDate) / (1000 * 60 * 60 * 24));
    const price = (diffDays ? diffDays : 1) * tool.rental_price;
    setTotalPrice(price);
  };
  useEffect(() => {
    if (selectedRental) {
      fetchToolData(selectedRental.tool);
      fetchCustomerData(selectedRental.user);
    }
  }, [selectedRental]);

  useEffect(() => {
    calculatePrice();
  }, [tool, selectedRental]);

  const handleGenerateInvoice = () => {
    axios
      .post(`http://localhost:8000/api/rentals/${selectedRental.id}/generate_invoice/`, {}, {
        headers: {
          // Authorization: `Bearer ${token}`,  // Add token for authentication if needed
        }
      })
      .then((res) => {
        alert('Invoice generated!');
        console.log(res.data); // You can display the generated invoice details
      })
      .catch((err) => {
        console.error("Error generating invoice:", err);
        alert('Error generating invoice');
      });
  };

  const handleRentalChange = (e) => {
    const rentalId = e.target.value;
    const rental = rentals.find((r) => r.id === parseInt(rentalId));
    setSelectedRental(rental);
    setTotalPrice(0);  // Reset total price when a new rental is selected
  };
  
  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="min-h-screen   flex items-center justify-center bg-gray-100 bg-opacity-40">
      <div className="p-5 bg-white shadow-md rounded-lg md:ml-20 md:mr-20 md:mt-5 max-w-lg w-full">
        <h1 className="font-bold text-2xl text-fuchsia-950 mb-5 text-center">Invoice</h1>

        {/* Rental Selection */}
        <div className="mb-5">
          <label htmlFor="rentalId" className="block text-lg font-semibold mb-2">Select Rental ID</label>
          <select
            id="rentalId"
            className="p-2 w-full border rounded-md"
            onChange={handleRentalChange}
            value={selectedRental ? selectedRental.id : ''}
          >
            <option value="">Select Rental</option>
            {rentals.map((rental) => (
              <option key={rental.id} value={rental.id}>
                Rental ID: {rental.id}
              </option>
            ))}
          </select>
        </div>

        {selectedRental && tool && customer && (
          <div className="border-t pt-5">
            {/* Customer Information */}
            <h2 className="text-lg font-semibold mb-2 border-b pb-2">Customer Information</h2>
            <p className="mb-1"><strong>Name:</strong> {customer.cname}</p>
            <p className="mb-4"><strong>Email:</strong> {customer.email}</p>

            {/* Rental Information */}
            <h2 className="text-lg font-semibold mb-2 border-b pb-2">Rental Information</h2>
            <p className="mb-1"><strong>Rental ID:</strong> {selectedRental.id}</p>
            <p className="mb-1"><strong>Tool:</strong> {tool.name}</p>
            <p className="mb-1"><strong>Rental Date:</strong> {new Date(selectedRental.rental_date).toLocaleDateString()}</p>
            <p className="mb-4"><strong>Return Date:</strong> {selectedRental.return_date ? new Date(selectedRental.return_date).toLocaleDateString() : 'Not returned'}</p>

            {/* Pricing */}
            <h2 className="text-lg font-semibold mb-2 border-b pb-2">Pricing</h2>
            <p className="mb-1"><strong>Price per Day:</strong> ${tool.rental_price}</p>
            <p className="mb-1"><strong>Days Rented:</strong> {totalPrice > 0 ? totalPrice / tool.rental_price : 0}</p>
            <p className="mb-4 font-semibold text-xl"><strong>Total Price:</strong> ${totalPrice.toFixed(2)}</p>

            {/* Action Button */}
            <div className="text-center">
              <button
                className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Invoice;
