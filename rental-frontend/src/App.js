import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Chatbot from './components/ChatBot/ChatBot';
import AddCustomer from './components/Customer/AddCustomer';
import Customer from './components/Customer/Customer';
import CustomerList from './components/Customer/CustomerList';
import Home from './components/Home';
import Invoice from './components/Invoice/Invoice';
import AddLease from './components/Lease/AddLease';
import Lease from './components/Lease/Lease';
import LeaseList from './components/Lease/LeaseList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import AddSupplier from './components/Supplier/AddSupplier';
import Supplier from './components/Supplier/Supplier';
import SupplierList from './components/Supplier/SupplierList';
import Tool from './components/Tool/Tool';
import ToolDetail from './components/Tool/ToolDetail';
import ToolList from './components/Tool/ToolList';
import ToolReg from './components/Tool/ToolReg';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tooldetail/:id" element={<ToolDetail />} />
        <Route path="/" element={<Home token={token} />} />
        <Route path="/tool/toollist" element={<ToolList token={token} />} />
        <Route path="/tool" element={<Tool token={token} />} />
        <Route path="/tool/toolreg" element={<ToolReg token={token} />} />
        <Route path="/suppliers" element={<Supplier token={token} />} />
        <Route path="/suppliers/supplierlist" element={<SupplierList token={token} />} />
        <Route path="/suppliers/addsupplier" element={<AddSupplier token={token} />} />
        <Route path="/customers" element={<Customer token={token} />} />
        <Route path="/customers/customerlist" element={<CustomerList token={token} />} />
        <Route path="/customers/addcustomer" element={<AddCustomer token={token} />} />
        <Route path="/lease" element={<Lease token={token} />} />
        <Route path="/lease/leaselist" element={<LeaseList token={token} />} />
        <Route path="/lease/addlease" element={<AddLease token={token} />} />
        <Route path="/invoice" element={<Invoice token={token} />} />
        <Route path="/chat" element={<Chatbot token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
