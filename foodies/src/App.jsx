import React from 'react'
import Menubar from './components/Menubar/Menubar'
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import ContactUs from './pages/Contact us/ContactUs';
import ExploreFood from './pages/Explore Food/ExploreFood';
import Header from './components/Header/Header';
import FoodDetails from './pages/FoodDetails/FoodDetails';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import MyOrders from './pages/MyOrders/MyOrders';
import { useContext } from 'react';
import { StoreContext } from './context/StoreContext';

const App = () => {

  const {token} = useContext(StoreContext);

  return (
    <div>
      <Menubar/>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/contact' element={<ContactUs />}/>
        <Route path='/explore' element={<ExploreFood />}/>
        <Route path='/food/:id' element={<FoodDetails />}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={token ? <PlaceOrder/> : <Login/>}/>
        <Route path='/login' element={token ? <Home/> : <Login/>}/>
        <Route path='/register' element={token ? <Home/> : <Register/>}/>
        <Route path='myorders' element={token ? <MyOrders/> : <Login/>}/>
      </Routes>
    </div>
  )
}

export default App
