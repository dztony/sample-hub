import { IDispatch, IStore } from "@/myRedux";

export default function loggerV2(getState: () => IStore, dispatch: IDispatch) {
  return (next: Function) => {
    return (action: IStore) => {
      console.log('[logger V2 - start]', action);
      next(action);
      console.log('[logger V2 - end]', action);
    }
  }
}
