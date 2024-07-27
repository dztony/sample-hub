import React from 'react';
import { IStore } from "@/myRedux";
import Subscription from "@/myReactRedux/Provider/Subscription";

export type IReactReduxContext = {
  store: IStore;
  subscription: Subscription;
};

const ReactReduxContext = React.createContext<IReactReduxContext>(null as unknown as IReactReduxContext);

export default ReactReduxContext;
