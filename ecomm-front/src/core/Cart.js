import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card key={i} product={product} />
        ))}
      </div>
    );
  };

  const noItemMessage = () => (
    <h2>
      Your Cart is empty. <br />
      <Link to='/shop'>Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout
      title='Shopping Cart'
      description='Manage your cart items. Add remove Checkout or Continue Shopping'
      className='container-fluid'>
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showItems(items) : noItemMessage()}
        </div>
        <div className='col-6'>
          <p>Show Checkout Option</p>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
