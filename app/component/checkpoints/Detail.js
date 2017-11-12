
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
export default class CheckpointDetail extends Component {
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
                <View style={styles.checkpointRow}>
                    <Image style={styles.checkpointImg} source={require('../../img/vm_icc_msDesc.png')} />
                    <Text style={styles.checkpointText}>{this.props.Checkpoint_Descript}</Text>
                </View>
                <View style={styles.checkpointRow}>
                    <Image style={styles.checkpointImg} source={require('../../img/vm_icc_msScore.png')} />
                    <Text style={styles.checkpointText}>{this.props.Checkpoint_Category}</Text>
                </View>
                <View style={styles.checkpointRow}>
                    <Image style={styles.checkpointImg} source={require('../../img/vm_icc_score.png')} />
                    <Text style={styles.checkpointText}>
                    Normal Time : +{this.props.Checkpoint_Score} point{"\n"}
                    {this.props.Checkpoint_SpeacialScore !== 0 ? "\n" + 'Speacial Time :' + this.props.Checkpoint_SpeacialScore + 'point' : '' }
                    </Text>
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
            textAlign: 'auto',
            paddingLeft: 5,
            width: width * 0.85,
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
