import React, { useState, useEffect } from 'react';
import './ItemList.css'; 
const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5555/items')
      .then(response => response.json())
      .then(data => {
        console.log("Data received:", data);
        setItems(data);
      })
      .catch(error => {
        console.error('Error fetching items:', error);
      });
  }, []);

  return (
      <div className="item-list-horizontal">
        {items.map(item => (
          <div key={item.id} className="item">
            <div className="item-box">
              <strong>Name:</strong> {item.name}
            </div>
            <div className="item-box">
              <strong>Description:</strong> {item.description}
            </div>
            <div className="item-box">
              <strong>Price:</strong> {item.price}
            </div>
          </div>
        ))}
      </div>
    
  );
};

export default ItemList;
