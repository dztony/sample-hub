import React from 'react';
import { Outlet } from "../../lib/ReactRouter";

function Home3() {
  return (
    <div>
      <h2>首页 3</h2>
      <Outlet />
    </div>
  );
}

export default Home3;
