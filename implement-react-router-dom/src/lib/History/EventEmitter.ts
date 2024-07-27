import { IListener, IParams, IUnsubscribe } from "./types.ts";

function EventEmitter() {
  let events: IListener[] = [];

  function subscribe(consumer: IListener): IUnsubscribe {
    events.push(consumer);
    return () => {
      events = events.filter(item => item !== consumer);
    };
  }

  function notify(params: IParams) {
    events.forEach(item => item(params));
  }

  return {
    subscribe,
    notify,
  };
}

export default EventEmitter;
