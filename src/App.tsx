import { useAppDispatch, useAppSelector } from "./redux/hooks";
import {
  decrement,
  increment,
  incrementByAmount,
} from "./redux/features/counterSlice";
import { useRef } from "react";

function App() {
  const dispatch = useAppDispatch();
  const numberInputRef = useRef<HTMLInputElement>(null);
  const counter = useAppSelector((state) => state.counter.value);

  const increaseCounter = () => dispatch(increment());
  const decreaseCounter = () => dispatch(decrement());
  const addAmount = () => {
    if (numberInputRef.current) {
      const amount = parseInt(numberInputRef.current.value);
      if (amount) {
        dispatch(incrementByAmount(amount));
      }
    }
  };

  return (
    <>
      <div>
        <div>
          <span>Counter: {counter}</span>
        </div>
        <div>
          <button onClick={increaseCounter}>Increment</button>
          <button onClick={decreaseCounter}>Decrement</button>
        </div>
        <div>
          <input type="number" ref={numberInputRef} />
          <button onClick={addAmount}>Add Amount</button>
        </div>
      </div>
    </>
  );
}

export default App;
