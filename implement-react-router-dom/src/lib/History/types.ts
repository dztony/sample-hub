export type ILocation = {
  pathname: string;
};

export type IParams = {
  location: ILocation,
};

export type IPush = (path: string) => void;

export type IListener = (p: IParams) => void;

export type IUnsubscribe = () => void;

export type IHistory = {
  location: ILocation;
  push: IPush;
  listen: (listener: IListener) => IUnsubscribe;
};

