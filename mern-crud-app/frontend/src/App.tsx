import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IItem } from './types';

const App: React.FC = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  // Fetch items
  useEffect(() => {
    axios.get<IItem[]>('http://localhost:5000/api/items')
      .then((response) => setItems(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Create item
  const addItem = () => {
    axios.post<IItem>('http://localhost:5000/api/items', { name, description })
      .then((response) => {
        setItems([...items, response.data]);
        setName('');
        setDescription('');
      })
      .catch((error) => console.error(error));
  };

  // Delete item
  const deleteItem = (id: string) => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
      .then(() => setItems(items.filter((item) => item._id !== id)))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>CRUD App</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong>: {item.description}
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
