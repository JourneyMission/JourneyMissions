import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';

const { width } = Dimensions.get('window');

export default class Login extends Component {
  
  render() {
    return (
      <View style={styles.container}>
          <Image style={styles.letgo} source={require('../img/letgo.png')} />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SelectTeam')}>
            <Image style={styles.login} source={require('../img/login_button.png')} />
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
        width: width * 0.5,
        height: (width * 0.5) + 50,
        resizeMode: 'contain'
    },
    login: {
        width: width * 0.7,
        height: width * 0.2,
        resizeMode: 'contain'
    }
  });

AppRegistry.registerComponent('Login', () => Login);
