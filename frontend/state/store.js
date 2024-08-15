
import { configureStore } from "@reduxjs/toolkit";
import ordersReducer from "./orderSlice"; // Import the orders slice
import pizzaFormSlice from "./pizzaFormSlice";

export const resetStore = () =>
  configureStore({
    reducer: {
      orders: ordersReducer, // Add the orders reducer here
      pizzaOrder: pizzaFormSlice,
    },
    middleware: (getDefault) =>
      getDefault()
        .concat
        // Add your middleware here if needed
        (),
  });

export const store = resetStore();