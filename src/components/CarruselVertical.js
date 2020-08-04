import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Text, Title} from 'react-native-paper';
import {BASE_PATH} from '../utils/constants';

const {width} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarruselVertical(props) {
  const {data} = props;

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={(item) => <RenderItem data={item} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );

  function RenderItem(props) {
    const {data} = props;
    const {title, poster_path} = data.item;
    const imageURL = `${BASE_PATH}/w500/${poster_path}`;

    return (
      <TouchableWithoutFeedback onPress={() => console.log('Hola')}>
        <View style={styles.card}>
          <Image style={styles.image} source={{uri: imageURL}} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  image: {
    width: '100%',
    height: 450,
    borderRadius: 20,
  },
  title: {
    marginTop: 10,
    marginHorizontal: 10,
  },
});
