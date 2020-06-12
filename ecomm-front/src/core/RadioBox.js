import React, { useState, useEffect, Fragment } from 'react';

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input
        value={`${p._id}`}
        onChange={handleChange}
        name={p}
        type='radio'
        // className='mr-2 ml-4'
      />
      <label>{p.name}</label>
    </div>
  ));
};

export default RadioBox;
