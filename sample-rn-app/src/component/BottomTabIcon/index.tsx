import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";

function BottomTabIcon(props: IProps) {
  return (
    <Ionicons
      name={props.name}
      size={24}
      color="#15D3B0"
    />
  );
}

type IProps = {
  name: string;
}

export default BottomTabIcon;
