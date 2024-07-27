import type {
  IAction,
  IListener,
  IStore,
  IReducer,
} from "@/myRedux/types";

export default function createStore(reducer: IReducer): IStore {
  let state: any;
  let listenerCollection: Map<number, IListener> = new Map();
  let collectionId = 0;

  function subscribe(curListener: IListener) {
    collectionId += 1;
    const curId = collectionId;
    listenerCollection.set(curId, curListener);

    return () => {
      listenerCollection.delete(curId);
    };
  }

  function dispatch(curAction: IAction | any) {
    const preState = state;
    const curState = reducer(preState, curAction);
    state = curState;

    // 通知消费者
    listenerCollection.forEach((listenerItem, key) => {
      listenerItem();
    });
  }

  function getState() {
    return state;
  }

  // 初始化状态逻辑
  dispatch({
    type: '@@redux/init',
    payload: {},
  });

  return {
    dispatch,
    getState,
    subscribe,
  };
}
