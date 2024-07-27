import React from 'react';
import {
  Pressable,
  View,
  Text,
  StyleSheet, ViewStyle, ActivityIndicator,
} from "react-native";

function ButtonInline(props: IProps) {
  const { text, onPress, buttonStyle, loading = false } = props;

  const handleOnPress = () => {
    if (!loading) {
      onPress();
    } else {
      console.log('按钮加载中，请稍后');
    }
  }

  const renderButton = () => {
    if (loading) {
      return (
        <ActivityIndicator color={'#ccff66'} />
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
      onPress={handleOnPress}
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
    backgroundColor: '#15D1AD',
    borderRadius: 8,
    height: 42,
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default ButtonInline;
