import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from "react-native";
import { INew } from "../../service/news";
import Ionicons from "react-native-vector-icons/Ionicons";

import NewsDetailModal from "../NewsDetailModal";

function NewsItem(props: IProps) {
  const { item, index } = props;

  const [collect, setCollect] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  }

  return (
    <Pressable key={item.uniquekey} style={style.container} onPress={handleClick}>
      <View style={style.title}>
        <Text numberOfLines={2} style={style.titleText}>
          {item.title}
        </Text>
      </View>

      <View style={style.imgList}>
        {
          ['thumbnail_pic_s', 'thumbnail_pic_s02', 'thumbnail_pic_s03'].map((key, i) => (
            <Image
              key={i}
              resizeMode={'stretch'}
              style={style.imgItem}
              source={{
                uri: item[key as IImgKey],
              }}
            />
          ))
        }
      </View>

      <View style={style.source}>
        <View style={style.dateInfo}>
          <Text style={style.dateText}>{item.date}</Text>
          <Text>{item.author_name}</Text>
        </View>

        <Ionicons
          onPress={() => setCollect(pre  => !pre)}
          name={collect ? 'heart' : 'heart-outline'}
          size={20}
          color={'#ff6699'}
        />
      </View>

      <NewsDetailModal
        visible={visible}
        data={item}
        close={() => setVisible(false)}
      />
    </Pressable>
  );
}

type IImgKey = 'thumbnail_pic_s' | 'thumbnail_pic_s02' | 'thumbnail_pic_s03';

type IProps = {
  item: INew;
  index: number;
};

const style = StyleSheet.create({
  container: {
    padding: 8,
  },

  title: {
    marginBottom: 8,
  },
  titleText: {
    fontSize: 18,
    color: '#222222',
  },

  imgList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  imgItem: {
    width: (Dimensions.get('window').width - 32) / 3,
    height: 80,
  },

  source: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateInfo: {
    flexDirection: 'row',
  },
  dateText: {
    paddingRight: 16,
  },
});

export default NewsItem;
