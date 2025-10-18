import React, { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category, searchText}) => {

  const {foodList} = useContext(StoreContext);
  const filterFoods = foodList.filter(food => (
    (category === 'All' || food.category === category) && food.name.toLowerCase().includes(searchText.toLowerCase())
  ));  

  return (
    <div className="container">
        <div className="row">
            {filterFoods.length > 0 ? (
               filterFoods.map((item, i) => (
                    <FoodItem key={i} name={item.name} description={item.description} id={item.id} price={item.price} imageUrl={item.imageUrl}/>
               ))   
            ) : (
                <div className='text-center mt-4'>
                    <h4>No food found.</h4>
                </div>
            )}
        </div>
    </div>
  )
}

export default FoodDisplay
