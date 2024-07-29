import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from "../App.tsx";

const domNode = document.getElementById('root') as HTMLElement;
hydrateRoot(
  domNode,
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
