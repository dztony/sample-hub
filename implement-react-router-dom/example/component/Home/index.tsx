import React from 'react';
import { Outlet } from "../../../packages";

function Home() {
  return (
    <div>
      <h1>Home start</h1>
      <div>---</div>

      <Outlet/>

      <div>---</div>
      <h1>Home end</h1>
    </div>
  );
}

export default Home;
