import { IDispatch, IStore } from "@/myRedux";

export default function logger(getState: () => IStore, dispatch: IDispatch) {
  return (next: Function) => {
    return (action: IStore) => {
      console.log('[logger start]', action);
      next(action);
      console.log('[logger end]', action);
    }
  }
}
