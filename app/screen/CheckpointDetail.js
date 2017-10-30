
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
import Scorebar from '../component/main/Scorebar';
import Detail from '../component/checkpoints/Detail';

const { width, height } = Dimensions.get('window');
export default class CheckpointDetail extends Component {
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('MissionDetail')}>
                            <Image style={styles.navBack} source={require('../img/vm_btt_back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle} />
                    <TouchableOpacity onPress={null}>
                        <View style={styles.navBtn}>
                            <Text style={styles.navBtnText}>Join</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Image style={styles.CheckpointPhoto} source={require('../img/vm_pattern.png')} />
                <View style={styles.CheckpointMenu}>
                    <TouchableOpacity>
                        <View style={[styles.CheckpointMenuBtn, styles.active]}>
                            <Text>Checkin</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                            <Text style={styles.normalText}>Location</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                            <Text style={styles.normalText}>Review</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.Desc}>
                    <ScrollView style={styles.Scroll}>
                        <View style={styles.checkpoint}>
                            <View style={styles.checkpointContent}>
                                <View style={styles.checkpointRow}>
                                    <Detail />
                                </View>
                                <View style={styles.checkpointRowCenter}>
                                    <TouchableOpacity>
                                        <View style={styles.CheckinBtn}>
                                            <Text style={styles.CheckinBtnText}>Check in</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.checkpointRow}>
                                    <Scorebar />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
      }
      
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        nav: {
            width: width,
            height: height * 0.12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 100,
            position: 'absolute',
            top: 0,
            paddingLeft: 15,
            paddingRight: 15,
            backgroundColor: 'transparent'
        },
        navTitle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
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
        CheckpointPhoto: {
            backgroundColor: '#000',
            width: width,
            flex: 3,
        },
        Desc: {
            flex: 5,
            width: width,
            backgroundColor: '#FFF',
        },
        CheckpointMenu: {
            width: width,
            flex: 0.7,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        CheckpointMenuBtn: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            width: width / 3,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        CheckinBtn: {
            backgroundColor: '#E3EF6F',
            borderRadius: width * 0.1,
            width: width * 0.3,
            height: width * 0.15,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        normalText: {
            color: '#FFF',
        },
        normal: {
            backgroundColor: '#7C7C65',
            flex: 1,
        },
        active: {
            backgroundColor: '#FFF',
            flex: 1,
        },
        Scroll: {
            width: width,
            flex: 1,
        },
        checkpointContent: {
            backgroundColor: '#FFF',
            width: width,
            flexDirection: 'column',
            paddingLeft: 20,
            marginTop: 10
        },
        checkpointRow: {
            flexDirection: 'row',
            marginBottom: 10
        },
        CheckinBtnText: {
            color: '#827F3B',
        },
        checkpointRowCenter: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            flex: 1,
        },
      });
      
    
AppRegistry.registerComponent('CheckpointDetail', () => CheckpointDetail);
