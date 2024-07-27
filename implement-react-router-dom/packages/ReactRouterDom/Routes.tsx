import React, { ReactElement, ReactNode } from 'react';
import createRoutesFromChildren from "./createRoutesFromChildren.ts";
import createBranchesFromRoutes from "./createBranchesFromRoutes.ts";
import { useLocation } from "./hook.ts";
import matchBranch from "./matchBranch.tsx";
import { RouteParentContext } from "./context.ts";
import { IRoute } from "./type.ts";

function Routes(props: IProps) {
  const location = useLocation();

  const nestRouteList = createRoutesFromChildren(props.children);
  const branchList = createBranchesFromRoutes(nestRouteList);
  const curBranch = matchBranch(branchList, location.pathname);
  console.log('匹配获取到的分支 - ', curBranch);

  return curBranch.metaList.reduceRight((child: any, item) => {
    return (
      <RouteParentContext.Provider
        value={{
          outlet: child,
        }}
      >
        {item.element}
      </RouteParentContext.Provider>
    );
  }, null);
}

type IProps = {
  children: ReactNode;
};

export default Routes;
