
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');
export default class Scorebar extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View />
            </View>
        );
      }
      
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#FFF',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: height * 0.14,
          },
          nav: {
              width: width,
              height: height * 0.12,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: -100,
              position: 'absolute',
              top: 0,
              paddingLeft: 15,
              paddingRight: 15,
          },
          navTitle: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
          },
          navText: {
              color: '#165A45',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
          },
          navMission: {
              height: 44,
              resizeMode: 'cover',
          },
          navBtn: {
              borderWidth: 2,
              borderColor: '#165A45',
              width: width * 0.2,
              alignItems: 'center',
              borderRadius: 50,
          },
          navBtnText: {
              color: '#165A45',
              fontWeight: 'bold',
          },
          navBack: {
              width: width * 0.07,
              height: height * 0.07,
          },
          Desc: {
              flex: 1,
              width: width,
              backgroundColor: '#000',
          },
          Scroll: {
            width: width,
            flex: 1,
        },
        Map: {
            width: width,
            flex: 1,
            zIndex: 100,
            top: 0,
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        CheckpointLeft: {
            
        },
        CheckpointImg: {
            width: 70,
            height: 70,
            borderWidth: 7,
            borderColor: '#FFF',
            borderRadius: 70,
        },
        CheckpointRight: {
            
        },
        CarImg: {
            width: 100,
            height: 85,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: width,
        }
      });
      
    
AppRegistry.registerComponent('Scorebar', () => Scorebar);
