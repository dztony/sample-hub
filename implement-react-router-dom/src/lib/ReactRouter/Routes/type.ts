import { ReactElement } from "react";

export type IRoute = {
  element: ReactElement;
  path: string;
  children: IRoute[];
};
