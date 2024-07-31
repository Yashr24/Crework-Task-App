import React, { useState } from 'react'
import axios from "../services/axiosInterceptor";
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  })
  const handleLogin = async(e)=>{
    e.preventDefault();
    const response = await axios.post("api/auth/users/login", input);
    // alert(response.data.message);
    console.log(response.data);
    if(response.status===200){
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      navigate("/");
    }
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card w-75">
            <div className="card-body">
              <h3 className="card-title text-center">Welcome to <span style={{color: '#8d5acb'}}>Workflo!</span></h3>
              <br />
              <form onSubmit={ handleLogin }>
                <div className="form-group">
                  {/* <label htmlFor="email">Email</label> */}
                  <input
                    style={{background: '#dee2e4'}}
                    type="email"
                    className="form-control"
                    placeholder="Your email"
                    required
                    name="email"
                    value={input.email}
                    onChange={(e) => 
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <br />
                <div className="form-group">
                  {/* <label htmlFor="password">Password</label> */}
                  <input
                    style={{background: '#dee2e4'}}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    name="password"
                    value={input.password}
                    onChange={(e) => 
                    setInput({
                      ...input,
                      [e.target.name]: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-primary mt-4 w-100" style={{background: '#8d5acb', border: 'none'}}>Login</button>
                </div>
                <br />
                <p className='mb-5 pb-lg-2' style={{textAlign: "center"}}>
                  Don't have an account? Create a <Link to="/register" style={{ color: "#348dc4", textDecoration: "none"}}>
                      new account.
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

