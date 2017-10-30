import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Router from './app/config/Router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

export default class JourneyMission extends Component {
  constructor(props) {
    super(props);
}

  componentDidMount() {
      SplashScreen.hide();
  }

  render() {
    return (
      <Provider store={createStore}>
        <Router />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('JourneyMission', () => JourneyMission);
