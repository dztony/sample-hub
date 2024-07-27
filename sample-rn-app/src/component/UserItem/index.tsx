import React from 'react';
import {
  View,
  StyleSheet, Text, Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function UserItem(props: IProps) {
  return (
    <Pressable
      style={({pressed}) => ([
        style.container,
        {
          backgroundColor: pressed ? '#C1FFC1' : '#FFFFFF',
        },
      ])}
      onPress={props.onPress}
    >
      <View style={style.left}>
        <Ionicons
          name={props.icon}
          color={'#66cc66'}
          size={24}
        />
        <View style={style.desc}>
          <Text style={style.descText}>
            {props.desc}
          </Text>
        </View>
      </View>

      <Ionicons
        name={'chevron-forward-outline'}
        color={'#A3A3A3'}
        size={18}
      />
    </Pressable>
  );
}

type IProps = {
  icon: string;
  desc: string;
  onPress?: () => void;
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    // backgroundColor: 'green',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#B4CDCD',
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  desc: {
    marginLeft: 8,
  },
  descText: {
    fontSize: 16,
  },
});

export default UserItem;
