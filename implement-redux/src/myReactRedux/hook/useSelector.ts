import React, { useEffect, useReducer, useRef } from 'react';
import type { IState } from "@/myRedux";
import ReactReduxContext from "@/myReactRedux/ReactReduxContext";

type ISelector = (state: IState) => any;

function useSelector(selector: ISelector): any {
  const { store, subscription } = React.useContext(ReactReduxContext);
  const curStateValue = selector(store.getState());

  const preStateValue = useRef(curStateValue);
  const [_, forceUpdate] = useReducer(pre => !pre, true);

  useEffect(() => {
    const unsubscribe = subscription.subscribe(() => {
      // console.log('每次 dispatch action 后，会执行这里的回调，但是视情况进行 re render - ', new Date().getTime());
      const computeValue = selector(store.getState());
      if (isEqual(computeValue, preStateValue.current)) {
        return;
      }

      preStateValue.current = computeValue;
      forceUpdate();
    });

    return unsubscribe;
  }, [subscription, store, selector]);

  return curStateValue;
}

function isEqual<T>(a: T, b: T) {
  return a === b;
}

export default useSelector;
