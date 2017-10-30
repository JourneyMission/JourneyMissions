import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
export default class MissionDesc extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mission}>
                    <View style={styles.missionBox}>
                        <View style={styles.LocationBox}>
                            <Text style={styles.LocationText}>{this.props.Mission_Source}</Text>
                        </View>
                        <View style={styles.LocationBox}>
                            <Text style={styles.LocationText}>{this.props.Mission_Destination}</Text>
                        </View>
                    </View>
                    <View style={styles.missionContent}>
                        <View style={styles.missionRow}>
                            <Image style={styles.missionImg} source={require('../../img/vm_icc_msDesc.png')} />
                            <Text style={styles.missionText}>{this.props.Mission_Description}</Text>
                        </View>
                        <View style={styles.missionRow}>
                            <Image style={styles.missionImg} source={require('../../img/vm_icc_msScore.png')} />
                            <Text style={styles.missionText}>{this.props.Mission_Category}</Text>
                        </View>
                        <View style={styles.missionRow}>
                            <Image style={styles.missionImg} source={require('../../img/vm_icc_score.png')} />
                            <Text style={styles.missionText}>{this.props.Mission_Score}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    missionBox: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width
    },
    LocationBox: {
        borderWidth: 0,
        backgroundColor: '#165A45',
        width: width * 0.3,
        padding: 2,
        alignItems: 'center',
        borderRadius: 50
    },
    LocationText: {
        color: '#FFF'
    },
    missionContent: {
        backgroundColor: '#FFF',
        width: width,
        flexDirection: 'column',
        paddingLeft: 10,
        marginTop: 10
    },
    missionRow: {
        flexDirection: 'row',
        marginBottom: 5
    },
    missionText: {
        color: '#165A45',
        fontSize: 15,
        textAlign: 'left',
        paddingLeft: 5
    },
    missionImg: {
        width: 15,
        height: 20,
        marginBottom: 5
    }
});

AppRegistry.registerComponent('MissionDesc', () => MissionDesc);
