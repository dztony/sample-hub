import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/global.scss';
import HashRouterApp from "./app/HashRouterApp";
import BrowserRouterApp from "./app/BrowserRouterApp";


// ReactDOM.createRoot(document.getElementById('root')!).render(<HashRouterApp />);
ReactDOM.createRoot(document.getElementById('root')!).render(<BrowserRouterApp />);
