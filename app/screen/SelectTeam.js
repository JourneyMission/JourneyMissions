import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Swiper from 'react-native-swiper';
import BearTeam from '../component/main/BearTeam';
import FoxTeam from '../component/main/FoxTeam';
import { NavigationActions } from 'react-navigation';

const navigateAction = NavigationActions.navigate({

  routeName: 'Home',

  params: {
      Team: '1',
  },

});

export default class SelectTeam extends Component {
  
  render() {
    const {navigate} = this.props.navigation;
    return (
            <Swiper style={styles.warpper} dot={<View />} activeDot={<View />} loop={false} >
                <View style={styles.slide}>
                    <BearTeam style={styles.container} />
                    
                <TouchableOpacity style={styles.Btn} onPress={() => navigate('Home', { team: 'bear' })}>
                    <Text style={styles.BtnText}>Get Started</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.slide}>
                    <FoxTeam style={styles.container} />
                    <TouchableOpacity style={styles.Btn} onPress={() => navigate('Home', { team: 'fox' })}>
                        <Text style={styles.BtnText}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </Swiper>
    );
  }
  
}
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
    },
    warpper: {
        flex: 7
    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: width,
    },
    Btn: {
        borderWidth: 2,
        borderColor: '#FFF',
        width: width * 0.5,
        height: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        bottom: 30,
        zIndex: 100,
    },
    BtnText: {
        color: '#FFF',
    },
  });

AppRegistry.registerComponent('SelectTeam', () => SelectTeam);
