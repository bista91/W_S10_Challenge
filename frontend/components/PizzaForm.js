// src/components/PizzaForm.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateField,
  submitPizzaOrder,
  resetForm,
} from "../state/pizzaFormSlice";
import { fetchOrders } from "../state/orderSlice";

export default function PizzaForm() {
  const dispatch = useDispatch();
  const formState = useSelector((state) => state.pizzaOrder);
  const { fullName, size, toppings, status, error } = formState;
  console.log(status);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    dispatch(updateField({ name, value: fieldValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedToppings = Object.keys(toppings).filter(
      (key) => toppings[key]
    );

    const order = {
      fullName,
      size,
      toppings: selectedToppings,
    };

    dispatch(submitPizzaOrder(order));
      dispatch(fetchOrders());
      dispatch(resetForm())
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {status === "pending" && (
        <div className="pending">Order in progress...</div>
      )}
      {status === "failure" && (
        <div className="failure">Order failed: {error}</div>
      )}
      {status === "success" && (
        <div className="success">Order placed successfully!</div>
      )}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label>
          <br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            value={fullName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label>
          <br />
          <select
            data-testid="sizeSelect"
            id="size"
            name="size"
            value={size}
            onChange={handleChange}
          >
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input
            data-testid="checkPepperoni"
            name="1"
            type="checkbox"
            checked={toppings["1"]}
            onChange={handleChange}
          />
          Pepperoni
          <br />
        </label>
        <label>
          <input
            data-testid="checkGreenpeppers"
            name="2"
            type="checkbox"
            checked={toppings["2"]}
            onChange={handleChange}
          />
          Green Peppers
          <br />
        </label>
        <label>
          <input
            data-testid="checkPineapple"
            name="3"
            type="checkbox"
            checked={toppings["3"]}
            onChange={handleChange}
          />
          Pineapple
          <br />
        </label>
        <label>
          <input
            data-testid="checkMushrooms"
            name="4"
            type="checkbox"
            checked={toppings["4"]}
            onChange={handleChange}
          />
          Mushrooms
          <br />
        </label>
        <label>
          <input
            data-testid="checkHam"
            name="5"
            type="checkbox"
            checked={toppings["5"]}
            onChange={handleChange}
          />
          Ham
          <br />
        </label>
      </div>
      <button data-testid="submit" type="submit">
        Submit Order
      </button>
    </form>
  );
}