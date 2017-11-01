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
    ListView,
    ActivityIndicator,
    Alert
} from 'react-native';
import TeamCarIcon from '../component/team/TeamCarIcon';
import JoinBtn from '../component/missions/JoinBtn';
import MissionDesc from '../component/missions/MissionDesc';

const {width, height} = Dimensions.get('window');
export default class MissionDetail extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation;
        this.state = {
            isLoading: true,
            id: 1,
            fbId: '100000271633032',
            team: 'bear',
            apiURL: 'http://10.0.2.2/api',
            Mission_ID: 1,
            imgURL: 'http://journeymission.me/storage',
        };
        
    }
    
    componentDidMount() {
        const MissionDetailURL = this.state.apiURL + '/Missions?search=id:' + this.state.Mission_ID + '&with=CategoryMission;MissionDestination;MissionSource';
        const CheckpointURL = this.state.apiURL + '/MissionCheckpoints?search=Mission_ID:' + this.state.Mission_ID + '&with=Checkpoint&orderBy=Order';
        const JoinMissionURL = this.state.apiURL + '/JoinMissions?search=Profile_ID:' + this.state.id + ';Mission_ID:' + this.state.Mission_ID + '&searchJoin=and';
        const CheckMissionURL = this.state.apiURL + '/CheckMission/' + this.state.Mission_ID + '/' + this.state.id;
        this.fetchMission(MissionDetailURL,JoinMissionURL,CheckMissionURL,CheckpointURL);
        
    }

    fetchMission(URL,URL2,URL3,URL4) {
        fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({
                Mission: responseJson.data[0]
            });
            this.setState({
                Missionimg: this.state.imgURL + '/mission/photo/' + this.state.Mission.Mission_Photo,
            });
            
            fetch(URL2, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => response.json()).then((responseJson) => {
                if (responseJson.data.length !== 0) {
                    this.setState({
                        JoinMission: true,
                        JoinMission_ID: responseJson.data[0].id,
                        Mission_Status: false,
                    });
                    if(responseJson.data[0].Mission_Status !== 1){
                        this.setState({
                            Mission_Status: true,
                        });
                    }
                } else {
                    this.setState({
                        JoinMission: false
                    });
                }
                fetch(URL3, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json'
                    }
                }).then((response) => response.json()).then((responseJson) => {
                    this.setState({
                        CheckMission: responseJson.data
                    });
                    fetch(URL4, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json'
                        }
                    }).then((response) => response.json()).then((responseJson) => {
                        let missions = new ListView.DataSource({
                            rowHasChanged: (r1, r2) => r1 !== r2
                        });
                        this.setState({
                            isLoading: false,
                            dataSource: missions.cloneWithRows(responseJson.data),
        
                        });
                    }).catch((error) => {
                        console.error(error);
                    });
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
        const { state } = this.props.navigation;
        const variable = {
            id: state.params.id,
            fbId: state.params.fbId,
            team: state.params.team,
            apiURL: state.params.apiURL,
        };
        return variable;
    }

    sendVartoCheckpoint(Checkpoint_ID) {
        const { state } = this.props.navigation; 
        const variable = this.sendVar();
        variable['Mission_ID'] = this.state.Mission_ID;
        variable['Checkpoint_ID'] = Checkpoint_ID;
        return variable;
    }

    checkpointIconLeft(Name, CheckpointImg, id) {
       return (
                <View style={styles.CheckpointLeft}>
                    {this.checkpointIconCheck(CheckpointImg, id)}
                    <Text style={styles.CheckpointName}>
                       {Name}
                    </Text>
                </View>
        );
    }
    checkpointIconRight(Name, CheckpointImg, id) {
        return (
            <View style={styles.CheckpointRight}>
                    {this.checkpointIconCheck(CheckpointImg, id)}
                    <Text style={styles.CheckpointName}>
                        {Name}
                    </Text>
            </View>
        );
    }
    checkpointIconCheck(CheckpointImg, id){
        let img = this.state.imgURL + '/checkpoint/grayicon/' + CheckpointImg;
        if(this.state.CheckMission.indexOf(id) !== -1 ){
            img = this.state.imgURL + '/checkpoint/icon/' + CheckpointImg;
        }else{
            img = this.state.imgURL + '/checkpoint/grayicon/' + CheckpointImg;
        } 
        return(
            <Image
            style={styles.CheckpointImg}
            source={{
            uri: img
        }}/>
        
        );

    }
    checkpointIcon(Name, CheckpointImg, rowID, id) {
        if (rowID % 2 == 0){
            return (this.checkpointIconLeft(Name, CheckpointImg, id));
        } else if (rowID / 2 != 0){
            return (this.checkpointIconRight(Name, CheckpointImg, id));
        }
    }

    joinMission = () => {
        this.setState({
            isLoading: true,
        });
        if(!this.state.JoinMission){
            let URL = this.state.apiURL + '/JoinMissions?Mission_ID=' + this.state.Mission_ID + '&Profile_ID=' + this.state.id;
            fetch(URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    isLoading: false,
                    JoinMission: true,
                }, () => {
                    alert('Let\'s start new journey');
                });
                
            }).catch((error) => {
                console.error(error);
            });
        }else{
            let URL = this.state.apiURL + '/JoinMissions/' + this.state.JoinMission_ID;
            fetch(URL, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    isLoading: false,
                    JoinMission: false,
                }, () => {
                    alert('Quit Mission');
                });
            }).catch((error) => {
                console.error(error);
            });
        }
    }
    completeMission(complete){
if(complete){
return (<View />);
}else{
    return(
        <TouchableOpacity onPress={this.joinMission}>
        <JoinBtn Status={this.state.JoinMission} />
    </TouchableOpacity>
    );
}
    }
    
    render() {
        const { navigate } = this.props.navigation;
        const { goBack } = this.props.navigation;
        let count = 1;
        if (this.state.isLoading) {
            return (
                    <ActivityIndicator/>
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <View>
                        <TouchableOpacity onPress={() => goBack('', this.sendVar())}>
                            <Image style={styles.navBack} source={require('../img/vm_btt_back.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle}>
                        <Image
                            style={styles.navMission}
                            source={require('../img/rc_ic_missionName.png')}/>
                        <Text style={styles.navText}>
                            {this.state.Mission.Mission_Name}
                        </Text>
                    </View>
                    {this.completeMission(this.state.Mission_Status)}
                </View>
                <MissionDesc
                    style={styles.Desc}
                    Mission_Description={this.state.Mission.Mission_Description}
                    Mission_Source={this.state.Mission.mission_source.Provience_Name}
                    Mission_Destination={this.state.Mission.mission_destination.Provience_Name}
                    Mission_Category={this.state.Mission.category_mission.Category_Mission_Name}
                    Mission_Score={this.state.Mission.Mission_Score}/>
                <ScrollView style={styles.Scroll}>
                    <Image
                        style={styles.Map}
                        source={{ uri: this.state.Missionimg }}>
                        <View style={styles.row}>
                            <View>
                                <TeamCarIcon team={this.state.team}/>
                            </View>
                            <View/>
                            <View/>
                        </View>
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => 
                            <TouchableOpacity 
                            activeOpacity={0.7}
                            onPress={() => navigate('CheckpointDetail', this.sendVartoCheckpoint(rowData.checkpoint.id))}> 
                            <View style={styles.row}>
                                {this.checkpointIcon(rowData.checkpoint.Checkpoint_Name, rowData.checkpoint.Checkpoint_Icon, count++, rowData.checkpoint.id)}
                            </View>
                        </TouchableOpacity>
                    } />
                    </Image>
                </ScrollView>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: height * 0.14
    },
    nav: {
        width: width,
        height: height * 0.12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: -100,
        position: 'absolute',
        top: 0,
        paddingLeft: 15,
        paddingRight: 15
    },
    navTitle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    navText: {
        color: '#165A45',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    navMission: {
        height: 44,
        resizeMode: 'cover'
    },
    navBtn: {
        borderWidth: 2,
        borderColor: '#165A45',
        width: width * 0.2,
        alignItems: 'center',
        borderRadius: 50
    },
    navBtnText: {
        color: '#165A45',
        fontWeight: 'bold'
    },
    navBack: {
        width: width * 0.07,
        height: height * 0.07
    },
    Desc: {
        flex: 1,
        width: width,
        backgroundColor: '#000'
    },
    Scroll: {
        width: width,
        flex: 1
    },
    Map: {
        width: width,
        zIndex: 100,
        top: 0,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    CheckpointLeft: {
        alignItems: 'flex-start',
        width: width,
        marginLeft: 100,
    },
    CheckpointImg: {
        width: 70,
        height: 70,
        borderWidth: 7,
        borderColor: '#FFF',
        borderRadius: 70,
        marginTop: 20
    },
    CheckpointRight: {
        alignItems: 'flex-end',
        width: width,
        marginRight: 150,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: width
    },
    CheckpointName: {
        marginBottom: 15
    }
});

AppRegistry.registerComponent('MissionDetail', () => MissionDetail);
