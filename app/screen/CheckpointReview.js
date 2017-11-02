
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Name from '../component/checkpoints/Name';

const { width, height } = Dimensions.get('window');
export default class CheckpointReview extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation; 
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
            JoinMission: state.params.JoinMission,
        };
    }

    componentDidMount() {
        let checkpointURL = this.state.apiURL + '/Checkpoints?search=id:' + this.state.Checkpoint_ID;
        let checkpointPhotoURL = this.state.apiURL + '/CheckpointPhotos?search=Checkpoint_ID:' + this.state.Checkpoint_ID + '&orderBy=created_at';
        return fetch(checkpointURL, {
            method: 'GET',
            headers: { Accept: 'application/json' }
             }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              checkpoint: responseJson[0],
            });
            fetch(checkpointPhotoURL, {
                method: 'GET',
                headers: { Accept: 'application/json' }
                 }).then((response) => response.json())
              .then((responseJson) => {
                this.setState({
                  isLoading: false,
                  checkpointPhoto: responseJson.data[0].Checkpoint_Photo,
                });
                this.setState({
                    checkpoint_Photo: this.state.imgURL + '/checkpoint/' + this.state.checkpointPhoto,
                });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
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
            name: state.params.name,
            Mission_ID: state.params.Mission_ID,
            score: state.params.score,
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
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                < ActivityIndicator />
            );
        } else {
            return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <View>
                        <TouchableOpacity onPress={() => navigate('MissionDetail', this.sendVar())}>
                            <Image style={styles.navBack} source={require('../img/vm_btt_back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle} />
                    <View />
                </View>
                <Image style={styles.CheckpointPhoto} source={{ uri: this.state.checkpoint_Photo }} />
                <View style={styles.CheckpointMenu}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('CheckpointDetail', this.sendVartoCheckpoint(this.state.Checkpoint_ID))}>
                <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                    <Text style={styles.normalText}>Checkin</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('CheckpointLocation', this.sendVartoCheckpoint(this.state.Checkpoint_ID))}>
                <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                    <Text style={styles.normalText}>Location</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
                <View style={[styles.CheckpointMenuBtn, styles.active]}>
                    <Text>Review</Text>
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
        navBack: {
            width: width * 0.07,
            height: height * 0.07,
        },
        CheckpointPhoto: {
            backgroundColor: '#000',
            flex: 3,
            width: width,
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
      
    
AppRegistry.registerComponent('CheckpointReview', () => CheckpointReview);
