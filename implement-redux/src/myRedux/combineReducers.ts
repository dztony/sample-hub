import type { IAction, IReducer, IState } from "@/myRedux";

export default function combineReducers(reducers: Record<string, IReducer>) {
  return function reducer(state: IState, action: IAction) {
    const nextState: Record<string, IState> = {};
    for (const key of Object.keys(reducers)) {
      const curReducer = reducers[key];
      const curState = state ? state[key] : undefined;
      nextState[key] = curReducer(curState, action);
    }

    return nextState;
  }
}
