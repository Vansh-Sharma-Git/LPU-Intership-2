// src/pages/customers/CustomerForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CustomerForm.css';

const CustomerForm = () => {
  const [customer, setCustomer] = useState({
    name: '',
    contactInfo: { email: '', phone: '' },
    address: '',
    GST: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        const res = await axios.get(`http://localhost:3001/api/customers/${id}`);
        setCustomer(res.data);
      };
      fetchCustomer();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email' || name === 'phone') {
      setCustomer((prev) => ({
        ...prev,
        contactInfo: { ...prev.contactInfo, [name]: value },
      }));
    } else {
      setCustomer((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.patch(`http://localhost:3001/api/customers/${id}`, customer);
    } else {
      await axios.post('http://localhost:3001/api/customers', customer);
    }
    navigate('/customers');
  };

  return (
    <div className="customer-form">
      <h2>{id ? 'Edit Customer' : 'Add Customer'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={customer.name} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={customer.contactInfo.email} onChange={handleChange} />
        <label>Phone:</label>
        <input type="text" name="phone" value={customer.contactInfo.phone} onChange={handleChange} />
        <label>Address:</label>
        <input type="text" name="address" value={customer.address} onChange={handleChange} />
        <label>GST:</label>
        <input type="text" name="GST" value={customer.GST} onChange={handleChange} />
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
};

export default CustomerForm;
