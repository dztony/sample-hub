import React, { useState } from 'react';
// import Icon from '../../asset/icon.jpg';
import * as css from './index.module.scss';

function Home() {
  const [count, setCount] = useState(123);

  function handleAdd() {
    setCount(count + 1);
  }

  function handleRemove() {
    setCount(count - 1);
  }

  return (
    <div id={'home-app'} className={css.home}>
      Home page 888888

      {/*<img src={Icon} />*/}
      <button onClick={handleAdd}>按钮 增加</button>
      <br />
      <button onClick={handleRemove}>按钮 减少asdfasd</button>
      <div>count - {count}</div>

      <div>当前环境 - {process.env.mode}</div>
    </div>
  );
}

export default Home;
