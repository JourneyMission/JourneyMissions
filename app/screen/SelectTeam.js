import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native';
import Swiper from 'react-native-swiper';
import AccessToken from 'react-native-fbsdk';

import BearTeam from '../component/main/BearTeam';
import FoxTeam from '../component/main/FoxTeam';

export default class SelectTeam extends Component {
    constructor(props) {
        super(props);
        const {state} = this.props.navigation;
        this.state = {
            isLoading: false,
            id: state.params.id,
            fbId: state.params.fbId,
            apiURL: state.params.apiURL
        };
    }

    ComponentDidmount() {
        const {navigate} = this.props.navigation;
        AccessToken
            .getCurrentAccessToken()
            .then((data) => {
                if (data.accessToken == null) {
                    navigate('Login');
                }
            });
        console.log(this.state);
    }

    sendVar() {
        const {state} = this.props.navigation;
        const variable = {
            id: state.params.id,
            fbId: state.params.fbId,
            team: this.state.team,
            apiURL: state.params.apiURL
        };
        return variable;
    }

    addTeam(team) {
        this.setState({isLoading: true, team: team});
        let URL = this.state.apiURL + '/Profiles/' + this.state.id + '?Profile_Team=' + team;
        console.log(URL);
        const {navigate} = this.props.navigation;
        fetch(URL, {
            method: 'PATCH',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({
                isLoading: false, 
                team: team
            });
            navigate('Home', this.sendVar());
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Image style={styles.letgo} source={require('../img/letgo.png')}/>
                    <ActivityIndicator/>
                </View>
            );
        } else {
            return (
                <Swiper
                    style={styles.warpper}
                    dot={< View />}
                    activeDot={< View />}
                    loop={false}>
                    <View style={styles.slide}>
                        <BearTeam style={styles.container}/>
                        <TouchableOpacity style={styles.Btn} onPress={() => this.addTeam('bear')}>
                            <Text style={styles.BtnText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.slide}>
                        <FoxTeam style={styles.container}/>
                        <TouchableOpacity style={styles.Btn} onPress={() => this.addTeam('fox')}>
                            <Text style={styles.BtnText}>Get Started</Text>
                        </TouchableOpacity>
                    </View>
                </Swiper>
            );
        }
    }

}
const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FBD54A'
      },
    warpper: {
        flex: 7
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width
    },
    Btn: {
        borderWidth: 2,
        borderColor: '#FFF',
        width: width * 0.5,
        height: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        position: 'absolute',
        bottom: 30,
        zIndex: 100
    },
    BtnText: {
        color: '#FFF'
    },

    letgo: {
        width: width * 0.5,
        height: (width * 0.5) + 50,
        resizeMode: 'contain'
    }
});

AppRegistry.registerComponent('SelectTeam', () => SelectTeam);
