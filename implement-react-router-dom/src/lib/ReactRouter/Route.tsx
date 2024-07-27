import React, { ReactElement, ReactNode } from 'react';

function Route(props: IProps): any {
  console.log('props - ', props);
  // return null;
}

type IProps = {
  path: string;
  element: ReactElement;
  children?: ReactNode;
}
export default Route;
