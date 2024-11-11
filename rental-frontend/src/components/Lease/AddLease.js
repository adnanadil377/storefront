// RentalForm.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AddLease({ token }) {
  const [tools, setTools] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedTool, setSelectedTool] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [message, setMessage] = useState("");
  console.log(selectedTool)
  useEffect(() => {
    // Fetch tools to display in the dropdown
    axios
      .get('http://localhost:8000/api/tools/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTools(res.data))
      .catch((err) => console.error("Error fetching tools:", err));
    axios
      .get('http://localhost:8000/api/customers/', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCustomers(res.data))
      .catch((err) => console.error("Error fetching Customers:", err));
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // .post(
      //   'http://localhost:8000/api/rentals/',
      //   { tool_id: selectedTool },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // )
      // .then((res) => {
      //   setMessage("Tool rented successfully!");
      // })
      // .catch((err) => {
      //   console.error("Failed to rent tool:", err);
      //   setMessage("Failed to rent tool.");
      // });
      .post(
        `http://localhost:8000/api/tools/${selectedTool}/rent/`,
        // { tool_id: selectedTool }, 
        { customer_id: selectedCustomer }, // include customer ID in the request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert('Tool rented successfully!');
        // setTools((prevTools) =>
        //   prevTools.map((tool) =>
        //     tool.id === toolId ? { ...tool, availability: false } : tool
        //   )
        // );
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to rent tool.');
        setMessage("Failed to rent tool.");
      });
  };

  return (
    <div className="p-5  bg-white bg-opacity-80">
      <h2 className="text font-bold text-3xl text-fuchsia-950 mb-4">Rent a Tool</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="tool-select" className="font-semibold">Select Tool</label>
        <select
          id="tool-select"
          value={selectedTool}
          onChange={(e) => setSelectedTool(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Choose a tool</option>
          {tools.map((tool) => (
            <option key={tool.id} value={tool.id}>
              {tool.name}
            </option>
          ))}
        </select>
        <label htmlFor="customer-select" className="font-semibold">Select Customer</label>
        <select
          id="customer-select"
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Choose a customer</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.cname}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Rent Tool
        </button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
      </form>
    </div>
  );
}

export default AddLease;
