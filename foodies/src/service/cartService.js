import axios from "axios";

const API_URL = 'http://localhost:8080/api/cart';

export const addToCart = async (foodId, token) => {
    try{
        await axios.post(API_URL, {foodId}, {headers: {'Authorization' : `Bearer ${token}`}});
    }
    catch (err){
        console.error("Error while adding the cart data", err);
    }
};

export const removeQytFromCart = async (foodId, token) => {
    try{
        await axios.post(API_URL+"/remove", {foodId}, {headers: {'Authorization' : `Bearer ${token}`}});
    }
    catch (err){
        console.error("Error while removing quantity from cart", err);
    }
}

export const getCartData = async (token) => {
    try{
        const response = await axios.get('http://localhost:8080/api/cart', {headers : {"Authorization" : `Bearer ${token}`}});
        return response.data.items;
    }
    catch (err){
        console.error("Error while fetching the cart data", err);
    }
}