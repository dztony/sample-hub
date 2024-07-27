import React from "react"
import { ILocation } from "../../History";
import { RouteContext } from "../context.ts";
import { useLocation } from "../hook.tsx";
import { IRoute } from "./type.ts";


const joinPaths = (paths: string[]) => paths.join("/").replace(/\/\/+/g, "/");

// 扁平化 routes 为一维数组
function flattenRoutes(routes: IRoute[], branches: any[] = [], parentsMeta: any[] = [], parentPath = "") {
  function flattenRoute(route: IRoute) {
    const meta = {
      relativePath: route.path || "",
      route,
    };
    const path = joinPaths([parentPath, meta.relativePath]);

    const routesMeta = parentsMeta.concat(meta);
    if (route.children.length > 0) {
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null) {
      return;
    }
    branches.push({ path, routesMeta });
  }

  routes.forEach((route) => {
    flattenRoute(route);
  });

  return branches;
}

function compilePath(path: string, end = true) {
  const paramNames: any[] = [];
  let regexpSource =
    "^" +
    path
      .replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
      .replace(/^\/*/, "/") // Make sure it has a leading /
      .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
      .replace(/\/:(\w+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return "/([^\\/]+)";
      });
  if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  }
  let matcher = new RegExp(regexpSource, "i");

  return [matcher, paramNames];
}

function matchPath(pattern: any, pathname: any) {
  const [matcher] = compilePath(pattern.path, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;

  const matchedPathname = match[0];
  const pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  return {
    pathname: matchedPathname,
    pathnameBase,
    pattern,
  };
}


// 来找到待渲染的路由分支
function matchRouteBranch(branch: any, pathname: string) {
  const { routesMeta } = branch;
  const matches: any[] = [];
  let matchedPathname = "/";
  for (let i = 0; i < routesMeta.length; i++) {
    const meta = routesMeta[i];
    const end = i === routesMeta.length - 1;
    let remainingPathname =
      matchedPathname === "/"
        ? pathname
        : pathname.slice(matchedPathname.length) || "/";
    const match = matchPath(
      { path: meta.relativePath, end },
      remainingPathname
    );
    if (!match) return null;
    let route = meta.route;
    matches.push({
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: joinPaths([matchedPathname, match.pathnameBase]),
      route,
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}

function matchRoutes(routes: IRoute[], location: ILocation) {
  const branches = flattenRoutes(routes);
  let matches = null;
  const pathname = location.pathname;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i], pathname) as any[];
  }
  return matches;
}

function _renderMatches(matches: any[], parentMatches: any[] = []) {
  let renderedMatches = matches;
  return renderedMatches.reduceRight((outlet, match, index) => {
    let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
    function getChildren() {
      let children;
      if (match.route.Component) {
        children = <match.route.Component />;
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return (
        <RouteContext.Provider
          value={{
            outlet,
            matches,
          }}
        >
          {children}
        </RouteContext.Provider>
      );
    }
    return getChildren();
  }, null);
}

export function renderByRoutes(routes: IRoute[]) {
  const location = useLocation();
  let { matches: parentMatches } = React.useContext(RouteContext);
  const matches: any[] = matchRoutes(routes, location) ?? [];
  const renderedMatches = _renderMatches(matches, parentMatches);
  return renderedMatches;
}
