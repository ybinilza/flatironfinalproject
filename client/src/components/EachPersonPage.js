import React, { useState, useEffect } from 'react';
import './EachPersonPage.css';
import axios from 'axios';

function EachPersonPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5555/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5555/items/${itemId}`);
      // After deletion, fetch items again to update the list
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEditPrice = async (itemId) => {
    // This is a placeholder for your edit price logic
    const newPrice = prompt('Enter the new price:');
    if (newPrice !== null && !isNaN(newPrice)) {
      try {
        await axios.patch(`http://localhost:5555/items/${itemId}`, {
          price: parseFloat(newPrice),
        });
        // After editing, fetch items again to update the list
        fetchItems();
      } catch (error) {
        console.error('Error editing price:', error);
      }
    }
  };

  return (
    <div className="item-container">
      {items.map((item) => (
        <div key={item.id} className="item">
          <h2>{item.name}</h2>
          <img src={require('../images/marketforeveyone.png')} alt="safew" style={{ maxWidth: '100%' }} />
          <p>{item.description}</p>
          <p>{item.price}</p>
          <button onClick={() => handleDeleteItem(item.id)}>Delete Item</button>
          <button onClick={() => handleEditPrice(item.id)}>Edit Price</button>
        </div>
      ))}
    </div>
  );
}

export default EachPersonPage;