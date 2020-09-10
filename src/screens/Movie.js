import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, ScrollView} from 'react-native';
import {getMoviesByIDApi} from '../api/movies';
import {BASE_PATH_IMG} from '../utils/constants';
import ModalVideo from '../components/ModalVideo';
import {IconButton, Text, Title} from 'react-native-paper';

export default function Movie(props) {
  const {route} = props;
  const {id} = route.params;
  const [movie, setmovie] = useState(null);
  const [ShowVideo, setShowVideo] = useState(false);

  useEffect(() => {
    getMoviesByIDApi(id).then((response) => {
      setmovie(response);
    });
  }, [id]);

  if (!movie) return null;
  // Se quita el error de movie =

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <MovieImage posterPath={movie.poster_path} />
        <MovieTrailer setShowVideo={setShowVideo} />
      </ScrollView>
      <ModalVideo show={ShowVideo} setShow={setShowVideo} idMovie={id} />
    </>
  );
}

function MovieImage(props) {
  const {posterPath} = props;

  return (
    <View style={styles.viewPoster}>
      <Image
        style={styles.poster}
        source={{uri: `${BASE_PATH_IMG}/w500${posterPath}`}}
      />
    </View>
  );
}

function MovieTrailer(props) {
  const {setShowVideo} = props;
  return (
    <View style={styles.ViewPlay}>
      <IconButton
        icon="play"
        color="#000"
        size={30}
        style={styles.play}
        onPress={() => setShowVideo(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  viewPoster: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    textShadowRadius: 10,
  },
  poster: {
    width: '100%',
    height: 550,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  ViewPlay: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  play: {
    backgroundColor: '#fff',
    marginTop: -40,
    marginRight: 30,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});
