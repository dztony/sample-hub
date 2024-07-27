import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { EnumRoute } from "./utils/route";
import RouteBase from "./route/RouteBase";
import RouteMain from "./route/RouteMain";

import { Provider } from 'react-redux';
import store from "./store";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={EnumRoute.routeBase}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name={EnumRoute.routeBase} component={RouteBase} />
          <Stack.Screen name={EnumRoute.routeMain} component={RouteMain} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
