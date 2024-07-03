// src/components/CommunicationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './CommunicationForm.css';

const CommunicationForm = () => {
  const { id } = useParams();
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [customer, setCustomer] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchCommunication = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/communications/${id}`);
        const { subject, body, customer } = res.data;
        setSubject(subject);
        setBody(body);
        setCustomer(customer);
      };
      fetchCommunication();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/communications/${id}`, {
          subject, body, customer
        });
        setMessage('Communication updated successfully!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/communications`, {
          subject, body, customer
        });
        setMessage('Communication added successfully!');
      }
      navigate('/user-dashboard/communications');
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="communication-form">
      <h2>{id ? 'Edit Communication' : 'Add Communication'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
        />
        <textarea 
          placeholder="Body" 
          value={body} 
          onChange={(e) => setBody(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Customer" 
          value={customer} 
          onChange={(e) => setCustomer(e.target.value)} 
        />
        <button type="submit">{id ? 'Update' : 'Add'} Communication</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default CommunicationForm;
