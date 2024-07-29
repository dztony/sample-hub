import React from 'react';
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <Link to={'/'}>首页</Link>
        <br />
        <Link to={'/book'}>Book page</Link>
      </header>

      <Outlet />

      <footer>
        底部
      </footer>
    </div>
  );
}

export default Layout;
