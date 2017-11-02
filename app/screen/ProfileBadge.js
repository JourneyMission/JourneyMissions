import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
} from 'react-native';
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
            name: state.params.name
          };
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
                            <Image style={styles.navBack} source={require('../img/rc_btt_back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle}/>
                    <View/>
                    <View/>
                </View>
                
                <View style={styles.Head}>
                    <TeamWithProfile team={this.state.team} fbId={this.state.fbId}/>
                    <Text style={styles.name}>{this.state.name}</Text>

                </View>
                <View style={styles.Menu}>
                    <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={() => navigate('Profile', this.sendVar())}>
                        <View style={[styles.MenuBtn, styles.normal]}>
                            <Text style={styles.normalText}>Profile</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8}>
                        <View style={[styles.MenuBtn, styles.active]}>
                            <Text >Badge</Text>
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
                    <ScrollView>
                    <View style={styles.Row}>
                        <View style={styles.Badge} />
                        <View style={styles.Badge} />
                        <View style={styles.Badge} />
                    </View>
                    <View style={styles.Row}>
                        <View style={styles.Block}>
                            <View style={styles.Badge} />
                        </View>
                        <View style={styles.Block}>
                            <View style={styles.Badge} />
                        </View>
                        <View style={styles.Block}>
                            <View style={styles.Badge} />
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
        backgroundColor: '#FFF'
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
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width
    },
    Block: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    Badge: {
        backgroundColor: '#465F6C',
        width: 50,
        height: 50,
        borderRadius: 50,
    }
    
});

AppRegistry.registerComponent('Profile', () => Profile);
