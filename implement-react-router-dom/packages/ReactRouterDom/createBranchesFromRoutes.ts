import { IBranch, IRoute } from "./type.ts";

function createBranchesFromRoutes(
  nestRouteList: IRoute[],
  branchList: IBranch[] = [],
  parentPath: string = '',
  metaList: IRoute[] = []
): IBranch[] {
  function flattenRouteList(route: IRoute) {
    const curPath = parentPath + route.path;
    const curMetaList = [...metaList, route];
    const curBranch: IBranch = {
      relativePath: curPath,
      metaList: curMetaList,
    };

    if (route.children?.length > 0) {
      createBranchesFromRoutes(route.children, branchList, curPath, curMetaList);
    } else {
      branchList.push(curBranch);
      return;
    }
  }

  nestRouteList.forEach(item => {
    flattenRouteList(item);
  });

  return branchList;
}

export default createBranchesFromRoutes;
