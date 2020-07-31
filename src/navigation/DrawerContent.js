// Componente Drawer Personalizado

import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Drawer, Switch, TouchableRipple, Text} from 'react-native-paper';

export default function DrawerContent(props) {
  const {navigation} = props;
  const [Active, setActive] = useState('home');

  const onChangeScreen = (screen) => {
    setActive(screen);
    navigation.navigate(screen);
  };

  return (
    <DrawerContentScrollView>
      <Drawer.Section>
        <Drawer.Item
          label="Inicio"
          active={Active === 'home'}
          onPress={() => onChangeScreen('home')}
        />
        <Drawer.Item
          label="Peliculas Populares"
          active={Active === 'popular'}
          onPress={() => onChangeScreen('popular')}
        />
        <Drawer.Item
          label="Nuevas Películas"
          active={Active === 'news'}
          onPress={() => onChangeScreen('news')}
        />
      </Drawer.Section>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({});
