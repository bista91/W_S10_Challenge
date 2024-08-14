import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialOrdersState = {
  orders: [],
  filteredOrders: [],
  filter: 'All',
  status: 'idle',
  error: null
};


export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch('http://localhost:9009/api/pizza/history');
  if (!response.ok) throw new Error('Failed to fetch orders');
  console.log(response)
  return response.json();
});


export const createOrder = createAsyncThunk('orders/createOrder', async (order) => {
  const response = await fetch('http://localhost:9009/api/pizza/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  console.log(response)
  return response.json();
});


const ordersSlice = createSlice({
  name: 'orders',
  initialState: initialOrdersState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
      state.filteredOrders = state.filter === 'All'
        ? state.orders
        : state.orders.filter(order => order.size === state.filter);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
        state.filteredOrders = state.filter === 'All'
          ? action.payload
          : action.payload.filter(order => order.size === state.filter);
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.filteredOrders = state.filter === 'All'
          ? state.orders
          : state.orders.filter(order => order.size === state.filter);
      });
  }
});


export const { setFilter } = ordersSlice.actions;
export const store = configureStore({
  reducer: {
    orders: ordersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});