import { IAction, IDispatch, IGetState, IState } from "@/myRedux";
import { timeout } from "@/util/common";

const initState = {
  value: 0,
  test: '测试数据 - 不会变更',
};

function counterReducer(state: IState = initState, action: IAction) {
  if (action.type === 'counter/increment') {
    const preValue = state.value;
    return {
      ...state,
      value: preValue + action.payload.offset,
    };
  }

  if (action.type === 'counter/decrement') {
    const preValue = state.value;
    return {
      ...state,
      value: preValue - action.payload.offset,
    };
  }

  if (action.type === 'counter/reset') {
    return {
      ...state,
      value: action.payload.initValue,
    }
  }

  return state;
}

export function actionCounterReset() {
  return async function(getState: IGetState, dispatch: IDispatch) {
    await timeout();
    const initValue = 0;
    dispatch({
      type: 'counter/reset',
      payload: {
        initValue,
      },
    });
  }
}

export default counterReducer;
