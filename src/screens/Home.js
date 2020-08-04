import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {getNewsMoviesApi} from '../api/movies';
import {Title} from 'react-native-paper';
import CarruselVertical from '../components/CarruselVertical';

export default function Home() {
  const [newMovies, setNewMovies] = useState(null);
  console.log(newMovies);

  useEffect(() => {
    getNewsMoviesApi().then((response) => {
      setNewMovies(response.results);
    });
  }, []);

  return (
    /* showsHorizontalScrollIndicator hace que no aparezxca la barra de Srroll*/
    <ScrollView showsHorizontalScrollIndicator={false}>
      {newMovies && (
        <View style={styles.news}>
          <Title style={styles.newsTitle}> Nuevas Peliculas </Title>
          <CarruselVertical data={newMovies} />
        </View>
      )}
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
});
