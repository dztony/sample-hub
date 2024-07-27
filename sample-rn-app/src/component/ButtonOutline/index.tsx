import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet, PressableProps, ViewStyle, ActivityIndicator,
} from "react-native";

function ButtonOutline(props: IProps) {
  const { text, onPress, buttonStyle, loading = false } = props;

  const renderButton = () => {
    if (loading) {
      return (
        <ActivityIndicator color={'#ff6600'} />
      );
    }

    return (
      <Text style={style.content}>
        {text}
      </Text>
    );
  }

  return (
    <Pressable
      style={[
        style.container,
        buttonStyle,
      ]}
      onPress={onPress}
    >
      {renderButton()}
    </Pressable>
  );
}

type IProps = {
  text: string | number;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  loading?: boolean;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 8,
    height: 42,
    borderWidth: 1,
    borderColor: '#369157',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
    color: '#369157',
    fontSize: 18,
  },
});

export default ButtonOutline;
