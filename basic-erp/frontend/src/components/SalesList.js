// src/components/SalesList.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SalesList.css';

const SalesList = () => {
  const [sales, setSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/sales`);
        setSales(res.data);
        if (res.data.length === 0) {
          navigate('/user-dashboard/add-sale');
        }
      } catch (err) {
        console.error(err);
        // Optionally handle the error, e.g., set an error message state
      }
    };
    fetchSales();
  }, [navigate]);

  return (
    <div className="sales-list">
      <h2>Sales List</h2>
      <Link to="/user-dashboard/add-sale" className="btn">Add Sale</Link>
      <ul>
        {sales.map((sale) => (
          <li key={sale._id}>
            <Link to={`/user-dashboard/sales/${sale._id}`}>{sale.productName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesList;
