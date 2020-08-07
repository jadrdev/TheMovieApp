import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {getNewsMoviesApi, getAllGenreApi} from '../api/movies';
import {Title} from 'react-native-paper';
import CarruselVertical from '../components/CarruselVertical';
import {map} from 'lodash';

export default function Home(props) {
  const {navigation} = props;
  const [newMovies, setNewMovies] = useState(null);
  const [genreList, setgenreList] = useState([]);
  const [genreSelected, setgenreSelected] = useState();

  useEffect(() => {
    getNewsMoviesApi().then((response) => {
      setNewMovies(response.results);
    });
  }, []);

  useEffect(() => {
    getAllGenreApi().then((response) => {
      setgenreList(response.genres);
    });
  }, []);

  const onChangeGenre = (newGenreId) => {
    setgenreSelected(newGenreId);
  };

  return (
    /* showsHorizontalScrollIndicator hace que no aparezxca la barra de Srroll*/
    <ScrollView showsHorizontalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}> Nuevas Peliculas </Title>
          <CarruselVertical data={newMovies} navigation={navigation} />
        </View>
      )}

      <View style={styles.genres}>
        <Title style={styles.genrestitles}>Películas por generos</Title>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.genreList}>
          {map(genreList, (genre) => (
            <Text
              key={genre.id}
              style={
                (styles.genred,
                {color: genre.id !== genreSelected ? '#8697a5' : '#fff'})
              }>
              {genre.name}
            </Text>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  news: {
    marginVertical: 10,
  },
  newsTitle: {
    marginBottom: 15,
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genres: {
    marginTop: 20,
    marginBottom: 50,
  },
  genrestitles: {
    marginHorizontal: 20,
    fontWeight: 'bold',
    fontSize: 22,
  },
  genreList: {
    marginTop: 5,
    marginBottom: 15,
    padding: 10,
    paddingHorizontal: 20,
  },
  genred: {
    marginRight: 20,
    fontSize: 16,
  },
});
