import React, { useState, useEffect } from 'react';
import './EachPersonPage.css';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function EachPersonPage() {
  const [items, setItems] = useState([]);
  const history =useHistory()

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5555/items');
      setItems(response.data);
      console.log(response.data)
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
    <button onClick={()=>history.push("/additem")}>Add Items</button>
    <div className="item-container">
      {items.map((item) => (
        <div key={item.id} className="item">
          <h2>{item.name}</h2>
          <img src={require('../images/rose.jpg')} alt="safew" style={{ maxWidth: '100%' }} />
          <p><h3>Description : </h3>"{item.description}</p>
          <p><h3>Price : </h3>${item.price}</p>
          <button onClick={() => handleDeleteItem(item.item_id)}>Delete Item</button>
          <button onClick={() => handleEditPrice(item.item_id)}>Edit Price</button>
        </div>
      ))}
    </div>
  </div>
);

}

export default EachPersonPage;
