import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import {
  LoginManager
} from 'react-native-fbsdk';
import TeamWithProfile from '../component/team/TeamWithProfile';

const { width, height } = Dimensions.get('window');
export default class Home extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation; 
        this.state = {
            id: state.params.id,
            fbId: state.params.fbId,
            team: state.params.team,
            score: state.params.score,
            apiURL: state.params.apiURL,
            name: state.params.name,
            continue: false
        };
    }
    componentDidMount() {
        let URL = this.state.apiURL + '/JoinMissions?search=Profile_ID:' + this.state.id + ';Mission_Status:1&with=Mission&searchJoin=and';
        console.log(URL);
        return fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson.data.length);
            if(responseJson.data.length !== 0) {
                this.setState({
                    continue: true,
                    isLoading: false,
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    Logout() {
        const { navigate } = this.props.navigation;
        LoginManager.logOut();
        navigate('Login');
    }
    continuemission(){
        if(this.state.continue) {
            const { navigate } = this.props.navigation;
            
            return (
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('CurrentMission', this.state)}>
                <View style={[styles.btn, styles.btnGreen]}>
                    <Text style={styles.btnText}>Continue Your Mission </Text>
                </View>
            </TouchableOpacity>
            );
        }
        return (
            <View style={[styles.btn, styles.btnGray]}>
                <Text style={styles.btnText}>Continue Your Mission </Text>
            </View>
        
        );
    }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => this.Logout()}>
                        <Image style={styles.navSearch} source={require('../img/Logout_btn.png')} />
                    </TouchableOpacity>
            </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('Profile', this.state)}>
                    <TeamWithProfile team={this.state.team} fbId={this.state.fbId} />
                </TouchableOpacity>
                <Text style={[styles.name, this.state.team === 'fox' ? styles.foxColor : styles.bearColor]}>{this.state.name}</Text>
                {this.continuemission()}
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('RecommendMission', this.state)}>
                    <View style={[styles.btn, styles.btnRed]}>
                        <Text style={styles.btnText}>Start New Mission </Text>
                    </View>
                </TouchableOpacity>
                <Image style={styles.bg} source={require('../img/mm_bg_prop.png')} />
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FBD54A',
      justifyContent: 'center',
      alignItems: 'center',
    },
    nav: {
        width: width,
        height: height * 0.12,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: -1000,
        position: 'absolute',
        top: 0,
        paddingTop: 0,
        paddingLeft: 15,
        paddingRight: 15,
    },
    navSearch: {
        width: width * 0.12,
        height: height * 0.07,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    foxColor: {
        color: '#554126',
    },
    BearColor: {
        color: '#F15A24',
    },
    bg: {
        width: width,
        height: width - 100,
        position: 'absolute',
        alignItems: 'center',
        zIndex: -100,
        bottom: 0,
    },
    btn: {
        width: width * 0.7,
        height: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: width * 0.7,
    },
    btnGreen: {
        backgroundColor: '#63A883',
    },
    btnRed: {
        backgroundColor: '#DF633D',
    },
    btnGray: {
        backgroundColor: '#5D5D5D',
    },
    btnText: {
        color: '#FFF',
        fontSize: 15,
    }
  });

AppRegistry.registerComponent('Home', () => Home);
