import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

function ErrorMsg(props: IProps) {
  if (!props.visible) {
    return null;
  }

  return (
    <View style={style.container}>
      <Text style={style.content}>
        {props.text}
      </Text>
    </View>
  );
}

type IProps = {
  visible: boolean;
  text: string;
}

const style = StyleSheet.create({
  container: {
  },
  content: {
    color: 'red',
  },
});

export default ErrorMsg;
