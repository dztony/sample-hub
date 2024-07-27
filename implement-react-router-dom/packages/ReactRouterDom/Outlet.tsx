import React from 'react';
import { RouteParentContext } from "./context.ts";

function Outlet() {
  return React.useContext(RouteParentContext).outlet;
}

export default Outlet;
