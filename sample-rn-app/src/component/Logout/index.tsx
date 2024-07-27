import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
} from "react-native";
import { useDispatch } from 'react-redux';
import { logout } from "../../store/user";

function Logout() {
  const dispatch = useDispatch();

  const handleClickLogout = () => {
    dispatch(logout());
  }

  return (
    <Pressable
      style={({pressed}) => ([
        style.container,
        {
          backgroundColor: pressed ? '#C1FFC1' : '#FFFFFF',
        },
      ])}
      onPress={handleClickLogout}
    >
      <Text style={style.text}>
        退出
      </Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: '#B4CDCD',
    borderBottomWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },

  text: {
    fontSize: 16,
  },
});

export default Logout;
