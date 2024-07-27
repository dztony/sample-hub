import React from 'react';
import { useDispatch } from "@/myReactRedux";
import { actionCounterReset } from "@/state/feature/counterReducer";

function CounterUpdate() {
  const dispatch = useDispatch();
  console.log('CounterUpdate render - ', new Date().getTime());

  return (
    <div>
      <h2>
        CounterUpdate 组件
      </h2>
      <div>
        <button
          onClick={() => {
            dispatch(actionCounterReset());
          }}
        >
          重置 counter
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({
              type: 'counter/increment',
              payload: {
                offset: 3,
              },
            });
          }}
        >
          计数器 - 增加 3
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            dispatch({
              type: 'counter/decrement',
              payload: {
                offset: 1,
              },
            });
          }}
        >
          计数器 - 减少 1
        </button>
      </div>
    </div>
  );
}

export default CounterUpdate;
