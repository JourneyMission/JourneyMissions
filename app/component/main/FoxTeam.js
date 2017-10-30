import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';

export default class BearTeam extends Component {
  
  render() {
    return (
        <View style={styles.container}>
            <View style={styles.Team}>
              <Text style={styles.h2}>Are you a ...</Text>
              <Text style={styles.h1}>Fox ?</Text>
              <Image style={styles.letgo} source={require('../../img/icc_fox.png')} />
            </View>
            <View style={styles.Desc}>
              <View>
                <Text style={styles.h2}>Playful, Seclusion</Text>
                <Text style={styles.h2}>Good adaptability</Text>
              </View>
              <View />
            </View>
            <Image style={styles.Next} source={require('../../img/tm_fx_btt_next.png')} />
          </View>
    );
  }
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9CC8A',
    width: width,
  },
  letgo: {
      width: width * 0.9,
      height: width * 0.67,
  },
  h1: {
    color: '#4F3C25',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    color: '#4F3C25',
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
  },
  Team: {
    padding: 20,
    flex: 5,
    alignItems: 'center',
    width: width,
    justifyContent: 'space-around',
  },
  Desc: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: '#FBD54A',
    width: width,
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingTop: 20,
  },
  Next: {
    position: 'absolute',
    width: width * 0.1,
    height: width * 0.1,
    left: 0,
  }
});

AppRegistry.registerComponent('BearTeam', () => BearTeam);
