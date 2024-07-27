import { IBranch, IRoute } from "./type.ts";

function matchBranch(branchList: IBranch[], pathname: string): IBranch {
  for (const item of branchList) {
    if (item.relativePath === pathname) {
      return item
    }
  }

  return {
    relativePath: '404',
    metaList: [
      {
        path: '404',
        element: <div>404 not found</div>,
        children: [],
      },
    ],
  };
}

export default matchBranch;
