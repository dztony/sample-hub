import React, { ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouterContext } from "./context.ts";
import { createBrowserHistory, ILocation } from "../History";
import { IBrowserContext } from "./type.ts";

function BrowserRouter(props: IProps) {
  const historyRef = useRef(createBrowserHistory());
  const [curLocation, setCurLocation] = useState<ILocation>(historyRef.current.location);

  const contextValue = useMemo<IBrowserContext>(() => {
    return {
      navigate: historyRef.current.push,
      location: curLocation,
    };
  }, [curLocation])

  useLayoutEffect(() => {
    return historyRef.current.listen(setCurLocation);
  }, []);

  return (
    <BrowserRouterContext.Provider value={contextValue}>
      {props.children}
    </BrowserRouterContext.Provider>
  );
}

type IProps = {
  children: ReactNode;
};

export default BrowserRouter;
