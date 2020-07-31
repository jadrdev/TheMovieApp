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
  const ButtonLeft = () => {
    return <IconButton icon="menu" onPress={() => navigation.openDrawer()} />;
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{title: 'TheMovieApp', headerLeft: () => ButtonLeft()}}
      />
      <Stack.Screen
        name="movie"
        component={Movie}
        options={{title: '', headerLeft: () => ButtonLeft()}}
      />
      <Stack.Screen
        name="news"
        component={News}
        options={{title: 'Nuevas Películas', headerLeft: () => ButtonLeft()}}
      />
      <Stack.Screen
        name="popular"
        component={Popular}
        options={{title: 'Películas Populares', headerLeft: () => ButtonLeft()}}
      />
      <Stack.Screen
        name="search"
        component={Search}
        options={{title: '', headerLeft: () => ButtonLeft()}}
      />
    </Stack.Navigator>
  );
}
