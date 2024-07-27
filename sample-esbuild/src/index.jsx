import React from 'react';
import Server from "react-dom/server";
import cat from './cat.jpg';
import css from './index.css';
import testCss from './test.module.css';

let Greet = () => {
  return (
    <div className={css.test}>
      <h1 className={testCss.welcome}>Hello, esbuild!</h1>
      <img src={cat} />
    </div>
  );
};
console.log(Server.renderToString(<Greet />));
