import React, { useEffect, useState } from 'react';
import { Dimensions, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import FormBg from "../../component/FormBg";
import FormInput from "../../component/FormInput";
import { EnumInputType, IUser, timeout, User } from "../../utils/common";
import { EnumRoute } from "../../utils/route";
import ButtonInline from "../../component/ButtonInline";
import ButtonOutline from "../../component/ButtonOutline";
import BrandDeclaration from "../../component/BrandDeclaration";
import ErrorMsg from "../../component/ErrorMsg";
import PageTitle from "../../component/PageTitle";
import { useSelector, useDispatch } from 'react-redux';
import { login, setToken } from "../../store/user";

function ScreenLogin() {
  const navigation = useNavigation<NavigationProp<any>>();

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('xiaohei');
  const [password, setPassword] = useState('666');

  const [validFail, setValidFail] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async() => {
    if (loading) {
      return;
    }

    setLoading(true);
    setValidFail(false);
    const loginData: IUser = {
      username,
      password,
    };
    await timeout();
    if (User.login(loginData)) {
      dispatch(login());
      dispatch(setToken({
        token: '登录后生成的 token',
      }))
      navigation.navigate(EnumRoute.routeMain);
    } else {
      console.log('登录失败，请重试');
      setValidFail(true);
    }
    setLoading(false);
  }

  return (
    <View style={style.container}>
      <PageTitle text={'Welcome!'} />

      <FormBg customStyle={style.loginForm}>
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

            <ErrorMsg
              text={'账号或者密码错误，请重试!'}
              visible={validFail}
            />

            <Pressable onPress={() => navigation.navigate(EnumRoute.resetPassword)}>
              <Text style={style.reset}>
                忘记密码?
              </Text>
            </Pressable>

            <ButtonInline
              text={'登录'}
              onPress={handleLogin}
              buttonStyle={style.loginButton}
              loading={loading}
            />
            <ButtonOutline
              text={'注册'}
              onPress={() => {
                setUsername('');
                setPassword('');
                setValidFail(false);
                navigation.reset({
                  index: 0,
                  routes: [{name: EnumRoute.register}]
                })
              }}
            />
          </ScrollView>

          <BrandDeclaration  />
        </React.Fragment>

      </FormBg>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#1E1F22',
  },

  loginForm: {
    backgroundColor: '#E2FFC1',
  },

  reset: {
    color: '#369157',
  },
  loginButton: {
    marginTop: 32,
    marginBottom: 12,
  },
});

export default ScreenLogin;
