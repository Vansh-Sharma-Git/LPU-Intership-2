// src/pages/UserDashboard.js
import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import CustomerList from './customers/CustomerList';
import CustomerDetails from './customers/CustomerDetails';
import CustomerForm from './customers/CustomerForm';
import ContactList from '../components/ContactList';
import ContactForm from '../components/ContactForm';
import LeadList from '../components/LeadList';
import LeadForm from '../components/LeadForm';
import SalesList from '../components/SalesList';
import SalesForm from '../components/SalesForm';
import './UserDashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <p>Welcome, User!</p>
      <nav>
        <ul>
          <li><Link to="customers">Customer List</Link></li>
          <li><Link to="add-customer">Add Customer</Link></li>
          <li><Link to="contacts">Contact List</Link></li>
          <li><Link to="add-contact">Add Contact</Link></li>
          <li><Link to="leads">Lead List</Link></li>
          <li><Link to="add-lead">Add Lead</Link></li>
          <li><Link to="sales">Sales List</Link></li>
          <li><Link to="add-sale">Add Sale</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="customers" element={<CustomerList />} />
        <Route path="customers/:id" element={<CustomerDetails />} />
        <Route path="add-customer" element={<CustomerForm />} />
        <Route path="edit-customer/:id" element={<CustomerForm />} />
        <Route path="contacts" element={<ContactList />} />
        <Route path="add-contact" element={<ContactForm />} />
        <Route path="contacts/:id" element={<ContactForm />} />
        <Route path="leads" element={<LeadList />} />
        <Route path="add-lead" element={<LeadForm />} />
        <Route path="leads/:id" element={<LeadForm />} />
        <Route path="sales" element={<SalesList />} />
        <Route path="add-sale" element={<SalesForm />} />
        <Route path="sales/:id" element={<SalesForm />} />
      </Routes>
    </div>
  );
};

export default UserDashboard;
