import React from 'react';
import {
  HashRouter,
  Link,
  Route,
  Routes,
  Navigate,
} from "../../lib/ReactRouterDom";
import style from './index.module.scss';
import Home from "../../component/Home";
import Home1 from "../../component/Home1";
import Home2 from "../../component/Home2";
import Home3 from "../../component/Home3";
import About from "../../component/About";
import List from "../../component/List";
import NotFound from "../../component/NotFound";

function HashRouterApp() {
  return (
    <HashRouter>
      <div className={style.header}>
        <div>
          <h1>Hash Router APP</h1>
        </div>
        <Link to={'/home'}>
          首页
        </Link>
        <Link to={'/home/1'}>
          首页 - 1
        </Link>
        <Link to={'/home/1/2'}>
          首页 - 1 - 2
        </Link>
        <Link to={'/home/1/2/3'}>
          首页 - 1 - 2 - 3
        </Link>
        <Link to={'/about'}>
          关于
        </Link>
        <Link to={'/list'}>
          列表
        </Link>
        <Link to={'/navigate'}>
          重定向
        </Link>
      </div>

      <Routes>
        <Route path="/home" element={<Home />}>
        <Route path="/1" element={<Home1 />}>
            <Route path="/2" element={<Home2 />}>
              <Route path='/3' element={<Home3 />} />
            </Route>
          </Route>
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/list" element={<List />} />
        <Route path="/notFound" element={<NotFound />} />
        <Route path="/navigate" element={<Navigate to="/notFound" />} />
      </Routes>
    </HashRouter>
  );
}

export default HashRouterApp;
