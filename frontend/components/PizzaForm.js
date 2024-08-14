import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrder } from '../state/store';

const initialFormState = { 
  fullName: '',
  size: '',
  toppings: [
    { id: '1', name: 'Pepperoni', selected: false },
    { id: '2', name: 'Green Peppers', selected: false },
    { id: '3', name: 'Pineapple', selected: false },
    { id: '4', name: 'Mushrooms', selected: false },
    { id: '5', name: 'Ham', selected: false }
  ]
};

export default function PizzaForm() {
  const [formState, setFormState] = useState(initialFormState);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
console.log(status)
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (type === 'checkbox') {
      setFormState(prevState => ({
        ...prevState,
        toppings: prevState.toppings.map(topping =>
          topping.id === name ? { ...topping, selected: checked } : topping
        )
      }));
    } else {
      setFormState(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState.toppings.join())
    if (!formState.fullName || !formState.size) {
      setStatus('failure');
      return;
    }

    const toppingsArray = formState.toppings
      .filter(topping => topping.selected)
      .map(topping => topping.id);
      console.log(toppingsArray.length)
    const updatedFormState = { 
      ...formState, 
      toppings: toppingsArray 
    };

    setStatus('pending');
    dispatch(createOrder(updatedFormState))
      .then(() => {
        setStatus('success');
        setFormState(initialFormState);
      })
      .catch(error => {
        setStatus('failure');
        console.error('Error:', error.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Pizza Form</h2>
      {status === 'pending' && <div className='pending'>Order in progress</div>}
      {status === 'failure' && <div className='failure'>Order failed: Full name is required or size is missing</div>}
      {status === 'success' && <div className='success'>Order placed successfully!</div>}

      <div className="input-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          data-testid="fullNameInput"
          id="fullName"
          name="fullName"
          placeholder="Type full name"
          type="text"
          value={formState.fullName}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label htmlFor="size">Size</label>
        <select
          data-testid="sizeSelect"
          id="size"
          name="size"
          value={formState.size}
          onChange={handleChange}
        >
          <option value="">----Choose size----</option>
          <option value="S">Small</option>
          <option value="M">Medium</option>
          <option value="L">Large</option>
        </select>
      </div>

      <div className="input-group">
        {formState.toppings.map(topping => (
          <label key={topping.id}>
            <input
              data-testid={`check${topping.id}`}
              name={topping.id}
              type="checkbox"
              checked={topping.selected}
              onChange={handleChange}
            />
            {topping.name}
          </label>
        ))}
      </div>

      <button data-testid="submit" type="submit">Submit</button>
    </form>
  );
}