import Home from "./page/home/index.jsx";
import { renderToString } from "react-dom/server";
import React from 'react';

export function serverRenderer() {
  return renderToString(<Home />);
}
