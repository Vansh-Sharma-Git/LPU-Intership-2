import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LeadList.css';

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/leads`);
        if (res.data.length === 0) {
          navigate('/user-dashboard/add-lead');
        } else {
          setLeads(res.data);
        }
      } catch (err) {
        console.error(err);
        // Handle error accordingly if needed
      }
    };
    fetchLeads();
  }, [navigate]);

  return (
    <div className="lead-list">
      <h2>Lead List</h2>
      <Link to="/user-dashboard/add-lead" className="btn">Add Lead</Link>
      <ul>
        {leads.map((lead) => (
          <li key={lead._id}>
            <Link to={`/user-dashboard/leads/${lead._id}`}>{lead.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadList;
