import React, { ReactNode, useMemo } from 'react';
import { useNavigate } from "../ReactRouter";

function Link(props: IProps) {
  const { to, onClick, children } = props;
  const navigate = useNavigate();

  const handleOnClick = useMemo(() => {
    if (onClick) {
      return onClick;
    } else {
      return (event: any) => {
        event.preventDefault();
        navigate(to);
      }
    }
  }, [])

  return (
    <a href={to} onClick={handleOnClick}>
      {children}
    </a>
  );
}

type IProps = {
  to: string;
  onClick?: () => void;
  children: ReactNode;
};

export default Link;
