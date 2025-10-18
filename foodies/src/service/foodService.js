import axios from "axios";

const API_URL = 'http://localhost:8080/api/foods';

export const fetchFoodList = async () => {
    
    try{
        const response = await axios.get(API_URL); 
        return response.data;
    }
    catch (err){
        console.log('Error fetching the food list:', err);
        throw err;
    }
}

export const fetchFoodDetails = async (id) => {

    try{
        const response = await axios.get(API_URL+'/'+id);
        return response.data;
    }
    catch (err){
        console.log('Error fetching food detail', err);
        throw err;
    }
}