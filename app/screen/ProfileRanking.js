import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Text,
    ActivityIndicator,
    ListView,
    ScrollView
} from 'react-native';
import TeamWithProfile from '../component/team/TeamWithProfileMedium';
import Rankrow from '../component/profiles/Rankrow';

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
            rank: 0,
        };
    }
    sendVar() {
        const {state} = this.props.navigation;
        const variable = {
            id: state.params.id,
            fbId: state.params.fbId,
            team: state.params.team,
            apiURL: state.params.apiURL,
            score: state.params.score,
            name: state.params.name
        };
        return variable;
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
            let profileRank = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState({
                dataSource: profileRank.cloneWithRows(responseJson.data),
                Rank: responseJson.rank,
                isLoading: false
            });

        }).catch((error) => {
            console.error(error);
        });
    }

    checkMyRank(Profile_ProviderID, rank) {
        let fbId = this.state.fbId;
        if (fbId == parseInt(Profile_ProviderID)) {
            this.setState({Rank: rank});
        }
        return rank;
    }

    render() {
        const {navigate} = this.props.navigation;
        let count = 1;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ScrollView>
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
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => navigate('ProfileBadge', this.sendVar())}>
                                <View style={[styles.MenuBtn, styles.normal]}>
                                    <Text style={styles.normalText}>Badge</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}>
                                <View style={[styles.MenuBtn, styles.active]}>
                                    <Text >Ranking</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.Desc}>
                            <View style={styles.Row}>
                                <Text style={styles.YourRank}>Your Rank</Text>
                            </View>
                            <View style={styles.Row}>
                                <Text style={styles.Rank}>{this.state.Rank}</Text>
                            </View>
                            <ActivityIndicator />
                        </View>

                    </ScrollView>
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <ScrollView>

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
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => navigate('ProfileBadge', this.sendVar())}>
                            <View style={[styles.MenuBtn, styles.normal]}>
                                <Text style={styles.normalText}>Badge</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}>
                            <View style={[styles.MenuBtn, styles.active]}>
                                <Text >Ranking</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.Desc}>
                        <View style={styles.Row}>
                            <Text style={styles.YourRank}>Your Rank</Text>
                        </View>
                        <View style={styles.Row}>
                            <Text style={styles.Rank}>{this.state.Rank}</Text>
                        </View>
                       <ListView
                            style={styles.Rankrow}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => 
                            < Rankrow name = {rowData.Profile_Name}
                            fbId = {rowData.Profile_ProviderID}
                            team = {rowData.Profile_Team}
                            score = {rowData.Profile_Score}
                             rank = {count++} />
                        }/>
                    </View>

                </ScrollView>
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
        height: height * 0.35,
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
        justifyContent: 'flex-start'
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
    Rankrow: {
        zIndex: 0,
    },
    Row: {
        flexDirection: 'row',
        marginTop: 2,
        marginBottom: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width
    },
    YourRank: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10
    },
    Rank: {
        fontSize: 50
    },

});

AppRegistry.registerComponent('Profile', () => Profile);
