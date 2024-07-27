import React from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function FunctionList() {
  return (
    <View style={style.container}>
      {
        ConfigList.map((item, i) => {
          return (
            <Pressable style={style.item} key={i}>
              <Ionicons
                name={item.icon}
                size={38}
                color="#FFFFFF"
              />
              <Text style={style.content}>
                {item.desc}
              </Text>
            </Pressable>
          );
        })
      }
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  item: {
    width: Dimensions.get('window').width / 4,
    backgroundColor: '#11C88D',
    alignItems: 'center',
    paddingVertical: 8,
  },
  content: {
    color: '#FFFFFF',
    marginTop: 8,
  },
});

type IConfig = {
  icon: string;
  desc: string;
}

const ConfigList: Array<IConfig> = [
  {
    icon: 'scan',
    desc: '扫一扫',
  },
  {
    icon: 'qr-code',
    desc: '付款码',
  },
  {
    icon: 'car-sport',
    desc: '出行',
  },
  {
    icon: 'card',
    desc: '卡包',
  },
];

export default FunctionList;
