
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

export default class CheckpointDetail extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.checkpointRow}>
                    <Image style={styles.checkpointImg} source={require('../../img/rc_ic_missionName.png')} />
                    <Text style={styles.checkpointName}>Checkpoint Name</Text>
                </View>
                <View style={styles.checkpointRow}>
                    <Image style={styles.checkpointImg} source={require('../../img/vm_icc_msDesc.png')} />
                    <Text style={styles.checkpointText}>Checkpoitn Description</Text>
                </View>
                <View style={styles.checkpointRow}>
                    <Image style={styles.checkpointImg} source={require('../../img/vm_icc_msScore.png')} />
                    <Text style={styles.checkpointText}>Category</Text>
                </View>
                <View style={styles.checkpointRow}>
                    <Image style={styles.checkpointImg} source={require('../../img/vm_icc_score.png')} />
                    <Text style={styles.checkpointText}>Your Score</Text>
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
        checkpointText: {
            color: '#165A45',
            fontSize: 15,
            textAlign: 'left',
            paddingLeft: 5
        },
        checkpointImg: {
            width: 15,
            height: 20,
            marginBottom: 5
        },
        checkpointRow: {
            flexDirection: 'row',
            marginBottom: 10
        },
      });
      
    
AppRegistry.registerComponent('CheckpointDetail', () => CheckpointDetail);
