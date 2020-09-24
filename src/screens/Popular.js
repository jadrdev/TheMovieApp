import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'react-native-paper';
import {map} from 'lodash';
import {getPopularMovieApi} from '../api/movies';

export default function Popular(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    getPopularMovieApi(1).then((response) => {
      setMovies(response.results);
    });
  }, []);

  return (
    <ScrollView>
      {map(movies, (movie, index) => {
        <Movie key={index} movie={movie} />;
      })}
    </ScrollView>
  );
}

function Movie() {
  return (
    <View>
      <Text>Hola</Text>
    </View>
  );
}
