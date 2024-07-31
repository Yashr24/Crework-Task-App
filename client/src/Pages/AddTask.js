import React, { useState } from 'react';
import axios from '../services/axiosInterceptor';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddTask.css';

const AddTask = () => {
  const navigate = useNavigate();
  const location = useLocation();


  const queryParams = new URLSearchParams(location.search);
  const initialStatus = queryParams.get('status') || 'To-Do';

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    status: initialStatus,
    priority: 'Low',
    deadline: '',
  });
  
  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/tasks', newTask);
    navigate('/');
  };

  return (
    <div className="add-task-page">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <h2 className="me-3">Add New Task</h2>
      </div>
      <form onSubmit={handleSubmit} className="task-form">
        <input type="text" name="title" placeholder="Title" value={newTask.title} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={newTask.description} onChange={handleChange} />
        {/* <select name="status" value={newTask.status} onChange={handleChange} required>
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Completed">Completed</option>
        </select> */}
        <input type='none' name="status" value={initialStatus} />
        <select name="priority" value={newTask.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="Urgent">Urgent</option>
        </select>
        <input type="date" name="deadline" value={newTask.deadline} onChange={handleChange} required/>
        <button type="submit">Save Task</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default AddTask;
