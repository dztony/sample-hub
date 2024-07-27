import React from 'react';
import {
  View,
  StyleSheet,
  Text, Dimensions,
} from 'react-native';

const viewHeight = Dimensions.get('window').height;
const viewWidth = Dimensions.get('window').width;


function PageTitle(props: IProps) {
  return (
    <View style={style.welcome}>
      <Text style={style.welcomeContent}>
        {props.text}
      </Text>
    </View>
  );
}

type IProps = {
  text: string;
}

const style = StyleSheet.create({
  welcome: {
    marginVertical: viewHeight / 6,
  },
  welcomeContent: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
});

export default PageTitle;
