export type IState = Record<any, any>;
export type IAction = {
  type: string;
  payload: Record<any, any>;
};
export type IListener = () => void;

export type IReducer = (initState: IState, action: IAction) => IState;

export type IStore = {
  dispatch: IDispatch;
  getState: IGetState;
  subscribe: (listener: IListener) => any;
};

export type ICreateStore = (r: IReducer) => IStore;

export type IDispatch = (action: IAction | Function) => void;

export type IGetState = () => IState;
