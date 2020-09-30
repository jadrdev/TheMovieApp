import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {map} from 'lodash';
import {Button, Text} from 'react-native-paper';
import {getNewsMoviesApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import usePreferences from '../hooks/usePreferences';

const {width} = Dimensions.get('window');

export default function News(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const [page, setPage] = useState(1);
  const [showBtnMore, setShowBtnMore] = useState(true);

  useEffect(() => {
    getNewsMoviesApi(page).then((response) => {
      setMovies(response.results);
    });
  }, [page]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {map(movies, (movie, index) => (
          <Movie key={index} movie={movie} />
        ))}
      </View>
      {showBtnMore && (
        <Button mode="contained" contentStyle={styles.loadmorecontainer}>
          Cargar más
        </Button>
      )}
    </ScrollView>
  );
}

function Movie(props) {
  const {movie} = props;
  const {title, poster_path} = movie;
  return (
    <View style={styles.movie}>
      {poster_path ? (
        <Image
          style={styles.image}
          source={{uri: `${BASE_PATH_IMG}/w500${poster_path}`}}
        />
      ) : (
        <Text>{title}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movie: {
    width: width / 2,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadmorecontainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
});
