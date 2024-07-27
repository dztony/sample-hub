import React, { ReactElement } from "react";
import { IRoute } from "./type.ts";

// 将 Routes 组件包裹的子组件 <Route /> 转换成 route 对象 列表
function createRoutesFromChildren(children: any[]) {
  const routes: IRoute[] = [];

  React.Children.forEach(children, (element: ReactElement) => {
    let curRoute: IRoute = {
      element: element.props.element,
      path: element.props.path,
      children: [],
    };
    if (element.props.children) {
      curRoute['children'] = createRoutesFromChildren(element.props.children);
    }

    routes.push(curRoute);
  });

  return routes;
}

export default createRoutesFromChildren;
