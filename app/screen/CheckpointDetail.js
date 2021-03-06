import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    TouchableHighlight,
    Text,
    ScrollView,
    ActivityIndicator,
    Modal
} from 'react-native';
import Moment from 'moment';
import Scorebar from '../component/main/Scorebar';
import Detail from '../component/checkpoints/Detail';

const {width, height} = Dimensions.get('window');
export default class CheckpointDetail extends Component {
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
            Mission_Score: state.params.Mission_Score,
            back: state.params.back,
            Checkin: false,
            modalVisible: false,
            JoinMission: state.params.JoinMission,
        };
    }

    componentDidMount() {
        let checkpointURL = this.state.apiURL + '/Checkpoints?search=id:' + this.state.Checkpoint_ID;
        let checkpointPhotoURL = this.state.apiURL + '/CheckpointPhotos?search=Checkpoint_ID:' + this.state.Checkpoint_ID + '&orderBy=created_at';
        let checkinURL = this.state.apiURL + '/Checkins?search=Checkpoint_ID:' + this.state.Checkpoint_ID + ';Profile_ID:' + this.state.id + '&searchJoin=and';
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
                this.setState({checkpointPhoto: responseJson.data[0].Checkpoint_Photo});
                this.setState({
                    checkpoint_Photo: this.state.imgURL + '/checkpoint/' + this.state.checkpointPhoto
                });
                fetch(checkinURL, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    }
                }).then((response) => response.json()).then((responseJson) => {
                    if ((responseJson.data.length !== 0) && (this.state.JoinMission === true)) {
                        this.setState({Checkin: false, isLoading: false});
                    } else {
                        this.setState({Checkin: true, isLoading: false});
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
            Mission_Score: state.params.Mission_Score,
            back: this.state.back,
            name: state.params.name
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

    checkin = () => {
        this.setState({isLoading: true});
        let Checkin_Date = Moment(new Date()).format('YYYY-MM-DD');
        let CheckinURL = this.state.apiURL + '/Checkins?Mission_ID=' + this.state.Mission_ID + '&Checkpoint_ID=' + this.state.Checkpoint_ID + '&Profile_ID=' + this.state.id + '&Checkin_Date=' + Checkin_Date;
        console.log(CheckinURL);
        fetch(CheckinURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.addScore();
            this.setState({
                Checkin: false
            });
        }).catch((error) => {
            console.log(error);
        });
    }

    checkSpeacialTime() {
        if (this.state.checkpoint.Checkpoint_StartDate !== null || this.state.checkpoint.Checkpoint_EndDate !== null) {
            let StartDateTime = Moment(this.state.checkpoint.Checkpoint_StartDate + 'T0').format('YYYY-MM-DD HH:MM:SS');
            let EndDateTime = Moment(this.state.checkpoint.Checkpoint_EndDate + 'T0').format('YYYY-MM-DD HH:MM:SS');
            return Moment(new Date()).isBetween(StartDateTime, EndDateTime);
        } else if (this.state.checkpoint.Checkpoint_StartTime !== null || this.state.checkpoint.Checkpoint_EndTime !== null) {
            let StartDateTime = Moment('0T' + this.state.checkpoint.Checkpoint_StartTime).format('YYYY-MM-DD HH:MM:SS');
            let EndDateTime = Moment('0T' + this.state.checkpoint.Checkpoint_EndTime).format('YYYY-MM-DD HH:MM:SS');
            return Moment(new Date()).isBetween(StartDateTime, EndDateTime);
        } else if (this.state.checkpoint.Checkpoint_StartDate !== null || this.state.checkpoint.Checkpoint_EndDate !== null && this.state.checkpoint.Checkpoint_StartTime !== null || this.state.checkpoint.Checkpoint_EndTime !== null) {
            let StartDateTime = Moment(this.state.checkpoint.Checkpoint_StartDate + 'T' + this.state.checkpoint.Checkpoint_StartTime).format('YYYY-MM-DD HH:MM:SS');
            let EndDateTime = Moment(this.state.checkpoint.Checkpoint_EndDate + 'T' + this.state.checkpoint.Checkpoint_EndTime).format('YYYY-MM-DD HH:MM:SS');
            return Moment(new Date()).isBetween(StartDateTime, EndDateTime);
            
        }
        return false;
    }

    checkCompleteMission() {
        let URL = this.state.apiURL + '/CheckMission/' + this.state.Mission_ID + '/' + this.state.id;
        let URL2 = this.state.apiURL + '/CheckpointinMission/' + this.state.Mission_ID;
        fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            let Checkindata = responseJson.data;
            fetch(URL2, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => response.json()).then((responseJson) => {
                let MissionCheckpoint = responseJson.data;
                return ((Checkindata.length === MissionCheckpoint.length) &&
                (MissionCheckpoint.every((e, v) => {
                    return e === Checkindata[v];
                })));
            }).catch((error) => {
                console.error(error);
            });
        }).catch((error) => {
            console.error(error);
        });
        
    }

    addScore() {
        let NewScore = this.state.checkpoint.Checkpoint_Score;
        if (this.checkSpeacialTime) {
            NewScore += this.state.checkpoint.Checkpoint_SpeacialScore;
        }
        if(this.checkCompleteMission){
            NewScore += this.state.Mission_Score;
        }
        console.log(this.state.score);
        let score = parseInt(this.state.score) + NewScore;
        let URL = this.state.apiURL + '/Profiles/' + this.state.id + '?Profile_Score=' + score;
        fetch(URL, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({
                NewScore: NewScore,
                score: responseJson.data.Profile_Score,
                isLoading: false
            });
            alert('You got '+ this.state.NewScore + 'Point');
        }).catch((error) => {
            console.error(error);
        });

    }

    checkinButton(value) {
        if (value) {
            return (
                <TouchableOpacity onPress={this.checkin}>
                    <View style={styles.CheckinBtn}>
                        <Text style={styles.CheckinBtnText}>Check in</Text>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableHighlight>
                    <View style={styles.CheckinBtnDisable}>
                        <Text>Check in</Text>
                    </View>
                </TouchableHighlight>
            );
        }

    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (< ActivityIndicator />);
        } else {
            return (

                <View style={styles.container}>
                    <Modal
                        animationType="fade"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <View
                            style={{
                            marginTop: 22
                        }}>
                            <View>
                                <Text>Hello World!</Text>

                                <TouchableHighlight
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible)
                                }}>
                                    <Text>Hide Modal</Text>
                                </TouchableHighlight>

                            </View>
                        </View>
                    </Modal>
                    <View style={styles.nav}>
                        <View>
                            <TouchableOpacity onPress={() => navigate('MissionDetail', this.sendVar())}>
                                <Image style={styles.navBack} source={require('../img/rc_btt_back.png')}/>
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
                        <TouchableOpacity activeOpacity={0.8}>
                            <View style={[styles.CheckpointMenuBtn, styles.active]}>
                                <Text>Checkin</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigate('CheckpointLocation', this.sendVartoCheckpoint(this.state.Checkpoint_ID))}>
                            <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                                <Text style={styles.normalText}>Location</Text>
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
                        <ScrollView style={styles.Scroll}>
                            <View style={styles.checkpoint}>
                                <View style={styles.checkpointContent}>
                                    <View style={styles.checkpointRow}>
                                        <Detail
                                            Checkpoint_Name={this.state.checkpoint.Checkpoint_Name}
                                            Checkpoint_Descript={this.state.checkpoint.Checkpoint_Description}
                                            Checkpoint_Score={this.state.checkpoint.Checkpoint_Score}
                                            Checkpoint_Category={this.state.checkpoint.category_checkpoint.Category_Checkpoint_Name}/>
                                    </View>
                                    <View style={styles.checkpointRowCenter}>
                                        {this.checkinButton(this.state.Checkin)}
                                    </View>
                                    <View style={styles.checkpointRow}>
                                        <Scorebar/>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
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
    CheckinBtn: {
        backgroundColor: '#E3EF6F',
        borderRadius: width * 0.1,
        width: width * 0.3,
        height: width * 0.15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    CheckinBtnDisable: {
        backgroundColor: '#CCC',
        borderRadius: width * 0.1,
        width: width * 0.4,
        height: width * 0.15,
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
    Scroll: {
        width: width,
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
        flexDirection: 'row',
        marginBottom: 10
    },
    CheckinBtnText: {
        color: '#827F3B'
    },
    checkpointRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        flex: 1
    }
});

AppRegistry.registerComponent('CheckpointDetail', () => CheckpointDetail);
