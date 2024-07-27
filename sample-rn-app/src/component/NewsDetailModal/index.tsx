import React from 'react';
import {
  Modal,
  View,
  Text,

  StyleSheet, Pressable, Dimensions,
} from "react-native";
import { INew } from "../../service/news";
import { WebView } from "react-native-webview";
import Ionicons from "react-native-vector-icons/Ionicons";

function NewsDetailModal(props: IProps) {
  const { visible, data, close } = props;
  return (
    <Modal
      visible={visible}
      animationType={'fade'}
    >
      <View style={{ flex: 1 }}>
        <View style={style.header}>
          <Ionicons
            style={{ width: 30 }}
            onPress={close}
            name={'arrow-back-outline'}
            size={20}
            color={'#222222'}
          />
          <View style={style.headerTitle}>
            <Text style={style.title}>
              新闻详情
            </Text>
          </View>
        </View>
        <WebView
          source={{
            uri: data.url,
          }}
        />
      </View>
    </Modal>
  );
}

type IProps = {
  visible: boolean;
  data: INew;
  close: () => void;
}

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 8,
  },
  headerTitle: {
    width: (Dimensions.get('window').width - 38) / 2,
  },
  title: {
    textAlign: 'right',
  }
});

export default NewsDetailModal;
