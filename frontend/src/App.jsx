import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const App = () => {
  const [todo, setTodo] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [counts, setCounts] = useState({ addCount: 0, updateCount: 0 });

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + '/api/data');
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getCount = async () => {
    try {
      const res = await axios.get(BASE_URL + '/api/count');
      setCounts(res.data)
    } catch (error) {
      console.log(error.message)
    }
  }



  const handleAdd = async () => {
    try {
      await axios.post(BASE_URL + '/api/data', { todo, description });
      setTodo('');
      setDescription('');
      fetchData();
      await axios.post(BASE_URL + '/api/count/add');
      getCount();

    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleEdit = async (id) => {
    setEditId(id);
    const itemToEdit = data.find((item) => item._id === id);
    setTodo(itemToEdit.todo);
    setDescription(itemToEdit.description);
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + `/api/data/${id}`);
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(BASE_URL + `/api/data/${editId}`, { todo, description });
      setTodo('');
      setDescription('');
      setEditId(null);
      fetchData();
      await axios.post(BASE_URL + '/api/count/update');
      getCount();

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };
  useEffect(() => {
    getCount();
  }, [])

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>

      <div
        id='todo-main'
      >
        <div style={{ backgroundColor: 'lightcoral' }}>
          <h1 style={{ textAlign: 'center', textDecoration: 'underline' }}>Todo Data Management</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
            <p>
              Total Add Count:  {counts.addCount}
            </p>
            <p>
              Total Update Count:  {counts.updateCount}
            </p>
          </div>
        </div>
        <div id='controllers'>
          <input
            type="text"
            placeholder="Todo Title"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {editId ? (
            <button onClick={handleUpdate}>Update</button>
          ) : (
            <button onClick={handleAdd}>Add</button>
          )}
        </div>
        <table>
          <thead>
            <tr>
              <th>Todo</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>{item.todo}</td>
                <td>{item.description}</td>
                <td style={{ display: 'flex', justifyContent: "space-evenly" }}>
                  <button className='edit-btn' onClick={() => handleEdit(item._id)}>Edit</button>
                  <button className='edit-btn' onClick={() => handleDelete(item._id)}>Delete</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
