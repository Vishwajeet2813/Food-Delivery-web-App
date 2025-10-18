import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import { calculateCartTotals } from '../../util/cartUtils';
import axios from 'axios';
import {toast} from "react-toastify"
import {useNavigate} from "react-router-dom"


const PlaceOrder = () => {

  const {foodList, quantities, setQuantities, token} = useContext(StoreContext); 
  const navigate = useNavigate(); 
  const cartItems = foodList.filter(food => quantities[food.id] > 0);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    state: '',
    city: '',
    zip: ''
  })

  const onHandlerChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({...data, [name]: value});
  }

  const onSubmitHnadler = async (e) => {
    e.preventDefault();
    console.log("Submitting order...");
    console.log(cartItems);
    console.log(quantities);

    const orderData = {
        userAddress: `${data.firstName} ${data.lastName}, ${data.address}, ${data.city}, ${data.state}`,
        email: data.email,
        phoneNumber: data.phoneNumber,
        orderedItems: cartItems.map(item => ({
            foodId: item.id,
            quantity: quantities[item.id],
            price: item.price * quantities[item.id],
            category: item.category,
            imageUrl: item.imageUrl,
            description: item.description,
            name: item.name
        })),
        amount: total.toFixed(2),
        orderStatus: 'Preparing'
    };

    console.log("orderData ->", orderData);
    console.log("token ->", token);

    try {
        const res = await axios.post(
        "http://localhost:8080/api/orders/create",
        orderData,
        { headers: { "Authorization": `Bearer ${token}` } }
        );

        console.log("Response received ->", res);

        if (res.status === 201 && res.data.razorpayOrderId) {
        initiateRazorpayPayment(res.data);
        } else {
        console.error("Unexpected response ->", res.data);
        toast.error("Unable to place order. Please try again!!!");
        }
    } 
    catch (err) {
        console.error("Full error object:", err);

        if (err.response) {
            console.error("Response error data:", err.response.data);
            console.error("Status code:", err.response.status);
            toast.error(`Error ${err.response.status}: ${err.response.data.message || "Server error"}`);
        } else if (err.request) {
            console.error("Request made, but no response:", err.request);
            toast.error("No response from server!");
        } else {
            console.error("Axios setup error:", err.message);
            toast.error("Request setup failed!");
        }
    }
};


  const initiateRazorpayPayment = (order) => {
    if (typeof window.Razorpay === "undefined") {
        toast.error("Razorpay SDK not loaded yet. Please try again!");
        return;
    }

    const options = {
        key: "rzp_test_RUUW8PQIb3KYUr",
        amount: order.amount, // Razorpay takes amount in paise
        currency: 'INR',
        name: "Food Land",
        description: "Food Order Payment",
        order_id: order.razorpayOrderId, // must match backend-created Razorpay order
        handler: async function (razorpayResponse) {
            console.log("Payment success:", razorpayResponse);
            await verifyPayment(razorpayResponse);
        },
        prefill: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        contact: data.phoneNumber
        },
        theme: { color: "#3399cc" },
        modal: {
            ondismiss: async function () {
                toast.error("Payment cancelled.");
                console.log(order.id);
                await deleteOrder(order.id);
            }
        }
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};


  const verifyPayment = async (razorpayResponse) => {
    const paymentData = {
        razorpay_payment_id: razorpayResponse.razorpay_payment_id,
        razorpay_order_id: razorpayResponse.razorpay_order_id,
        razorpay_signature: razorpayResponse.razorpay_signature
    };
    try {
        const response = await axios.post('http://localhost:8080/api/orders/verify', paymentData, {headers: {"Authorization" : `Bearer ${token}`}});
        if(response.status) {
            toast.success('Payment Successful !!!!');
            await clearCart();
            navigate("/myorders");
        }
        else {
            toast.error("Error making payment");
            navigate("/");
        }    
    }
    catch (err){
        toast.error("Error making payment");
    }
  }

  const deleteOrder = async (orderId) => {
    try{
        await axios.delete("http://localhost:8080/api/orders/delete/"+orderId, {headers: {"Authorization" : `Bearer ${token}`}})
    }
    catch (err){
        toast.error('Something went wrong while deleting the order');
    }
  }

  const clearCart = async () => {
    try{
        await axios.delete('http://localhost:8080/api/cart', {headers: {"Authorization" : `Bearer ${token}`}});
        setQuantities({});
    }
    catch (err) {
        toast.error('Error while clearing the cart.');
    }
  }

  
  
  const {subTotal, shipping, tax, total} = calculateCartTotals(cartItems, quantities);

  return (
        <div className="container mt-2">
      

        <div className="row">
            <div className="col-md-4 order-md-2 mb-4 mt-2">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge badge-secondary badge-pill">3</span>
            </h4>
            <ul className="list-group mb-3">
                {cartItems.map(item => (
                     <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <h6 className="my-0">{item.name}</h6>
                            <small className="text-muted">Qty: {quantities[item.id]}</small>
                        </div>
                        <span className="text-muted">&#8377;{item.price * quantities[item.id]}</span>
                    </li>
                ))}
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <span className="my-0">Shipping</span>
                        </div>
                        <span className="text-muted">&#8377;{subTotal === 0 ? 0.0 : shipping.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                        <div>
                            <span className="my-0">Tax (-10%)</span>
                        </div>
                        <span className="text-muted">&#8377;{subTotal === 0 ? 0.0 : tax.toFixed(2)}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                <span>Total (INR)</span>
                <strong style={{"color" : "red"}}>&#8377;{total.toFixed(2)}</strong>
                </li>
            </ul>
            </div>
            <div className="col-md-8 order-md-1 mt-2">
            <h4 className="mb-3">Billing address</h4>
            <form className="needs-validation" novalidate onSubmit={onSubmitHnadler}>
                <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="firstName">First name</label>
                    <input type="text" className="form-control" id="firstName" placeholder="John" required name='firstName' value={data.firstName} onChange={onHandlerChange}/>
                    
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="lastName">Last name</label>
                    <input type="text" className="form-control" id="lastName" placeholder="Doe" name='lastName' value={data.lastName} onChange={onHandlerChange} required/>
                    
                </div>
                </div>

                <div className="mb-3">
                <label htmlFor="email">Email <span className="text-muted">(Optional)</span></label>
                <input type="email" className="form-control" id="email" placeholder="you@example.com" name='email' value={data.email} onChange={onHandlerChange}/>
                
                </div>

                <div className="mb-3">
                <label htmlFor="phone">Phone Number</label>
                <input type="number" className="form-control" id="phone" placeholder="9822510654" name='phoneNumber' value={data.phoneNumber} onChange={onHandlerChange} required/>
                </div>

                <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" placeholder="1234 Main St" name='address' value={data.address} onChange={onHandlerChange} required/>
                </div>


                <div className="row">
                <div className="col-md-5 mb-3">
                    <label htmlFor="state">State</label>
                    <select className="custom-select d-block w-100 form-control" id="state" name='state' value={data.state} onChange={onHandlerChange} required>
                    <option value="">Choose...</option>
                    <option>Maharashtra</option>
                    </select>
                    
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="city">City</label>
                    <select className="custom-select d-block w-100 form-control" id="city" name='city' value={data.city} onChange={onHandlerChange} required>
                    <option value="">Choose...</option>
                    <option>Pune</option>
                    </select>
                    
                </div>
                <div className="col-md-3 mb-3">
                    <label htmlFor="zip">Zip</label>
                    <input type="text" className="form-control" id="zip" placeholder="411027" name='zip' value={data.zip} onChange={onHandlerChange} required/>
                    
                </div>
                </div>
                <hr className="mb-6 "/>
                <button className="btn btn-primary btn-lg btn-block" type="submit" disabled={cartItems.length === 0}>Continue to checkout</button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default PlaceOrder;
