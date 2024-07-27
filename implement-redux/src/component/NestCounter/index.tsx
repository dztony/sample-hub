import React from 'react';
import CounterUpdate from "@/component/CounterUpdate";
import DisplayCounter from "@/component/DisplayCounter";
import { useSelector } from "@/myReactRedux";

function NestCounter() {
  const testValue = useSelector(state => state.counter.test);

  console.log('NestCounter render - ', new Date().getTime());
  return (
    <React.Fragment>
      <h2>
        NestCounter 组件 - {testValue}
      </h2>
      <CounterUpdate />
      <DisplayCounter />
    </React.Fragment>
  );
}

export default NestCounter;
