import { IAction, IDispatch, IGetState } from "@/myRedux";

export default function thunk(getState: IGetState, dispatch: IDispatch) {
  return (next: Function) => {
    return (action: IAction) => {
      const curAction = action as any;
      if (typeof curAction === 'function') {
        return curAction(getState, dispatch);
      }

      next(action);
    }
  }
}
