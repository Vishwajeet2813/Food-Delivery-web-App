import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchFoodDetails } from '../../service/foodService';
import {toast} from "react-toastify"
import { StoreContext } from '../../context/StoreContext';

function FoodDetails() {

    const {id} = useParams();
    const {increaseQuantity} = useContext(StoreContext);
    const navigate = useNavigate();
    const [data, setData] = useState({});

    const addToCart = () => {
        increaseQuantity(data.id);
        navigate('/cart');
    }

    useEffect(() => {
         const loadFoodDetails = async () => {
            try{
                const foodData = await fetchFoodDetails(id);
                setData(foodData);
            }
            catch (err){
                toast.error('Error displaying the food details.')
            }
         }

         loadFoodDetails();
    }, [id]);

    return (
         <section className="py-5">
            <div className="container px-4 px-lg-5 my-5">
                <div className="row gx-4 gx-lg-5 align-items-center">
                    <div className="col-md-6">
                        <img
                            src={data.imageUrl} // this is your S3 public URL
                            alt="..."
                            className="img-fluid"
                            style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "10px"
                            }}
                        />
                    </div>
                    <div className="col-md-6">
                        <div className="fs-5 mb-1">Category: <span className='badge text-bg-warning'>{data.category}</span></div>
                        <h1 className="display-5 fw-bolder">{data.name}</h1>
                        <div className="fs-5 mb-2">
                            
                            <span>&#8377;{data.price}.00</span>
                        </div>
                        <p className="lead">{data.description}</p>
                        <div className="d-flex">
                            <input className="form-control text-center me-3" id="inputQuantity" type="num" value="1" style={{"max-width"    : "3rem"}} />
                            <button className="btn btn-outline-dark flex-shrink-0" type="button" onClick={addToCart}>
                                <i className="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FoodDetails
