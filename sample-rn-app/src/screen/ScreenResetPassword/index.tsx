import React from 'react';
import {
  View,
  Text, Pressable,
} from 'react-native';
import { NavigationProp, useNavigation } from "@react-navigation/native";

function ScreenResetPassword() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View>
      <Text>
        重置密码页面
      </Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>
          返回
        </Text>
      </Pressable>
    </View>
  );
}

export default ScreenResetPassword;
