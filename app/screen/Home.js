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
import TeamWithProfile from '../component/team/TeamWithProfile';

const { width, height } = Dimensions.get('window');
export default class Home extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation; 
        this.state = {
          id: 1,
          fbId: '100000271633032',
          team: state.params.team,
          apiURL: 'http://10.0.2.2/api',
        };
    }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
            <View style={styles.nav}>
            <Image style={styles.navSearch} source={require('../img/rc_btt_search.png')} />
            </View>
                <TeamWithProfile team={this.state.team} fbId={this.state.fbId} />
                <Text style={styles.name}>Songrit Keardphol</Text>
                <TouchableOpacity onPress={() => navigate('CurrentMission', this.state)}>
                    <Image style={styles.btn} source={require('../img/bt_continue.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigate('RecommendMission', this.state)}>
                    <Image style={styles.btn} source={require('../img/bt_start.png')} />
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
        zIndex: -100,
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
        color: 'fox' === 'fox' ? '#554126' : '#F15A24',
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 15,
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
        height: width * 0.15,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });

AppRegistry.registerComponent('Home', () => Home);
