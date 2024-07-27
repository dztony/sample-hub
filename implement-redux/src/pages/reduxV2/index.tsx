import React, { useSyncExternalStore } from 'react';
import store from "@/state/store";

function ReduxV2() {
  const { counter } = useSyncExternalStore(store.subscribe, store.getState, store.getState);
  console.log('state - ', counter);

  return (
    <div>
      <h1>
        基于 useSyncExternalStore 实现的状态管理
      </h1>

      <div>
        counter - {counter.value}
      </div>

      <div>
        testValue - {counter.test}
      </div>

      <div>
        <button
          onClick={() => {
            store.dispatch({
              type: 'counter/increment',
              payload: {
                offset: 6,
              },
            });
          }}
        >
          counter 增加
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            store.dispatch({
              type: 'counter/reset',
              payload: {
                initValue: -1,
              },
            });
          }}
        >
          counter 重置
        </button>
      </div>
    </div>
  );
}

export default ReduxV2;
