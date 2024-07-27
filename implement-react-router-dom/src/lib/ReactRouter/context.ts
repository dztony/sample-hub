import React, { createContext, ReactElement } from "react";
import { ILocation } from "../History";
import { IPush } from "../History/types.ts";

type ILocationContext = {
  location: ILocation;
};

type INavigationContext = {
  navigator: {
    push: IPush;
  };
};

type IRouteContext = {
  outlet: ReactElement | null;
  matches: any[];
  isDataRoute?: boolean;
};

export const LocationContext = createContext<ILocationContext>(null!);

export const NavigationContext = createContext<INavigationContext>(null!);

export const RouteContext = createContext<IRouteContext>({
  outlet: null,
  matches: [],
  isDataRoute: false,
});

export const OutletContext = createContext<unknown>(null);
