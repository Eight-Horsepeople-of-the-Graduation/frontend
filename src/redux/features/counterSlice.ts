import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// This slice is just an example, we will add more slices later when needed in the application.

interface CounterState { value: number } // Define the initial type state of the slice

const initialState: CounterState = {
  value: 0,
}; // Define the initial state of the slice

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // Define the reducers of the slice (The functions that will modify the state)
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      if (state.value > 0) state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export default counterSlice.reducer; // I exported the reducer as default to be able to use it in the store
// we should export the actions to be able to use them in the components
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
