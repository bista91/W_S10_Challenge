import React,{useEffect,useState} from 'react'
import { fetchOrders } from '../state/orderSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function OrderList() {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState("All");
  // Get the orders and the status from the Redux store
  const orders = useSelector((state) => state.orders.orders)
  let filteredOrder=null
  if(selectedSize !== "All"){
    filteredOrder = orders.filter((order) => order.size === selectedSize);
  }
  else{
    filteredOrder = orders;
  }
   useEffect(() => {
  
       dispatch(fetchOrders());
    
   }, [dispatch]);
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {filteredOrder.map((order) => {
          return (
            <li key={order.id}>
              <div>
                {order.customer} ordered a size {order.size} with{" "}
                {order?.toppings?.length > 0
                  ? `${order.toppings.length} toppings`
                  : "no toppings"}
              </div>
            </li>
          );
        })}
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {["All", "S", "M", "L"].map((size) => {
          const className = `button-filter${
            size === selectedSize ? " active" : ""
          }`;
          return (
            <button
              data-testid={`filterBtn${size}`}
              className={className}
              onClick={() => setSelectedSize(size)}
              key={size}
            >
              {size}
            </button>
          );
        })}
      </div>
    </div>
  );
}