import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Text,
} from 'react-native';
import Scorebar from '../component/main/Scorebar';
import TeamWithProfile from '../component/team/TeamWithProfileMedium';

const {width, height} = Dimensions.get('window');
export default class Profile extends Component {
    constructor(props) {
        super(props);
        const {state} = this.props.navigation;
        this.state = {
            isLoading: true,
            id: state.params.id,
            fbId: state.params.fbId,
            team: state.params.team,
            score: state.params.score,
            apiURL: state.params.apiURL,
            name: state.params.name,
            Mission: 0,
            Checkpoint: 0,
          };
    }
    componentDidMount() {
        let URL = this.state.apiURL + '/Profiles/' + this.state.id;
        console.log(URL);
        return fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({
                Rank: responseJson.rank,
                Mission: responseJson.mission,
                Checkpoint: responseJson.checkpoint,
                isLoading: false
            });

        }).catch((error) => {
            console.error(error);
        });
    }
    sendVar() {
        const { state } = this.props.navigation; 
        const variable = {
            id: state.params.id,
            fbId: state.params.fbId,
            team: state.params.team,
            apiURL: state.params.apiURL,
            score: state.params.score,
            name: state.params.name,
        };
        return variable;
    }

    render() {
        const {navigate} = this.props.navigation;
        return (

            <View style={styles.container}>
                <View style={styles.nav}>
                    <View>
                        <TouchableOpacity onPress={() => navigate('Home', this.sendVar())}>
                            <Image style={styles.navBack} source={require('../img/rc_btt_back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle} />
                    <View />
                    <View />
                </View>
                <View style={styles.Head}>
                    <TeamWithProfile team={this.state.team} fbId={this.state.fbId} />
                    <Text style={styles.name}>{this.state.name}</Text>

                </View>
                <View style={styles.Menu}>
                <TouchableOpacity activeOpacity={0.8}>
                
                    <View style={[styles.MenuBtn, styles.active]}>
                        <Text>Profile</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigate('ProfileBadge', this.sendVar())}>
                    <View style={[styles.MenuBtn, styles.normal]}>
                        <Text style={styles.normalText}>Badge</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigate('ProfileRanking', this.sendVar())}>
                    <View style={[styles.MenuBtn, styles.normal]}>
                        <Text style={styles.normalText}>Ranking</Text>
                    </View>
                </TouchableOpacity>
                </View>
                <View style={styles.Desc}>
                        <View style={styles.Row}>
                            <Text style={styles.ScoreText}>Score</Text>
                        </View>
                        <View style={styles.Row}>
                        <View style={styles.ScoreCover}>
                            <Text style={this.state.score <= 999 ? styles.ScoreNumber : styles.ScoreNumber3Digit}>
                                {this.state.score}
                            </Text>
                        </View></View>
                    <View style={styles.Row}>
                        <View style={styles.Block}>
                            <Text style={styles.number}>
                                {this.state.Mission}
                            </Text>
                            <Text style={styles.text}>
                                Missions
                            </Text>
                        </View>
                        <View style={styles.Block}>
                            <Text style={styles.number}>
                                {this.state.Checkpoint}
                            </Text>
                            <Text style={styles.text}>
                                Checkpoints
                            </Text>
                        </View>
                    </View>
                    <View style={styles.Row}>
                    <Text style={styles.ScoreText}>Team Score</Text>
                    </View>
                        <View style={styles.Row}>
                        <Scorebar URL={this.state.apiURL} />
                        </View>
                </View>
            </View>
        );
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
    Head: {
        backgroundColor: '#95CEBF',
        flex: 3.5,
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    name: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    },
    Desc: {
        flex: 5,
        width: width,
        backgroundColor: '#FFF',
        paddingTop: 10,
        justifyContent: 'space-around'
    },
    Menu: {
        width: width,
        flex: 0.7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        backgroundColor: '#95CEBF'
    },
    MenuBtn: {
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
        backgroundColor: '#465F6C',
        flex: 1
    },
    active: {
        backgroundColor: '#FFF',
        flex: 1
    },
    Row: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    ScoreText: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    Block: {
        alignItems: 'center'
    },
    ScoreCover: {
        borderColor: '#93A1A9',
        borderWidth: 1,
        borderRadius: width * 0.3,
        width: width * 0.3,
        height: width * 0.3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    ScoreNumber: {
        fontSize: 50,
    },
    ScoreNumber3Digit: {
        fontSize: 40,
    },
    text: {

    },
    number: {
        fontSize: 27,
    }
    
});

AppRegistry.registerComponent('Profile', () => Profile);
