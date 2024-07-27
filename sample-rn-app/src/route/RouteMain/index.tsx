import React, { ReactElement, ReactNode } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenHome from "../../screen/ScreenHome";
import { EnumRoute } from "../../utils/route";
import ScreenNews from "../../screen/ScreenNews";
import ScreenProfile from "../../screen/ScreenProfile";
import BottomTabIcon from "../../component/BottomTabIcon";

const BottomTab = createBottomTabNavigator();


function RouteMain() {
  return (
    <BottomTab.Navigator
      initialRouteName={EnumRoute.home}
    >
      <BottomTab.Screen
        name={EnumRoute.home}
        component={ScreenHome}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabIcon
                name={focused ? 'home' : 'home-outline'}
              />
            );
          },
          title: '首页',
        }}
      />
      <BottomTab.Screen
        name={EnumRoute.news}
        component={ScreenNews}
        options={{
          headerTitle: '新闻',
          headerStyle: {
            backgroundColor: '#E54223',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontWeight: 'bold',
            textAlignVertical: 'center',
          },
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabIcon
                name={focused ? 'newspaper' : 'newspaper-outline'}
              />
            );
          },
          title: '新闻',
        }}
      />
      <BottomTab.Screen
        name={EnumRoute.profile}
        component={ScreenProfile}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            return (
              <BottomTabIcon
                name={focused ? 'person-circle' : 'person-circle-outline'}
              />
            );
          },
          title: '个人中心',
        }}
      />
    </BottomTab.Navigator>
  );
}

export default RouteMain;
