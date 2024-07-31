import React, { useState } from 'react'
import axios from "../services/axiosInterceptor";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleRegister = async(e)=>{
    e.preventDefault();
    const response = await axios.post("api/auth/users/register", input);
    alert(response.data.message);
    if(response.status===201){
      navigate("/login");
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
              <form onSubmit={handleRegister}>
                <div className="form-group">
                    {/* <label htmlFor="name">Full-Name</label> */}
                    <input
                      style={{background: '#dee2e4'}}
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                      required
                      name="name"
                      value={input.name}
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
                  <button type="submit" className="btn btn-primary mt-4 w-100" style={{background: '#8d5acb', border: 'none'}}>Register</button>
                </div>
                <br />
                <p className='mb-5 pb-lg-2' style={{textAlign: "center"}}>
                  Already have an account? <Link to="/login" style={{ color: "#348dc4" , textDecoration: "none"}}>
                      Log in. 
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

export default Register