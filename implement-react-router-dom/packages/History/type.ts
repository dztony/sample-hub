export type ILocation = {
  pathname: string;
};

export type IConsumer = (arg: ILocation) => void;

export type IUnsubscribe = () => void;

export type IHistoryListen = (c: IConsumer) => IUnsubscribe;
export type IHistoryPush = (path: string) => void;

export type IHistory = {
  listen: IHistoryListen;
  push: IHistoryPush;
  location: ILocation;
};
