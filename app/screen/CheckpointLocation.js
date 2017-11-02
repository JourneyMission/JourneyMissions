import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    ActivityIndicator,
} from 'react-native';
import MapView from 'react-native-maps';
import Name from '../component/checkpoints/Name';

const {width, height} = Dimensions.get('window');
export default class CheckpointLocation extends Component {
    constructor(props) {
        super(props);
        const {state} = this.props.navigation;
        this.state = {
            isLoading: true,
            id: state.params.id,
            fbId: state.params.fbId,
            score: state.params.score,
            team: state.params.team,
            apiURL: state.params.apiURL,
            name: state.params.name,
            Mission_ID: state.params.Mission_ID,
            imgURL: 'http://journeymission.me/storage',
            Checkpoint_ID: state.params.Checkpoint_ID,
            currentMap: {
                latitude: 0,
                longitude: 0,
            },
            Mission_Score: state.params.Mission_Score,
            back: state.params.back,
            JoinMission: state.params.JoinMission,
          };
          
    }
    
    componentDidMount() {
        let checkpointURL = this.state.apiURL + '/Checkpoints?search=id:' + this.state.Checkpoint_ID;
        let checkpointPhotoURL = this.state.apiURL + '/CheckpointPhotos?search=Checkpoint_ID:' + this.state.Checkpoint_ID + '&orderBy=created_at';
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    currentMap:{
                        latitude: position.coords.latitude,
                        latitudeDelta: 0.001,
                        longitude: position.coords.longitude,
                        longitudeDelta: 0.001
                    }
                });
            },
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000}
        );
        return fetch(checkpointURL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({checkpoint: responseJson[0]});
            fetch(checkpointPhotoURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({isLoading: false, checkpointPhoto: responseJson.data[0].Checkpoint_Photo});
                this.setState({
                    checkpoint_Photo: this.state.imgURL + '/checkpoint/' + this.state.checkpointPhoto,
                    checkpoint_Location: {
                        latitude: parseFloat(this.state.checkpoint.Checkpoint_Latitude),
                        longitude: parseFloat(this.state.checkpoint.Checkpoint_Longtitude),
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }
                });
                this.setState({
                    map: {
                        latitude: (this.state.checkpoint_Location.latitude + this.state.currentMap.latitude ) / 2,
                        longitude: (this.state.checkpoint_Location.longitude + this.state.currentMap.longitude) / 2,
                        latitudeDelta: Math.hypot(Math.abs(this.state.checkpoint_Location.latitude - this.state.currentMap.latitude ), Math.abs(this.state.checkpoint_Location.longitude - this.state.currentMap.longitude)), 
                        longitudeDelta: Math.hypot(Math.abs(this.state.checkpoint_Location.latitude - this.state.currentMap.latitude ), Math.abs(this.state.checkpoint_Location.longitude - this.state.currentMap.longitude)), 
                    },
                });
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
        
    }

    sendVar() {
        const {state} = this.props.navigation;
        const variable = {
            id: state.params.id,
            fbId: state.params.fbId,
            team: state.params.team,
            apiURL: state.params.apiURL,
            Mission_ID: state.params.Mission_ID,
            score: state.params.score,
            name: state.params.name,
            Mission_Score: state.params.Mission_Score,
            back: this.state.back
        };
        return variable;
    }

    sendVartoCheckpoint(Checkpoint_ID) {
        const {state} = this.props.navigation;
        const variable = this.sendVar();
        variable['Mission_ID'] = state.params.Mission_ID;
        variable['Checkpoint_ID'] = Checkpoint_ID;
        variable['JoinMission'] = this.state.JoinMission;
        variable['back'] = this.state.back;
        return variable;
    }

    render() {
        console.log(this.state.map);
        const {navigate} = this.props.navigation;
        const {goBack} = this.props.navigation;
        if (this.state.isLoading) {
            return (< ActivityIndicator />);
        } else {
            return (
                <View style={styles.container}>
                    <View style={styles.nav}>
                        <View>
                            <TouchableOpacity onPress={() => navigate('MissionDetail', this.sendVar())}>
                                <Image style={styles.navBack} source={require('../img/vm_btt_back.png')}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.navTitle}/>
                        <View/>
                    </View>
                    <Image
                        style={styles.CheckpointPhoto}
                        source={{
                        uri: this.state.checkpoint_Photo
                    }}/>
                    <View style={styles.CheckpointMenu}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigate('CheckpointDetail', this.sendVartoCheckpoint(this.state.Checkpoint_ID))}>
                            <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                                <Text style={styles.normalText}>Checkin</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <View style={[styles.CheckpointMenuBtn, styles.active]}>
                                <Text>Location</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigate('CheckpointReview', this.sendVartoCheckpoint(this.state.Checkpoint_ID))}>
                            <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                                <Text style={styles.normalText}>Review</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.Desc}>
                        <View style={styles.checkpoint}>
                            <View style={styles.checkpointContent}>
                                <View style={styles.checkpointRow}>
                                    <Name Checkpoint_Name={this.state.checkpoint.Checkpoint_Name}/>
                                </View>
                            </View>
                        </View>
                        <MapView style={styles.Map} region={this.state.map}>
                            <MapView.Marker.Animated coordinate={this.state.currentMap} title="You are Here" />
                            <MapView.Marker coordinate={this.state.checkpoint_Location} title={this.state.checkpoint.Checkpoint_Name} />
                        </MapView>
                    </View>
                </View>
            );
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        alignItems: 'center'
    },
    navBack: {
        width: width * 0.07,
        height: height * 0.07
    },
    CheckpointPhoto: {
        backgroundColor: '#000',
        flex: 3,
        width: width
    },
    Desc: {
        flex: 5,
        width: width,
        backgroundColor: '#FFF'
    },
    CheckpointMenu: {
        width: width,
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        position: 'absolute',
        top: 175,
        height: 40
    },
    CheckpointMenuBtn: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        width: width / 3,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    normalText: {
        color: '#FFF'
    },
    normal: {
        backgroundColor: '#7C7C65',
        flex: 1
    },
    active: {
        backgroundColor: '#FFF',
        flex: 1
    },
    checkpointContent: {
        backgroundColor: '#FFF',
        width: width,
        flexDirection: 'column',
        paddingLeft: 20,
        marginTop: 10
    },
    checkpointRow: {
        flexDirection: 'row'
    },
    Map: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flex: 1,
        margin: 10
    }
});

AppRegistry.registerComponent('CheckpointLocation', () => CheckpointLocation);
