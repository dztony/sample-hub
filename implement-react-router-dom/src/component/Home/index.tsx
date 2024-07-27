import React from 'react';
import { Outlet } from "../../lib/ReactRouter";

function Home() {
  return (
    <div>
      <h1>首页</h1>
      <Outlet />
    </div>
  );
}

export default Home
