import React, {
  View,
  StyleSheet,
  Dimensions,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { ReactElement } from "react";
import * as Animatable from 'react-native-animatable';

const viewWidth = Dimensions.get('window').width;

function FormBg(props: IProps) {
  const { customStyle, children } = props;
  return (
    <Animatable.View
      style={[
        style.container,
        customStyle,
      ]}
      animation={'fadeInUpBig'}
    >
      {children}
    </Animatable.View>
  );
}

type IProps = {
  children: ReactElement,
  customStyle: ViewStyle,
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: viewWidth,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    paddingVertical: 48,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
});

export default FormBg;
