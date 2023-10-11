import React, { useState, useEffect } from 'react';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/items')
      .then(response => response.json())
      .then(data => {
        setItems(data.items);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>Name:</strong> {item.name} <br />
            <strong>Description:</strong> {item.description} <br />
            <strong>Price:</strong> {item.price} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
