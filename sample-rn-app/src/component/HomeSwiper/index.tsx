import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
} from "react-native";
import Swiper from "react-native-swiper";

function HomeSwiper() {
  return (
    <View style={style.container}>
      <Swiper
        showsButtons={false}
        autoplay={true}
        autoplayTimeout={3}
        autoplayDirection={true}
        style={style.swiper}
      >
        <View style={style.wrap}>
          <ImageBackground
            resizeMode={'cover'}
            source={require('../../asset/img/bg.jpg')}
            style={style.swiperImg}
            imageStyle={style.imgStyle}
          />
        </View>

        <View>
          <ImageBackground
            source={require('../../asset/img/login-bg.jpg')}
            style={style.swiperImg}
            imageStyle={style.imgStyle}
          />
        </View>

        <View>
          <ImageBackground
            source={require('../../asset/img/soccer.jpg')}
            style={style.swiperImg}
            imageStyle={style.imgStyle}
          />
        </View>
      </Swiper>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  swiper: {
    height: 150,
  },

  wrap: {

  },
  swiperImg: {
    width: '100%',
    height: '100%',
  },
  imgStyle: {

  },
});

export default HomeSwiper;
