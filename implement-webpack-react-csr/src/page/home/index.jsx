import React from 'react';
import * as css from './index.module.scss';
import Icon from '../../asset/icon.jpg';

function Home() {
  return (
    <div className={css.home}>
      Home page

      <img src={Icon} />
    </div>
  );
}

export default Home;
