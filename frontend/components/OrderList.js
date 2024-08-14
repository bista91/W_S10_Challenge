import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setFilter } from '../state/store';

export default function OrderList() {
  const orders = useSelector(state => state.orders.filteredOrders);
  const filter = useSelector(state => state.orders.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleFilterChange = (size) => {
    dispatch(setFilter(size));
  };


  //function OrderList({ orders }) {
    //const length = orders?.length ?? 0;
  

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.map(order => (
            <li key={order.id}>
              <div>
              <strong>{order.customer}</strong> ordered a size <strong>{order.size}</strong> with <strong>{order.toppings.length}</strong> toppings
              
              </div>
            </li>
          ))
        }
        
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${filter === size ? ' active' : ''}`;
            return (
              <button
                data-testid={`filterBtn${size}`}
                className={className}
                key={size}
                onClick={() => handleFilterChange(size)}
              >
                {size}
              </button>
            );
          })
        }
      </div>
    </div>
  );
  }