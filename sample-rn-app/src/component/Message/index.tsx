import React, { useRef } from 'react';
import {
  ScrollView,
  View,

  StyleSheet,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const viewWidth = Dimensions.get('window').width;

function Message() {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleBeginDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log('开始 - contentOffset ', event.nativeEvent.contentOffset);
  }

  const handleEndDrag = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const targetDistance = viewWidth / 8;
    if (x < targetDistance) {
      scrollViewRef.current?.scrollTo({
        x: 0,
        animated: true,
      });
    } else {
      scrollViewRef.current?.scrollTo({
        x: viewWidth,
        animated: true,
      })
    }
  }

  return (
    <View style={style.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal={true}
        style={{
          width: '100%',
        }}
        showsHorizontalScrollIndicator={false}
        onScrollBeginDrag={handleBeginDrag}
        onScrollEndDrag={handleEndDrag}
      >
        <View style={style.main}>
          <Pressable style={style.message}>
            <Text>
              普通消息
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              scrollViewRef.current?.scrollTo({
                x: 0,
                animated: true,
              });
            }}
            style={style.deleteArea}
          >
            <Ionicons
              name={'trash-outline'}
              color={'yellow'}
              size={22}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
  },

  main: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  message: {
    width: viewWidth,
  },

  deleteArea: {
    backgroundColor: 'red',
    width: viewWidth / 4,
  },
});

export default Message;
