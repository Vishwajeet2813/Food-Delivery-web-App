import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL, deleteFood, getFoodList } from '../../service/FoodService';
import { toast } from 'react-toastify';
import './FoodList.css'

const FoodList = () => {

  const [list, setList] = useState([]);

  const fetchList = async () => {

    try{
      const data = await getFoodList();
      console.log(data);
      setList(data);
    } catch (err){
      toast.error('Error while removing the foods.');
    }
    
  }

  const removeFood = async (id) => {
    try{
      const success = await deleteFood(id);
      if(success){
        toast.success('Food Removed successfully');
        await fetchList();
      } else toast.error('Error occured while removing the food');
    } catch(err){
      toast.error('Error occured while removing the food');
    }

  }

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className="col-11 card">
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, i) => {
                return (
                  <tr key={i} >
                      <td>
                        <img src={item.imageUrl} alt='' height={58} width={58} />
                      </td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>&#8377;{item.price}.00</td>
                      <td className='text-danger' >
                        <i className='bi bi-x-circle-fill' onClick={() => removeFood(item.id)}></i>
                      </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default FoodList
