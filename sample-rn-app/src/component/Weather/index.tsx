import React from 'react';
import {
  View,
  StyleSheet,
  Text, Pressable, Dimensions, ScrollView,
} from "react-native";
import DayCard from "../DayCard";
import { IWeather } from "../../utils/common";

function Weather() {
  return (
    <ScrollView style={style.container}>
      <View style={{ marginBottom: 12 }}>
        <Text style={style.location}>
          中国 深圳市 福田区 市中心
        </Text>
      </View>


      <View style={style.dataArea}>
        {
          DataList.map((item, i) => {
            return (
              <Pressable style={style.item} key={i}>
                <Text>
                  {item.content}
                </Text>

                <Text>
                  {item.level}
                </Text>
              </Pressable>
            );
          })
        }
      </View>

      <View style={style.weatherArea}>
        {
          WeatherList.map((item, i) => {
            return (
              <DayCard
                weather={item}
                key={i}
                wrapStyle={{
                  marginBottom: 8,
                }}
              />
            );
          })
        }
      </View>
    </ScrollView>
  );
}

type IData = {
  content: string;
  level: string;
}

const DataList: Array<IData> = [
  {
    content: '紫外线强度',
    level: '高',
  },
  {
    content: '洗车指数',
    level: '较适宜',
  },
  {
    content: '钓鱼指数',
    level: '较适宜',
  },
];

const WeatherList: Array<IWeather> = [
  {
    date: '2023-11-15',
    tag1: '晴 15度',
    tag2: '5度 晴转多云',
    icon1: 'sunny-outline',
    icon2: 'cloudy-night',
  },
  {
    date: '2023-11-16',
    tag1: '晴 16度',
    tag2: '5度 雷雨',
    icon1: 'sunny-outline',
    icon2: 'thunderstorm',
  },
  {
    date: '2023-11-17',
    tag1: '晴 17度',
    tag2: '5度 雷雨',
    icon1: 'sunny-outline',
    icon2: 'thunderstorm',
  },
  {
    date: '2023-11-18',
    tag1: '晴 17度',
    tag2: '5度 雷雨',
    icon1: 'sunny-outline',
    icon2: 'thunderstorm',
  },
  {
    date: '2023-11-119',
    tag1: '晴 17度',
    tag2: '5度 雷雨',
    icon1: 'sunny-outline',
    icon2: 'thunderstorm',
  },
];

const style = StyleSheet.create({
  container: {

  },

  location: {
    fontSize: 28,
    color: '#222222',
  },

  dataArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    // flex: 1,
    backgroundColor: '#DFF3BC',
    borderRadius: 8,
    padding: 16,
    minWidth: Dimensions.get('window').width / 4,

    alignItems: 'center',
  },

  weatherArea: {
    marginTop: 16,
  },
});

export default Weather;
