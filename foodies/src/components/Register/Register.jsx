import React, { useState } from 'react'
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { registerUser } from '../../service/authService'

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })  

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]: value})
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
        const response = await registerUser(data);
        if(response.status === 201) {
            toast.success('Registration completed. Please login.');
            navigate('/login');
        }
        else toast.error('Unable to register. Please try again');    
    }
    catch (err){
        toast.error('Unable to register. Please try again')
    }
    console.log(data);
  }

  return (
        <div className="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                    <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" name='name' value={data.name} onChange={onChangeHandler} required/>
                            <label htmlFor="floatingInput">Name</label>
                        </div>    
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' value={data.email} onChange={onChangeHandler} required/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={data.password} onChange={onChangeHandler} required/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="d-grid">
                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                            up</button>
                        </div>
                        <div className="mt-4">
                            Already have an account? <Link to='/login'>Sign In</Link>
                        </div>
                    </form> 
                    </div>
                </div>
                </div>
            </div>
        </div>
  )
}

export default Register
