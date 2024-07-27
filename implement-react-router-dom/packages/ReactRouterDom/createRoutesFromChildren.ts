import React, { ReactElement, ReactNode } from 'react';
import { IRoute } from "./type.ts";

function createRoutesFromChildren(children: ReactNode): IRoute[] {
  const routeList: IRoute[] = [];
  React.Children.map(children as ReactElement, (child: ReactElement) => {
    const childProps = child.props;
    const curRoute: IRoute = {
      path: childProps.path,
      element: childProps.element,
    };

    if (childProps.children) {
      curRoute.children = createRoutesFromChildren(childProps.children);
    }

    routeList.push(curRoute);
  });

  return routeList;
}

export default createRoutesFromChildren;
