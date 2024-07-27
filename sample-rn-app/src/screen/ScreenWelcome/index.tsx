import React, { Pressable, Text, View, StyleSheet, ImageBackground, Dimensions, SafeAreaView, } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { EnumRoute } from "../../utils/route";

const viewWidth = Dimensions.get('window').width;

function ScreenWelcome() {
  const navigation = useNavigation<NavigationProp<any>>();

  const handleButtonClick = () => {
    navigation.navigate(EnumRoute.routeMain);
  }

  return (
    <SafeAreaView style={style.container}>
      <ImageBackground
        source={require('../../asset/img/bg.jpg')}
        resizeMode={'cover'}
        style={style.bg}
      >
        <View style={style.title}>
          <Text style={style.titleContent}>
            看更大的世界!
          </Text>
        </View>

        <Pressable style={style.button} onPress={handleButtonClick}>
          <Text style={style.buttonContent}>
            走起
          </Text>
        </Pressable>
      </ImageBackground>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    // justifyContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    marginTop: '30%',
  },
  titleContent: {
    fontSize: 48,
    color: '#3CB979',
    fontWeight: 'bold',
  },

  button: {
    paddingVertical: 16,
    minWidth: 180,
    width: viewWidth / 8 * 6,
    backgroundColor: '#17D5B3',
    marginBottom: '25%',
    borderRadius: 8,
  },
  buttonContent: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 28,
  },
});

export default ScreenWelcome;
