import React from 'react';
import { Outlet } from "../../../packages";

function User() {
  return (
    <div>
      <h1>User start</h1>
      <div>---</div>

      <Outlet/>

      <div>---</div>
      <h1>User end</h1>
    </div>
  );
}

export default User;
