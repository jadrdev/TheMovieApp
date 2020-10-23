import { set } from 'lodash';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {SearchMovieApi} from '../api/movies';

export default function Search() {
  const [Movies, setMovies] = useState(null);
  const [Search, setSearch] = useState('')

  useEffect(() => {
    SearchMovieApi('Spiderman').then((response) => {
      setMovies(response.results);
    });
  }, [])
  return (
    <SafeAreaView>
      <Searchbar
        placeholder="Busca tu pelicula"
        iconColor={Platform.OS === 'ios' && 'transparent'}
        icon="arrow-left"
        style={Styles.input}
      />
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  input: {
    marginTop: -3,
    backgroundColor: '#15212b',
  }
})