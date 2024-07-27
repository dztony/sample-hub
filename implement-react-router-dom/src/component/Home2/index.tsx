import React from 'react';
import { Outlet } from "../../lib/ReactRouter";

function Home2() {
  return (
    <div>
      <h2>首页 2</h2>
      <Outlet />
    </div>
  );
}

export default Home2;
