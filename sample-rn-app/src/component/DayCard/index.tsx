import React from 'react';
import {
  View,
  Text,
  StyleSheet, ViewStyle,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IWeather } from "../../utils/common";
import LinearGradient from 'react-native-linear-gradient';

function DayCard(props: IProps) {
  const { weather, wrapStyle } = props;
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['gray', 'red']}
      style={[
        style.container,
        wrapStyle,
      ]}
    >
      <Text style={style.date}>
        {weather.date}
      </Text>

      <View style={style.detail}>
        <View style={style.left}>
          <Ionicons
            name={weather.icon1}
            size={28}
            color="#ffff00"
            style={{ marginRight: 16 }}
          />
          <Text style={style.text}>
            {weather.tag1}
          </Text>
        </View>

        <View style={style.right}>
          <Text style={style.text}>
            {weather.tag2}
          </Text>
          <Ionicons
            name={weather.icon2}
            size={28}
            color="#6666ff"
            style={{ marginLeft: 16 }}
          />
        </View>
      </View>
    </LinearGradient>
  );
}

type IProps = {
  weather: IWeather;
  wrapStyle?: ViewStyle;
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666666',
    borderRadius: 16,
    padding: 16,
  },

  date: {
    textAlign: 'center',
    color: '#FFFFFF',
  },

  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    color: '#FFFFFF',
  },
});

export default DayCard;
