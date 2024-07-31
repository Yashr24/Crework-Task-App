import React, { useState, useEffect } from 'react';
import axios from '../services/axiosInterceptor';
import { Link } from 'react-router-dom';
import './TaskBoard.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';


const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    };
    fetchTasks();
  }, []);
/////////////////////////////////////////////////////

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  ///////////////////////////////////////

  const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    
  };

  /////////////////////////////////////////
  return (
    <div className="task-board">
      {/* <Link to="/add-task">
        <button className="add-task-button"><i class="bi bi-plus-circle me-2"></i>Add Task</button>
      </Link> */}

      <div className="task-columns">
        {['To-Do', 'In Progress', 'Under Review', 'Completed'].map(status => (
          <div key={status} className="task-column">
            <h5>{status}</h5>
            <div className="row">
            {tasks.filter(task => task.status === status).map(task => (
              <div key={task._id} className="card m-2" style={{ width: '18rem' }}>
              <div className="card-body">
                <h6 className="card-title d-flex justify-content-between align-items-center">{task.title} 
                  <div className='card-title d-flex justify-content-between align-items-center'>
                  <button onClick={() => handleDelete(task._id)} style={{border: "none", background: 'none'}}>
                    <i class="bi bi-trash3-fill"></i>
                  </button>
                  
                  </div>
                </h6>
                <p className="card-text">{task.description}</p>
                <p className="card-text"><i class="bi bi-clock me-2"></i> {formatDate(task.deadline)}</p>
                <div className="mt-2">
                  {task.priority === 'Low' && <span className="badge text-bg-success">Low</span>}
                  {task.priority === 'Medium' && <span className="badge text-bg-warning">Medium</span>}
                  {task.priority === 'Urgent' && <span className="badge text-bg-danger">Urgent</span>}
                </div>
              </div>
            </div>
            
          ))}
          </div>
            <Link to={`/add-task?status=${status}`} style={{textDecoration: "none"}}>
              <button className="add-task-button d-flex justify-content-between align-items-center">Add New <i class="bi bi-plus-lg"></i></button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
