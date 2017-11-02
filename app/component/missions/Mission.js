
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';
const { width } = Dimensions.get('window');
export default class Mission extends Component {
    constructor(props) {
        super(props);
        this.state = {
          img: 'http://journeymission.me/storage/mission/icon/' + this.props.Mission_Icon
        };
    }
  render() {
    return (
            <View style={styles.mission}>
                <Image style={styles.missionImg} source={{ uri: this.state.img }} />
                <View style={styles.missionContent}>
                    <View style={styles.missionIcon}>
                        <Image style={styles.missionContentImg} source={require('../../img/rc_ic_missionName.png')} />
                        <Image style={styles.missionContentImg} source={require('../../img/rc_ic_missionDesc.png')} />
                    </View>
                    <View style={styles.missionDesc}>
                        <Text style={styles.missionNameText}>{this.props.Mission_Name}</Text>
                        <Text style={styles.missionDescText}>{this.props.Mission_Description}</Text>
                    </View>
                </View>    
            </View>
    );
  }
  
}
const styles = StyleSheet.create({

    mission: {
        width: width * 0.92,
        height: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginBottom: 10,
    },
    missionImg: {
        width: 100,
        height: 100,
    },
    missionContent: {
        backgroundColor: '#FFF',
        width: (width * 0.92) - 100,
        height: 100,
        flexDirection: 'row',
    },
    missionIcon: {
        backgroundColor: '#FFF',
        width: 25,
        justifyContent: 'flex-start',
        padding: 5,
    },
    missionNameText: {
        color: '#165A45',
        fontSize: 17,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        paddingLeft: 5,
    },
    missionDesc: {
        backgroundColor: '#FFF',
        flexWrap: 'wrap',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingTop: 2,
        height: 90,
    },
    missionDescText: {
        color: '#165A45',
        fontSize: 10,
        textAlign: 'left',
        paddingLeft: 5,
        width: (width * 0.92) - 150,
    },
    missionContentImg: {
        width: 15,
        height: 20,
        marginBottom: 5,
    },
  });

AppRegistry.registerComponent('Mission', () => Mission);
