import React, { useState, useEffect } from 'react';
import './Item.css';

function Item() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/items')
      .then(response => response.json())
      .then(data => {
        console.log('Data received:', data);
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div className="item-container">
      {items.map(item => (
        <div key={item.id} className="item">
          <h2>{item.name}</h2>
          <img src={require('../images/marketforeveyone.png')} alt="safew" style={{ maxWidth: '100%' }} />
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Item;
