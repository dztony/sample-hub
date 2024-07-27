import React, { createContext } from 'react';
import { IBrowserContext, IRouteParentContext } from "./type.ts";

export const BrowserRouterContext = createContext<IBrowserContext>(null!);

export const RouteParentContext = createContext<IRouteParentContext>(null!);
