import React from 'react';
import { useOutlet } from "./hook.tsx";

function Outlet(props: any) {
  return useOutlet(props.context);
}

export default Outlet;
