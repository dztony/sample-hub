import type { IListener, IStore } from "@/myRedux";

export default class Subscription {
  listeners: Map<number, IListener>;
  listenerId: number;
  unsubscribe: () => void;

  constructor(store: IStore) {
    this.listeners = new Map();
    this.listenerId = 0;
    this.unsubscribe = store.subscribe(() => {
      this.notify();
    });
  }

  subscribe(curListener: IListener) {
    this.listenerId += 1;
    const curId = this.listenerId;
    this.listeners.set(curId, curListener);

    return () => {
      this.listeners.delete(curId);
    };
  }

  notify() {
    this.listeners.forEach((listenerItem, i) => {
      listenerItem();
    })
  }
}
