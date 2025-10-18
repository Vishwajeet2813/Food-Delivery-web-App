import axios from "axios";

export const API_URL = 'http://localhost:8080/api/foods';

export const addFood = async (foodData, image) => {
    const formData = new FormData();
    formData.append('food', JSON.stringify(foodData));
    formData.append('file', image);

    try{
           const response = await axios.post(API_URL, formData, {
            headers: {
              "Content-Type" : "multipart/form-data"
            }
           });
    
        } catch(error){
            console.log(error);
            throw error;
        }
}

export const getFoodList = async () => {
    try{
      const res = await axios.get(API_URL);
      console.log(res);
      return res.data;
    } catch(error){
      console.log("Error fetching food!!!");
      throw error;
    }

}

export const deleteFood = async (id) => {  
    try{
      const response = await axios.delete(`${API_URL}/`+id);
      return response.status === 204;
    }
    catch(err){
      console.log('Error while deleting food');
      throw err;
    }  
      
}