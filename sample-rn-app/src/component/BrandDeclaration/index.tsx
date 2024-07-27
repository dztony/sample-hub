import React from 'react';
import {
  View,
  Text,
  StyleSheet, ViewStyle,
} from "react-native";

function BrandDeclaration(props: IProps) {
  const { wrapStyle } = props;

  const year = new Date().getFullYear();
  const display = `@${year} 小黑公司所有`;
  return (
    <View
      style={[
        style.container,
        wrapStyle,
      ]}
    >
      <Text style={style.content}>
        {display}
      </Text>
    </View>
  );
}

type IProps = {
  wrapStyle?: ViewStyle;
}

const style = StyleSheet.create({
  container: {

  },
  content: {
    textAlign: 'center',
    color: '#222222',
  },
});

export default BrandDeclaration;
