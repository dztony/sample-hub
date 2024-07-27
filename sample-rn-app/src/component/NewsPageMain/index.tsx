import { RouteProp, useRoute } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getNewsListByCategory, ICategory, INew } from "../../service/news";
import NewsItem from "../NewsItem";

function NewsPageMain() {
  const route = useRoute<RouteProp<any>>();
  const category = route.params?.category as ICategory;

  const [dataList, setDataList] = useState<Array<INew>>([]);
  const [loading, setLoading] = useState(true);

  const requestNewsList = useCallback(async() => {
    const curNewsList = await getNewsListByCategory(category.key);
    setDataList(curNewsList);
    setLoading(false);
  }, [category.key])

  useEffect(() => {
    requestNewsList();
  }, [requestNewsList]);

  const renderSeparator = () => {
    return (
      <View style={style.separator}>
      </View>
    );
  }

  if (loading) {
    return (
      <View>
        <Text>
          请求新闻列表中...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={dataList.slice(0, 10)}
      renderItem={({item, index}) => (<NewsItem item={item} index={index} />)}
      keyExtractor={item => item.uniquekey}
      ItemSeparatorComponent={() => renderSeparator()}
    />
  );
}

const style = StyleSheet.create({
  separator: {
    height: 1,
    marginHorizontal: 8,
    backgroundColor: '#B0B0B0',
  },
});

export default NewsPageMain;
