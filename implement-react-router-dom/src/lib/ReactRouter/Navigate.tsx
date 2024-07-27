import React, { useEffect } from 'react';

import { useNavigate } from "./hook.tsx";

function Navigate(props: IProps) {
  const { to } = props;
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [])

  return null;
}

type IProps = {
  to: string;
};

export default Navigate;
