import React from 'react';
import DisplayCounter from "@/component/DisplayCounter";
import CounterUpdate from "@/component/CounterUpdate";
import NestCounter from "@/component/NestCounter";
import { Provider } from "@/myReactRedux";
import store from "@/state/store";

function ReduxV1() {
  return (
    <Provider store={store}>
      <div>
        <h1>
          首页
        </h1>
        <DisplayCounter />
        <CounterUpdate />

        <div>----------------------</div>
        <NestCounter />
      </div>
    </Provider>
  )
}

export default ReduxV1;
