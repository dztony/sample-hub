import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Logout from "../../component/Logout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { EnumRoute } from "../../utils/route";
import Setting from "../../component/Setting";
import About from "../../component/About";
import { useSelector } from 'react-redux';

function ScreenProfile() {
  const navigation = useNavigation<NavigationProp<any>>();

  const { isLogin, sessionToken } = useSelector(state => (state as any).user);

  const handleClickLogin = () => {
    navigation.navigate(EnumRoute.routeBase, {
      screen: EnumRoute.login,
    })
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.avatar}>
        <Image
          source={require('../../asset/img/soccer.jpg')}
          resizeMode={'stretch'}
          style={{
            height: 60,
            width: 60,
            borderRadius: 30,
          }}
        />
      </View>

      {
        isLogin &&
        <View style={style.itemList}>
          <Setting />
          <About />
          <Logout />
        </View>
      }

      {
        !isLogin &&
        <Animatable.View
          animation={'shake'}
          iterationCount={20}
        >
          <Pressable
            style={({pressed}) => ([
              style.login,
              {
                backgroundColor: pressed ? '#EEEE00' : '#9AFF9A',
              },
            ])}
            onPress={handleClickLogin}
          >
            <Text>
              登录
            </Text>
          </Pressable>
        </Animatable.View>
      }

    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  itemList: {
    borderTopWidth: 1,
    borderTopColor: '#B4CDCD',
  },
  login: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#9AFF9A',
    borderRadius: 8,
  },
});

export default ScreenProfile;
