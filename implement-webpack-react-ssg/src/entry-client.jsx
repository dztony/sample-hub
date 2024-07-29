import React from 'react';
import { hydrateRoot } from "react-dom/client";
import Home from "./page/home/index.jsx";

function clientRender() {
  const domNode = document.getElementById("root");
  hydrateRoot(domNode, <Home />);
}

clientRender();
