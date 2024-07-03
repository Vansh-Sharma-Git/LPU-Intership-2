// src/components/SalesForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './SalesForm.css';

const SalesForm = () => {
  const { id } = useParams();
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [customer, setCustomer] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchSale = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sales/${id}`);
        const { productName, quantity, price, customer } = res.data;
        setProductName(productName);
        setQuantity(quantity);
        setPrice(price);
        setCustomer(customer);
      };
      fetchSale();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/sales/${id}`, {
          productName, quantity, price, customer
        });
        setMessage('Sale updated successfully!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/sales`, {
          productName, quantity, price, customer
        });
        setMessage('Sale added successfully!');
      }
      navigate('/user-dashboard/sales');
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="sales-form">
      <h2>{id ? 'Edit Sale' : 'Add Sale'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Product Name" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Customer" 
          value={customer} 
          onChange={(e) => setCustomer(e.target.value)} 
        />
        <button type="submit">{id ? 'Update' : 'Add'} Sale</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default SalesForm;
