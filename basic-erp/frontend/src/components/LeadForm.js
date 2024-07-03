// src/components/LeadForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './LeadForm.css';

const LeadForm = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [source, setSource] = useState('');
  const [status, setStatus] = useState('');
  const [potentialValue, setPotentialValue] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchLead = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/leads/${id}`);
        const { name, source, status, potentialValue } = res.data;
        setName(name);
        setSource(source);
        setStatus(status);
        setPotentialValue(potentialValue);
      };
      fetchLead();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/leads/${id}`, {
          name, source, status, potentialValue
        });
        setMessage('Lead updated successfully!');
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/leads`, {
          name, source, status, potentialValue
        });
        setMessage('Lead added successfully!');
      }
      navigate('/user-dashboard/leads');
    } catch (err) {
      console.error(err);
      setMessage('An error occurred');
    }
  };

  return (
    <div className="lead-form">
      <h2>{id ? 'Edit Lead' : 'Add Lead'}</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Source" 
          value={source} 
          onChange={(e) => setSource(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Status" 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Potential Value" 
          value={potentialValue} 
          onChange={(e) => setPotentialValue(e.target.value)} 
        />
        <button type="submit">{id ? 'Update' : 'Add'} Lead</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LeadForm;
