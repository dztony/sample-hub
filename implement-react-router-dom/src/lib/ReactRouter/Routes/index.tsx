import React, { ReactElement, useMemo } from 'react';
import { renderByRoutes } from "./renderByRoutes.tsx";
import createRoutesFromChildren from "./createRoutesFromChildren.ts";

function Routes(props: any) {
  const curRoutes = useMemo(() => {
    return createRoutesFromChildren(props.children)
  }, []);
  const reactNode = renderByRoutes(curRoutes);
  console.log('reactNode - ', reactNode);
  return reactNode;
}

export default Routes;
