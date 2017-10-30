
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');
export default class MissionMap extends Component {
    
    render() {
        return (
                <ScrollView style={styles.Scroll}>
                    <Image style={styles.Map} source={require('../../img/vm_pattern.png')} />
                </ScrollView>
        );
      }
      
    }
    const styles = StyleSheet.create({
        
        Scroll: {
            width: width,
            flex: 1,
        },
        Map: {
            width: width,
            position: 'absolute',
            zIndex: 100,
            top:0,
        }
      });
      
    
AppRegistry.registerComponent('MissionMap', () => MissionMap);
