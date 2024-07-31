import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TaskBoard from '../components/TaskBoard';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  
  return (
    <div style={{ backgroundColor: '#eaebed', minHeight: '100vh' }}>
    <div className="d-flex justify-content-between align-items-center mb-3 pb-1 ps-2 pt-2">
      <div className="d-flex align-items-center">
        <h2 className="me-3">Welcome,</h2>
        <span className="h2">{name}!</span>
      </div>
      <button onClick={handleLogout} className="btn btn-primary btn-m me-md-3" style={{background: '#e83a13', border:'none'}}><i class="bi bi-box-arrow-right me-2"></i>Logout</button>
    </div>

    <div>
    <TaskBoard />
    </div>
    </div>
  );
};

export default Home;

