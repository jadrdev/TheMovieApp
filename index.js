/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// Importanción de React Navigation 5
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
