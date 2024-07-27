import { IConsumer, ILocation, IUnsubscribe } from "./type.ts";

function createEvent() {
  const consumerList: IConsumer[] = [];

  function subscribe(c: IConsumer): IUnsubscribe {
    consumerList.push(c);
    return () => {
      consumerList.filter(item => item !== c);
    }
  }

  function notify(arg: ILocation): void {
    consumerList.forEach(item => item(arg));
  }

  return {
    subscribe,
    notify,
  };
}

export default createEvent;
