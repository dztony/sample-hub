import React, { ReactNode, useLayoutEffect, useState } from 'react';
import { createBrowserHistory, IParams } from "../History";
import { Router } from "../ReactRouter";

const history = createBrowserHistory();

function BrowserRouter(props: IProps) {
  const { children } = props;

  const [params, setParams] = useState<IParams>({
    location: history.location,
  });

  useLayoutEffect(() => {
    const unsubscribe = history.listen(setParams);
    return unsubscribe;
  }, []);

  return (
    <Router
      navigator={history}
      location={params.location}
    >
      {children}
    </Router>
  );
}

type IProps = {
  children: ReactNode;
};

export default BrowserRouter;
