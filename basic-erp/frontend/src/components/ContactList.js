import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContactList.css';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/contacts`);
        if (res.data.length === 0) {
          navigate('/user-dashboard/add-contact');
        } else {
          setContacts(res.data);
        }
      } catch (err) {
        console.error(err);
        // Handle error accordingly if needed
      }
    };
    fetchContacts();
  }, [navigate]);

  return (
    <div className="contact-list">
      <h2>Contact List</h2>
      <Link to="/user-dashboard/add-contact" className="btn">Add Contact</Link>
      <ul>
        {contacts.map((contact) => (
          <li key={contact._id}>
            <Link to={`/user-dashboard/contacts/${contact._id}`}>{contact.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactList;
