import React, { Dimensions, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import FunctionList from "../../component/FunctionList";
import HomeSwiper from "../../component/HomeSwiper";
import Weather from "../../component/Weather";
import BrandDeclaration from "../../component/BrandDeclaration";
import Message from "../../component/Message";

function ScreenHome() {
  return (
    <SafeAreaView style={style.container}>
      <View style={style.header}>
        <Pressable>
          <Text style={style.headerNav}>
            首页
          </Text>
        </Pressable>

        <Pressable>
          <Text style={style.headerNav}>
            拍照
          </Text>
        </Pressable>
      </View>

      <ScrollView>
        <FunctionList />
        <View style={style.main}>
          <HomeSwiper />
          <Weather />
          <BrandDeclaration wrapStyle={{ marginVertical: 24 }} />
        </View>


        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </ScrollView>
    </SafeAreaView>
  );
}


const style = StyleSheet.create({
  container: {
    // height: '100%',
    flex: 1,
  },

  header: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: '#11C88D',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerNav: {
    color: '#FFFFFF',
  },

  main: {
    paddingHorizontal: 8,
  },
});

export default ScreenHome;
