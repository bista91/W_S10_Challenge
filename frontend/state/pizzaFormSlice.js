// src/state/pizzaFormSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const submitPizzaOrder = createAsyncThunk(
  "pizzaOrder/submitPizzaOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:9009/api/pizza/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const pizzaFormSlice = createSlice({
  name: "pizzaOrder",
  initialState: {
    fullName: "",
    size: "",
    toppings: {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
    },
    status: "idle",
    error: null,
  },
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      if (name in state.toppings) {
        state.toppings[name] = value;
      } else {
        state[name] = value;
      }
    },
    resetForm: (state) => {
      state.fullName = "";
      state.size = "";
      state.toppings = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
      };
    //   state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitPizzaOrder.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(submitPizzaOrder.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(submitPizzaOrder.rejected, (state, action) => {
        state.status = "failure";
        state.error = action.payload || "Failed to submit the order";
      });
  },
});

export const { updateField, resetForm } = pizzaFormSlice.actions;

export default pizzaFormSlice.reducer;