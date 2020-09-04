import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import {getMoviesByIDApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';

export default function Movie(props) {
  const {route} = props;
  const {id} = route.params;
  const [movie, setmovie] = useState(null);

  useEffect(() => {
    getMoviesByIDApi(id).then((response) => {
      setmovie(response);
    });
  }, []);

  return (
    <>
      <ScrollView></ScrollView>
    </>
  );
}

function MovieImage(props) {
  const {poster_path} = props;
  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 100,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
});
