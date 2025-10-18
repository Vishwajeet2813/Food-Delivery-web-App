import React, { useContext, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../../service/authService';
import {toast} from "react-toastify"
import {StoreContext}from "../../context/StoreContext"

const Login = () => {

  const {loadCartData, setToken} = useContext(StoreContext);  
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]: value});
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
        const res = await loginUser(data);
        if(res.status === 200){
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            await loadCartData(res.data.token);
            toast.success('Logged In Successful !!!!');
            navigate('/');
        } else {
            toast.error('Error logging In. Please Check email and password');
        }
    }
    catch (err){
        toast.error('Error logging In. Please Check email and password');
    }

  }

  return (
        <div className="container">
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                <div className="card-body p-4 p-sm-5">
                    <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                    <form onSubmit={onSubmitHandler}>
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
                        in</button>
                    </div>
                    <div className="mt-4">
                        Don't have an account? <Link to='/register'>Sign up</Link>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
  )
}

export default Login
