import { createRoot } from "react-dom/client";
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routeConfigList } from "./route.jsx";

function appEntryRender() {
  const domNode = document.getElementById('root');
  const root = createRoot(domNode);
  const router = createBrowserRouter(routeConfigList);

  root.render(<RouterProvider router={router} />);
}

appEntryRender();
