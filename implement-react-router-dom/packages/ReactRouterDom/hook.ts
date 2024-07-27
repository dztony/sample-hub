import React, { useContext } from 'react';
import { BrowserRouterContext } from "./context.ts";

export function useNavigate() {
  return useContext(BrowserRouterContext).navigate;
}

export function useLocation() {
  return useContext(BrowserRouterContext).location;
}
