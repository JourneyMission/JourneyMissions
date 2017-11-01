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
            id: 1,
            fbId: '100000271633032',
            team: 'bear',
            apiURL: 'http://10.0.2.2/api',
            imgURL: 'http://journeymission.me/storage',
            Checkpoint_ID: 9,
            Mission_ID: 1,
            Checkin: false,
            modalVisible: false
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
                this.setState({isLoading: false, checkpointPhoto: responseJson.data[0].Checkpoint_Photo});
                this.setState({
                    checkpoint_Photo: this.state.imgURL + '/checkpoint/' + this.state.checkpointPhoto
                });
                fetch(checkinURL, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    }
                }).then((response) => response.json()).then((responseJson) => {
                    if (responseJson.data.length !== 0) {
                        this.setState({Checkin: false});
                    } else {
                        this.setState({Checkin: true});
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

    sendVar() {
        const {state} = this.props.navigation;
        const variable = {
            id: state.params.id,
            fbId: state.params.fbId,
            team: state.params.team,
            apiURL: state.params.apiURL,
            Mission_ID: state.params.Mission_ID
        };
        return variable;
    }

    sendVartoCheckpoint(Checkpoint_ID) {
        const {state} = this.props.navigation;
        const variable = this.sendVar();
        variable['Mission_ID'] = state.params.Mission_ID;
        variable['Checkpoint_ID'] = Checkpoint_ID;
        return variable;
    }

    checkin = () => {
        this.setState({isLoading: true});
        let Checkin_Date = Moment(new Date()).format('YYYY-MM-DD');
        let CheckinURL = this.state.apiURL + '/Checkins?Mission_ID=' + this.state.Mission_ID + '&Checkpoint_ID=' + this.state.Checkpoint_ID + '&Profile_ID=' + this.state.id + '&Checkin_Date=' + Checkin_Date;
        fetch(CheckinURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({Checkin: false, isLoading: false, modalVisible: true});
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
                        <Text>Already Check in</Text>
                    </View>
                </TouchableHighlight>
            );
        }

    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
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
