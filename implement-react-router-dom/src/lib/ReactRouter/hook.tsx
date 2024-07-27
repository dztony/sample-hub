import React, { useCallback, useContext } from 'react';
import { LocationContext, NavigationContext, OutletContext, RouteContext } from "./context.ts";

export function useLocation() {
  return useContext(LocationContext).location;
}

export function useNavigate() {
  const { navigator } = useContext(NavigationContext);

  const navigate = useCallback((to: string) => {
    navigator.push(to);
  }, [navigator]);

  return navigate;
}

export function useOutlet(context?: unknown) {
  let outlet = useContext(RouteContext).outlet;
  if (outlet) {
    return (
      <OutletContext.Provider value={context}>
        {outlet}
      </OutletContext.Provider>
    );
  }
}

