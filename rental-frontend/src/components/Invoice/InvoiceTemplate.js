import axios from 'axios';
import React, { useEffect, useState } from "react";
import { FaBuilding, FaEnvelope, FaPhone, FaTrash } from "react-icons/fa";

const InvoiceTemplate = ({token}) => {
  const [items, setItems] = useState([
    { id: 1, name: "Website Development", quantity: 1, price: 1000, total: 1000 },
    { id: 2, name: "UI/UX Design", quantity: 2, price: 500, total: 1000 }
  ]);

  const [companyDetails] = useState({
    name: "Tech Solutions Inc.",
    address: "123 Business Avenue, Tech Park",
    phone: "+1 234 567 890",
    email: "contact@techsolutions.com",
    logo: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=100"
  });

  const [clientDetails] = useState({
    name: "Client Corporation",
    address: "456 Client Street, Business District",
    phone: "+1 987 654 321",
    email: "info@clientcorp.com"
  });

  const [invoiceDetails] = useState({
    number: "INV-2024-001",
    date: "2024-01-20",
    dueDate: "2024-02-20"
  });

  const calculateSubtotal = () => items.reduce((sum, item) => sum + item.total, 0);
  const calculateTax = () => calculateSubtotal() * 0.1;
  const calculateTotal = () => calculateSubtotal() + calculateTax();

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: "",
      quantity: 1,
      price: 0,
      total: 0
    };
    setItems([...items, newItem]);
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === "quantity" || field === "price") {
          updatedItem.total = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    }));
  };

  const handleDeleteItem = (id) => setItems(items.filter(item => item.id !== id));
  const [rentals, setRentals] = useState([]);
  const [selectedRental, setSelectedRental] = useState(null);
  const [tool, setTool] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch rental data when the component mounts
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/rentals/', {
        headers: {
        //   Authorization: `Bearer ${token}`, // Uncomment for authentication if needed
        },
      })
      .then((res) => {
        setRentals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching rentals.");
        setLoading(false);
        console.error("Error fetching rentals:", err);
      });
  }, [token]);

  const fetchToolData = (toolId) => {
    setTool(null); // Reset tool state for loading indication
    axios
      .get(`http://localhost:8000/api/tools/${toolId}/`, {
        headers: {
        //   Authorization: `Bearer ${token}`, // Uncomment for authentication if needed
        },
      })
      .then((res) => setTool(res.data))
      .catch((err) => console.error("Error fetching tool data:", err));
  };

  // Fetch customer data based on selected rental user ID
  const fetchCustomerData = (customerId) => {
    setCustomer(null); // Reset customer state for loading indication
    axios
      .get(`http://localhost:8000/api/customers/${customerId}/`, {
        headers: {
        //   Authorization: `Bearer ${token}`, // Uncomment for authentication if needed
        },
      })
      .then((res) => setCustomer(res.data))
      .catch((err) => console.error("Error fetching customer data:", err));
  };

  const calculatePrice = () => {
    if (!selectedRental || !tool) return;

    const rentalDate = new Date(selectedRental.rental_date);
    const returnDate = selectedRental.return_date
      ? new Date(selectedRental.return_date)
      : new Date(); // Default to today if not returned

    const diffTime = Math.abs(returnDate - rentalDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Calculate days rented

    const price = diffDays * tool.price_per_day;
    setTotalPrice(price);
  };

  // Fetch rental details whenever a new rental is selected
  useEffect(() => {
    if (selectedRental) {
      fetchToolData(selectedRental.tool);
      fetchCustomerData(selectedRental.user);
    }
  }, [selectedRental]);

   // Calculate price whenever tool or selectedRental changes
   useEffect(() => {
    calculatePrice();
  }, [tool, selectedRental]);

  // Handle rental selection change
  const handleRentalChange = (e) => {
    const rentalId = e.target.value;
    const rental = rentals.find((r) => r.id === parseInt(rentalId));
    setSelectedRental(rental);
    setTotalPrice(0);  // Reset total price when a new rental is selected
  };

  if (loading) return <div>Loading rentals...</div>;
  if (error) return <div>{error}</div>;
  
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg" role="main">
        {/* Rental Selection */}
      <div className="mt-5">
        <label htmlFor="rentalId" className="block text-lg font-semibold">
          Select Rental ID
        </label>
        <select
          id="rentalId"
          className="mt-2 p-2 border rounded-md"
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
      <div className="flex justify-between items-start mb-8">
        <div className="company-details">
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={companyDetails.logo} 
              alt="Company Logo" 
              className="w-16 h-16 object-cover rounded"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=100";
              }}
            />
            <h1 className="text-3xl font-bold text-gray-800">{companyDetails.name}</h1>
          </div>
          <div className="text-gray-600">
            <p className="flex items-center gap-2"><FaBuilding className="text-gray-400" /> {companyDetails.address}</p>
            <p className="flex items-center gap-2"><FaPhone className="text-gray-400" /> {companyDetails.phone}</p>
            <p className="flex items-center gap-2"><FaEnvelope className="text-gray-400" /> {companyDetails.email}</p>
          </div>
        </div>
        <div className="invoice-details text-right">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">INVOICE</h2>
          <p className="text-gray-600">Invoice No: {invoiceDetails.number}</p>
          <p className="text-gray-600">Date: {invoiceDetails.date}</p>
          <p className="text-gray-600">Due Date: {invoiceDetails.dueDate}</p>
        </div>
      </div>
      <div className="client-details mb-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Bill To:</h3>
        <div className="text-gray-600">
          <p className="font-medium">{customer.cname}</p>
          <p>{clientDetails.address}</p>
          <p>{clientDetails.phone}</p>
          <p>{clientDetails.email}</p>
        </div>
      </div>
      <div className="items-list mb-8">
        <table className="w-full" role="table">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Item</th>
              <th className="p-3">Quantity</th>
              <th className="p-3">Price</th>
              <th className="p-3">Total</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(item.id, "name", e.target.value)}
                    className="w-full p-2 border rounded"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, "quantity", parseInt(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </td>
                <td className="p-3">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleItemChange(item.id, "price", parseFloat(e.target.value))}
                    className="w-full p-2 border rounded"
                  />
                </td>
                <td className="p-3">${item.total.toFixed(2)}</td>
                <td className="p-3">
                  <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleAddItem} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add Item
        </button>
      </div>
      <div className="calculations ml-auto w-64">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${calculateSubtotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax (10%):</span>
          <span>${calculateTax().toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-gray-200">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTemplate;