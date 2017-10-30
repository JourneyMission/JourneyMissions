import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Welcome extends Component {
  
  render() {
    return (
      <View style={styles.container}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
            
            <Image style={styles.letgo} source={require('../img/letgo.png')} />
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBD54A',
  },
  letgo: {
      width: 150,
      height: 200,
  }
});

AppRegistry.registerComponent('Welcome', () => Welcome);
