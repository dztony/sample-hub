import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import PageTitle from "../../component/PageTitle";
import FormBg from "../../component/FormBg";
import BrandDeclaration from "../../component/BrandDeclaration";
import FormInput from "../../component/FormInput";
import { EnumInputType, IUser, timeout } from "../../utils/common";
import ErrorMsg from "../../component/ErrorMsg";
import ButtonInline from "../../component/ButtonInline";
import ButtonOutline from "../../component/ButtonOutline";
import { EnumRoute } from "../../utils/route";
import { User } from "../../utils/common";

function ScreenRegister() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [validFail, setValidFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async() => {
    if (password !== passwordRepeat) {
      setValidFail(true);
      return;
    }

    setLoading(true);
    setValidFail(false);
    await timeout();

    const curUser: IUser = {
      username,
      password,
    };
    User.addUser(curUser);
    setLoading(false);
    navigation.navigate(EnumRoute.routeBase, {
      screen: EnumRoute.login,
    });
  }

  return (
    <View style={style.container}>
      <PageTitle text={'用户注册'} />

      <FormBg customStyle={{backgroundColor: '#FFFFFF'}}>
        <React.Fragment>
          <ScrollView>

            <FormInput
              iconType={'person-outline'}
              placeholder={'用户名'}
              value={username}
              onChange={(val: string) => {
                setValidFail(false);
                setUsername(val);
              }}
            />

            <FormInput
              iconType={'bag-outline'}
              placeholder={'密码'}
              value={password}
              onChange={(val: string) => {
                setValidFail(false);
                setPassword(val);
              }}
              inputType={EnumInputType.password}
            />

            <FormInput
              iconType={'bag-outline'}
              placeholder={'确认密码'}
              value={passwordRepeat}
              onChange={(val: string) => {
                setValidFail(false);
                setPasswordRepeat(val);
              }}
              inputType={EnumInputType.password}
            />

            <ErrorMsg
              text={'两次输入的密码不一致，请重新输入'}
              visible={validFail}
            />

            <ButtonInline
              text={'注册'}
              onPress={handleRegister}
              buttonStyle={style.registerButton}
              loading={loading}
            />
            <ButtonOutline
              text={'登录'}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: EnumRoute.login}]
                })
              }}
            />
          </ScrollView>

          <BrandDeclaration />
        </React.Fragment>


      </FormBg>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    backgroundColor: '#0DA387',
    flex: 1,
    alignItems: 'center',
  },

  registerButton: {
    marginTop: 32,
    marginBottom: 12,
  },
});

export default ScreenRegister;
