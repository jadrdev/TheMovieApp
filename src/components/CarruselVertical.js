import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Text, Title } from 'react-native-paper';
import { BASE_PATH_IMG } from '../utils/constants';
import { getGenreMoviesApi } from '../api/movies';
import { map, size } from 'lodash';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = Math.round(width * 0.7);

export default function CarruselVertical(props) {
  const { data, navigation } = props;

  return (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={(item) => <RenderItem data={item} navigation={navigation} />}
      sliderWidth={width}
      itemWidth={ITEM_WIDTH}
    />
  );

  function RenderItem() {
    const { id, title, poster_path, genre_ids } = data.item;
    const imageURL = `${BASE_PATH_IMG}/w500/${poster_path}`;
    const [genres, setGenres] = useState(null);

    useEffect(() => {
      getGenreMoviesApi(genre_ids).then((response) => {
        setGenres(response);
      });
    }, []);

    const onNavigation = () => {
      navigation.navigate('movie', { id });
    };

    return (
      <TouchableWithoutFeedback onPress={onNavigation}>
        <View style={styles.card}>
          <Image style={styles.image} source={{ uri: imageURL }} />
          <Text style={styles.title}>{title}</Text>
          <View style={styles.genre}>
            {genres &&
              map(genres, (genre, index) => (
                <Text key={index} style={styles.genres}>
                  {genre}
                  {index !== size(genres) - 1 && ', '}
                </Text>
              ))}
          </View>
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
  genre: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  genres: {
    fontSize: 12,
    color: '#8997a5',
  },
});
