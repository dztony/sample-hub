import React from 'react';
import { Outlet } from "../../lib/ReactRouter";

function Home1() {
  return (
    <div>
      <h2>首页 1</h2>
      <Outlet />
    </div>
  );
}

export default Home1;
