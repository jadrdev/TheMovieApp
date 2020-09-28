import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Image} from 'react-native';
import {Text, Title, Button} from 'react-native-paper';
import {map} from 'lodash';
import {getPopularMovieApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import noImage from '../assets/png/default-imgage.png';
import {Rating} from 'react-native-ratings';
import usePreferences from '../hooks/usePreferences';
import starDark from '../assets/png/starDark.png';
import starLight from '../assets/png/starLight.png';

export default function Popular(props) {
  const {navigation} = props;
  const [movies, setMovies] = useState(null);
  const {theme} = usePreferences();
  const [ShowBtnMore, setShowBtnMore] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPopularMovieApi(1).then((response) => {
      const totalPages = response.total_pages;
      if (page < totalPages) {
        if (!movies) {
          setMovies(response.results);
        } else {
          setMovies([...movies, ...response.results]);
        }
      } else {
        setShowBtnMore(false);
      }
    });
  }, [page]);

  return (
    <ScrollView>
      {map(movies, (movie, index) => (
        <Movie key={index} movie={movie} />
      ))}
      {ShowBtnMore && (
        <Button
          mode="contained"
          contentStyle={styles.lodadMoreContainer}
          style={styles.loadMore}
          labelStyle={{color: theme === 'dark' ? '#fff' : '#000'}}
          onPress={() => setPage(page + 1)}>
          Cargar mas...
        </Button>
      )}
    </ScrollView>
  );
}

function Movie(props) {
  const {movie, theme} = props;
  const {poster_path, title, release_date, vote_count, vote_average} = movie;
  return (
    <View style={styles.movie}>
      <View style={styles.left}>
        <Image
          style={styles.image}
          source={
            poster_path ? {uri: `${BASE_PATH_IMG}/w500${poster_path}`} : noImage
          }
        />
      </View>

      <View style={styles.rigth}>
        <Title>{title}</Title>
        <Text>{release_date}</Text>
        <MovieRating
          voteCount={vote_count}
          voteAverage={vote_average}
          theme={theme}
        />
      </View>
    </View>
  );
}

function MovieRating(props) {
  const {voteCount, voteAverage, theme} = props;
  const media = voteAverage / 2;

  return (
    <View style={styles.viewRating}>
      <Rating
        type="custom"
        ratingImage={theme === 'dark' ? starLight : starDark}
        ratingColor="#ffc205"
        ratingBackgroundColor={theme === 'dark' ? '#192734' : '#f0f0f0'}
        startingValue={media}
        imageSize={20}
        style={{marginRight: 15}}
      />
      <Text style={{fontSize: 12, color: '#8697a5', marginTop: 5}}>
        {voteCount} votos
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  movie: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Left: {
    marginRight: 20,
  },
  rigth: {
    marginLeft: 20,
  },
  image: {
    width: 100,
    height: 150,
  },
  viewRating: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop: 10,
  },
  lodadMoreContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
  loadMore: {
    backgroundColor: 'transparent',
  },
});
