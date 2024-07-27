import createStore from "@/myRedux/createStore";
import combineReducers from "@/myRedux/combineReducers";


import {
  IStore,
  IListener,
  IState,
  IAction,
  IReducer,
  ICreateStore,
  IGetState,
  IDispatch,
} from '@/myRedux/types';

export {
  createStore,
  combineReducers,
}

export type {
  IStore,
  IListener,
  IState,
  IAction,
  IReducer,
  ICreateStore,
  IGetState,
  IDispatch,
}
