import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  useWindowDimensions,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import NewsPageMain from "../../component/NewsPageMain";
import { getNewsCategoryList, ICategory } from "../../service/news";


const TopTab = createMaterialTopTabNavigator();

function ScreenNews() {
  const [configList, setConfigList] = useState<Array<ICategory>>([]);
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();

  const requestCategoryList = async() => {
    const dataList = await getNewsCategoryList();
    setConfigList(dataList);
    setLoading(false);
  }

  useEffect(() => {
    requestCategoryList();
  }, []);

  if (loading) {
    return (
      <View>
        <Text>
          加载中...
        </Text>
      </View>
    );
  }

  return (
    <TopTab.Navigator
      screenOptions={{
        lazy: true,
      }}
    >
      {
        configList.map((item, i) => {
          return (
            <TopTab.Screen
              key={i}
              name={item.name}
              component={NewsPageMain}
              initialParams={{
                category: item,
              }}
              options={{
                title: item.name,
                tabBarScrollEnabled: true,
                tabBarItemStyle: {
                  width: width / 5,
                },
              }}
            />
          );
        })
      }
    </TopTab.Navigator>
  );
}

export default ScreenNews;
