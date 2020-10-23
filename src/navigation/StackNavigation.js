// Componente Stack Navigation
import React from 'react';
import {IconButton} from 'react-native-paper';

import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Movie from '../screens/Movie';
import News from '../screens/News';
import Popular from '../screens/Popular';
import Search from '../screens/Search';

const Stack = createStackNavigator();

export default function StackNavigation(props) {
  const {navigation} = props;

  const ButtonLeft = (screen) => {
    switch (screen) {
      case 'search':
      case 'movie':
        return (
          <IconButton icon="arrow-left" onPress={() => navigation.goBack()} />
        );

      default:
        return (
          <IconButton icon="menu" onPress={() => navigation.openDrawer()} />
        );
    }
  };

  const ButtonRight = () => {
    return (
      <IconButton
        icon="magnify"
        onPress={() => navigation.navigate('search')}
      />
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{
          title: 'TheMovieApp',
          headerLeft: () => ButtonLeft('home'),
          headerRight: () => ButtonRight(),
        }}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{
          title: '',
          headerTransparent: true, // Eliminados el header para que se vea mejor
          headerLeft: () => ButtonLeft('movie'),
          headerRight: () => ButtonRight(),
        }}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{
          title: 'Nuevas Películas',
          headerLeft: () => ButtonLeft('news'),
          headerRight: () => ButtonRight(),
        }}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{
          title: 'Películas Populares',
          headerLeft: () => ButtonLeft('popular'),
          headerRight: () => ButtonRight(),
        }}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{
          title: '',
          headerTransparent: true,
          headerLeft: () => ButtonLeft('search'),
        }}
      />
    </Stack.Navigator>
  );
}
