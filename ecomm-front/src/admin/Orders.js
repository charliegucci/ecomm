import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders } from './apiAdmin';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user, token } = isAuthenticated();
  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setOrders(data);
      }
    });
  };
  useEffect(() => {
    loadOrders();
  }, []);
  const noOrders = (orders) => {
    return orders.length < 1 ? <h4>No Orders</h4> : null;
  };
  return (
    <Layout title='Orders' description={`G'day ${user.name}, Manage Orders`}>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {noOrders(orders)}
          {JSON.stringify(orders)}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
