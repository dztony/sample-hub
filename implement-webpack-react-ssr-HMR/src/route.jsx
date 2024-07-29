import React, { lazy } from 'react';

export const routeConfigList = [
  {
    path: '/',
    async lazy () {
      const Layout = (await import(/* webpackChunkName: "component_layout" */ './component/Layout/index.jsx')).default;
      return {
        Component: Layout,
      };
    },
    children: [
      {
        index: true,
        async lazy() {
          const Home = (await import(/* webpackChunkName: "page_home" */ './page/home/index.jsx')).default;
          return {
            Component: Home,
          };
        },
      },
      {
        path: 'book',
        async lazy() {
          const Book = (await import(/* webpackChunkName: "page_book" */ './page/book/index.jsx')).default;
          return {
            Component: Book,
          };
        },
      },
    ],
  },
];
