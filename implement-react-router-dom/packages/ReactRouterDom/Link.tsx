import React, { ReactNode } from 'react';
import { useNavigate } from "./hook.ts";

function Link(props: IProps) {
  const navigate = useNavigate();

  return (
    <div style={{ cursor: 'pointer' }}>
      <a
        onClick={() => {
          navigate(props.to);
        }}
      >
        {props.children}
      </a>
    </div>
  );
}

type IProps = {
  children: ReactNode;
  to: string;
};

export default Link;
