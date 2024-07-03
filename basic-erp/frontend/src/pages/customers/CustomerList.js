// frontend/src/components/CustomerList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CustomerList.css';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const res = await axios.get('http://localhost:3001/api/customers');
      setCustomers(res.data);
    };
    fetchCustomers();
  }, []);

  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <Link to="/add-customer" className="btn">Add Customer</Link>
      <ul>
        {customers.map((customer) => (
          <li key={customer._id}>
            <Link to={`/customers/${customer._id}`}>{customer.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
