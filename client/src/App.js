
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./Pages/Home";
import AddTask from "./Pages/AddTask";
import ProtectedRoutes from './services/ProtectedRoutes';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add-task" element={<AddTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
