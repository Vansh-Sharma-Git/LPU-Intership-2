// src/pages/customers/CustomerDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CustomerDetails.css';

const CustomerDetails = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      const res = await axios.get(`/api/customers/${id}`);
      setCustomer(res.data);
    };
    fetchCustomer();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`/api/customers/${id}`);
    navigate('/user-dashboard/customers');
  };

  return (
    customer && (
      <div className="customer-details">
        <h2>{customer.name}</h2>
        <p>Email: {customer.contactInfo.email}</p>
        <p>Phone: {customer.contactInfo.phone}</p>
        <p>Address: {customer.address}</p>
        <p>Purchase History: {customer.purchaseHistory.join(', ')}</p>
        <p>Preferences: {customer.preferences}</p>
        <button onClick={handleDelete}>Delete</button>
        <Link to={`/user-dashboard/edit-customer/${id}`} className="btn">Edit</Link>
      </div>
    )
  );
};

export default CustomerDetails;
