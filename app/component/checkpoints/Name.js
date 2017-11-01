
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

export default class Name extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.checkpointRow}>
                    <Image style={styles.checkpointImg} source={require('../../img/rc_ic_missionName.png')} />
                    <Text style={styles.checkpointName}>{this.props.Checkpoint_Name}</Text>
                </View>
            </View>
        );
      }
      
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            
        },
        checkpointName: {
            color: '#165A45',
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'left',
            paddingLeft: 5
        },
        checkpointImg: {
            width: 15,
            height: 20,
        },
        checkpointRow: {
            flexDirection: 'row',
        },
      });
      
    
AppRegistry.registerComponent('Name', () => Name);
