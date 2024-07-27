import React, { useState } from 'react';
import {
  Pressable,
  Modal,
  View,
  Text,
} from "react-native";
import UserItem from "../UserItem";
import Ionicons from "react-native-vector-icons/Ionicons";

function Setting() {
  const [visible, setVisible] = useState(false);

  return (
    <React.Fragment>
      <UserItem
        icon={'settings-outline'}
        desc={'设置'}
        onPress={() => setVisible(true)}
      />

      <Modal
        visible={visible}
        animationType={'fade'}
      >
        <View style={{ flex: 1 }}>
          <Ionicons
            style={{ width: 30 }}
            onPress={() => setVisible(false)}
            name={'arrow-back-outline'}
            size={20}
            color={'#222222'}
          />
          <View>
            <Text>
              设置页面
            </Text>
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
}

export default Setting;
