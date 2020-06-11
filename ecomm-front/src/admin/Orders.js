import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { listOrders, getStatusValues, updateOrderStatus } from './apiAdmin';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);

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

  const loadStatusValues = () => {
    getStatusValues(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStatusValues(data);
      }
    });
  };

  useEffect(() => {
    loadOrders();
    loadStatusValues();
  }, []);

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h3 className='text-danger display-4'>Total Orders: {orders.length}</h3>
      );
    } else {
      return <h3 className='text-danger'>No Orders</h3>;
    }
  };

  const showInput = (key, value) => (
    <div className='input-group mb-2 mr-sm-2'>
      <div className='input-group-prepend'>
        <div className='input-group-text'>{key}</div>
      </div>
      <input
        type='text'
        value={value}
        className='form-control'
        readOnly></input>
    </div>
  );

  const handleStatusChange = (e, orderId) => {
    updateOrderStatus(user._id, token, orderId, e.target.value).then((data) => {
      if (data.error) {
        console.log('Status update failed');
      } else {
        loadOrders();
      }
    });
  };

  const showStatus = (o) => (
    <div className='form-group'>
      <h3 className='mark mb-4'>Status: {o.status}</h3>
      <select
        className='form-control'
        onChange={(e) => handleStatusChange(e, o._id)}>
        <option>Update Status</option>
        {statusValues.map((status, index) => (
          <option key={index} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Layout title='Orders' description={`G'day ${user.name}, Manage Orders`}>
      <div className='row'>
        <div className='col-md-6 offset-md-3'>
          {showOrdersLength()}
          {orders.map((o, oIndex) => {
            return (
              <div
                key={oIndex}
                style={{ borderBottom: '5px solid indigo' }}
                className='mt-5'>
                <h2 className='mb-5'>
                  <span className='bg-primary'>Order ID: {o._id} </span>
                </h2>
                <ul className='list-group mb-2'>
                  <li className='list-group-item'>{showStatus(o)}</li>
                  <li className='list-group-item'>
                    Transaction ID:{o.transaction_id}
                  </li>
                  <li className='list-group-item'>Amount: ${o.amount}</li>
                  <li className='list-group-item'>Ordered by: {o.user.name}</li>
                  <li className='list-group-item'>
                    Ordered on: {moment(o.createdAt).fromNow()}
                  </li>
                  <li className='list-group-item'>
                    Delivery Address: {o.address}
                  </li>
                </ul>
                <h3 className='mt-4 mb-4 font-italic'>
                  Total Product in the order: {o.products.length}
                </h3>

                {o.products.map((p, pIndex) => (
                  <div
                    className='mb-4'
                    key={pIndex}
                    style={{ padding: '20px', border: '1px solid indigo' }}>
                    {showInput('Product Name', p.name)}
                    {showInput('Product Price', p.price)}
                    {showInput('Product Total', p.count)}
                    {showInput('Product Id', p._id)}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
