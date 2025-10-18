import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { assets } from '../../assets/assets';

function Orders() {

  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get('http://localhost:8080/api/orders/all');
    setData(response.data);
  }

  const updateStatus = async (e, orderId) => {
    const response = await axios.patch(`http://localhost:8080/api/orders/status/${orderId}?status=${e.target.value}`);
    if(response.status === 200){
      await fetchOrders();
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="container">
        <div className="py-5 row justify-content-center">
            <div className="col-11 card">
                <table className='table table-responsive'>
                    <tbody>{
                        data.map((order, i) => (
                            <tr key={i}>
                                <td>
                                    <img src={assets.delivery} alt='' height={48} width={48}/>
                                </td>
                                <td>
                                    <div>
                                      {order.orderedItems.map((item, i) => {
                                        if(i === order.orderedItems.length - 1){
                                            return item.name + " x "+item.quantity;
                                        }
                                        else return item.name + " x "+item.quantity+", ";
                                      })}

                                    </div>
                                    <div>
                                      {order.userAddress}
                                    </div>
                                </td>
                                <td>&#8377;{order.amount.toFixed(2)}</td>
                                <td>Items: {order.orderedItems.length}</td>
                                <td>
                                    <select className='form-control' value={order.orderStatus} onChange={(e) => updateStatus(e, order.id)}>
                                      <option value="Food Preparing">Food Preparing</option>
                                      <option value="Out for Delivery">Out for Delivery</option>
                                      <option value="Delivered">Delivered</option>
                                    </select>
                                </td>
                            </tr>
                        ))
                        }</tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default Orders
