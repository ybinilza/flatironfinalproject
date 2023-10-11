import React, { useState } from 'react';
import axios from 'axios';

const AddItemForm = () => {
  const [itemName, setItemName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/add_item', {
        itemName,
        //imageUrl,
        itemDescription,
        itemPrice,
      });

      
      setItemName('');
      setImageUrl('');
      setItemDescription('');
      setItemPrice('');

      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Error adding item. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Item Name:
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
      </label>

      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
      </label>

      <label>
        Item Description:
        <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />
      </label>

      <label>
        Item Price:
        <input type="text" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default AddItemForm;
