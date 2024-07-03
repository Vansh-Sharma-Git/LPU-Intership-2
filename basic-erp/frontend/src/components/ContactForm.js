// src/components/ContactForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ContactForm.css';

const ContactForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts/${id}`);
        const { name, email, phone, address } = res.data;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
      };
      fetchContact();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/contacts/${id}`, {
          name, email, phone, address
        });
        setMessage('Contact updated successfully!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/contacts`, {
          name, email, phone, address
        });
        setMessage('Contact added successfully!');
      }
      navigate('/user-dashboard/contacts');
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="contact-form">
      <h2>{id ? 'Edit Contact' : 'Add Contact'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Address" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
        />
        <button type="submit">{id ? 'Update' : 'Add'} Contact</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ContactForm;

