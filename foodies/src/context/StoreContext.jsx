import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { fetchFoodList } from "../service/foodService";
import { addToCart, getCartData, removeQytFromCart } from "../service/cartService";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {

    const [foodList, setFoodList] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [token, setToken] = useState("");

    const increaseQuantity = async (foodId) => {
        setQuantities((prev) => ({...prev, [foodId]: (prev[foodId] || 0) + 1}));
        await addToCart(foodId, token);
    }

    const decreaseQuantity = async (foodId) => {
        setQuantities((prev) => ({...prev, [foodId] : prev[foodId] > 0 ? prev[foodId] - 1 : 0}));
        await removeQytFromCart(foodId, token);
    }

    const removeFromCart = (foodId) => {
        setQuantities((prevQuantities) => {
            const updatedQuantities = {...prevQuantities};
            delete updatedQuantities[foodId];
            return updatedQuantities;
        })
    }

    const loadCartData = async (token) => {
        const items = await getCartData(token);
        setQuantities(items);
        
    }

    const contextValue = {
        foodList,
        quantities,
        setQuantities,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        token,
        setToken,
        loadCartData
    };

    useEffect(() => {
        async function loadData(){
           const data = await fetchFoodList();
           setFoodList(data);
           if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            await loadCartData(localStorage.getItem('token'));
           }
           
        };
        loadData();
    }, [])

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}