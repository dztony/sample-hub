import React from 'react';
import { useSelector } from '@/myReactRedux';

function DisplayCounter() {
  const counterValue = useSelector(state => state.counter.value);
  console.log('DisplayCounter render - ', new Date().getTime());
  return (
    <div>
      <h2>展示组件</h2>
      <div>
        计数器数值 - {counterValue}
      </div>
    </div>
  );
}

export default DisplayCounter;
