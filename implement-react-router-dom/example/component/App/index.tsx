import React, { useLayoutEffect, useRef, useState } from 'react';
import css from './index.module.scss';
import { BrowserRouter, Link, Route, Routes, Outlet } from "../../../packages";
import DisplayPathname from "../DisplayPathname";
import Home from "../Home";
import User from "../User";
import Profile from "../Profile";
import Blog from "../Blog";
import Common from "../Common";

function App() {

  return (
    <BrowserRouter>
      <div className={css.app}>
        example app
        <div className={"title"}>
          title
        </div>
        <DisplayPathname />

        <Link to={'/666'}>
          导航到 页面 /666
        </Link>

        <Link to={'/home/user/profile'}>
          导航到 页面 /home/user/profile
        </Link>

        <Link to={'/home/blog'}>
          导航到 页面 /home/blog
        </Link>

        <Link to={'/plan/list'}>
          导航到 页面 /plan/list
        </Link>
      </div>

      <Routes>
        <Route path={'/home'} element={<Home />}>
          <Route path={'/user'} element={<User />}>
            <Route path={'/profile'} element={<Profile />} />
          </Route>
          <Route path={'/blog'} element={<Blog />} />
        </Route>
        <Route path={'/666'} element={<Common />} />

        <Route path={'/plan'} element={<div>plan page<Outlet /></div>}>
          <Route path={'/list'} element={<div>plan list page</div>} />
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
