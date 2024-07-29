import React from 'react';
import style from './index.module.scss';
import { timeout } from "@/utils/common";

function Home() {
  return (
    <div className={style.container}>
      Home page
      <div className={style.block1}>
        homa page 区块 1
      </div>
      <button
        style={{ height: 50, width: '100%' }}
        id='id-block1-button'
        onClick={async(event) => {
          await timeout(3);
        }}
      >
        点击按钮
      </button>
      <div className={style.block2} id={'id-home-block2'}>
        homa page 区块 2
      </div>
      <div className={style.block3} id={'id-home-block3'}>
        homa page 区块 3
      </div>
      <div className={style.block4} id={'id-home-block4'}>
        homa page 区块 4
      </div>
      <div className={style.block5} id={'id-home-block5'}>
        homa page 区块 5
      </div>
    </div>
  );
}

export default Home;
