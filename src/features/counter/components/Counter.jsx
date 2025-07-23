import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment } from '../store/counterSlice'

export function Counter() {
  // !TODO: Bug. Enabling ln 7 and line 19 results in erro stating you can only call hook within the body. Why is this happening, if the body of Counter is here.
  // const count = useSelector(state => state.counter.value)
  // const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          // onClick={() => dispatch(()=>increment())}
        >
          Increment
        </button>
        {/* <span>{count}</span> */}
        <button
          aria-label="Decrement value"
          // onClick={() => dispatch(()=>decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
