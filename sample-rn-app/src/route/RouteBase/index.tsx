import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EnumRoute } from "../../utils/route";

import ScreenWelcome from "../../screen/ScreenWelcome";
import ScreenLogin from "../../screen/ScreenLogin";
import ScreenResetPassword from "../../screen/ScreenResetPassword";
import ScreenRegister from "../../screen/ScreenRegister";

const Stack = createNativeStackNavigator();

function RouteBase() {
  return (
    <Stack.Navigator
      initialRouteName={EnumRoute.welcome}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={EnumRoute.welcome} component={ScreenWelcome} />
      <Stack.Screen name={EnumRoute.login} component={ScreenLogin} />
      <Stack.Screen name={EnumRoute.resetPassword} component={ScreenResetPassword} />
      <Stack.Screen name={EnumRoute.register} component={ScreenRegister} />
    </Stack.Navigator>
  );
}

export default RouteBase;
