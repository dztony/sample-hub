import type { ICreateStore, IReducer } from "@/myRedux";

export default function applyMiddleware(middlewareList: Function[]) {
  return (createStore: ICreateStore) => {
    return (reducer: IReducer) => {
      const store = createStore(reducer);
      const chain = middlewareList.map((item) => item(store.getState, store.dispatch));
      store.dispatch = compose(chain)(store.dispatch);
      return store;
    }
  }
}

function compose(functionList: Function[]) {
  if (functionList.length === 0) {
    return (arg: any) => arg;
  }

  if (functionList.length === 1) {
    return functionList[0];
  }

  return functionList.reduce((a, b) => (...args: any[]) => a(b(...args)));
}
