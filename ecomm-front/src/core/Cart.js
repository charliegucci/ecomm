import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import { Link } from 'react-router-dom';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <Card
            key={i}
            product={product}
            showAddToCartButton={false}
            cartUpdate={true}
            showRemoveProductButton={true}
            setRun={setRun}
            run={run}
          />
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
          <h2 className='mb-4'>Your Cart Summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
