import React from 'react';
import { useLocation } from "../../../packages";

function DisplayPathname() {
  const { pathname } = useLocation();

  return (
    <div>
      当前的 pathname - {pathname}
    </div>
  );
}

export default DisplayPathname;
