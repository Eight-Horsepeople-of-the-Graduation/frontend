import { createSlice } from "@reduxjs/toolkit";

// This slice is just an example, we will add more slices later when needed in the application.

type CounterState = { value: number }; // Define the initial type state of the slice

const initialState: CounterState = {
  value: 0,
}; // Define the initial state of the slice

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Define the reducers of the slice (The functions that will modify the state)
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: { payload: number }) => {
      state.value += action.payload;
    },
  },
});

// we should export the actions to be able to use them in the components
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
