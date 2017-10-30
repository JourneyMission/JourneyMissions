
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ListView,
  ActivityIndicator
} from 'react-native';
import Mission from '../component/missions/Mission';

const { width, height } = Dimensions.get('window');
export default class CurrentMission extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation; 
        this.state = {
          isLoading: true,
          team: 1,
          id: 1,
        };
        console.log('user: ' + this.state.id + 'team: ' + this.state.team);
    }

    componentDidMount() {
        let url = 'http://www.journeymission.me/api/JoinMissions?with=Mission&search=Profile_ID:' + this.state.id + ';Mission_Status:1&searchJoin=and';
        return fetch(url, {
            method: 'GET',
            headers: { Accept: 'application/json' }
             }).then((response) => response.json())
          .then((responseJson) => {
            let missions = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: missions.cloneWithRows(responseJson.data),
            });
            console.log(this.state.dataSource);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    
      render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => navigate('Home', { team: this.state.team, id: this.state.id })}>
                        <Image style={styles.navBack} source={require('../img/rc_btt_back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.navText}> Current {'\n'} Mission </Text>
                    <Text style={styles.navText}> &nbsp; </Text>
                </View>
                <Image style={styles.bg} source={require('../img/cm_bg_prop.png')} />
                < ActivityIndicator />
            </View>
            );
        }
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigate('Home', { team: this.state.team, id: this.state.id })}>
                    <Image style={styles.navBack} source={require('../img/rc_btt_back.png')} />
                </TouchableOpacity>
                <Text style={styles.navText}> Current {'\n'} Mission </Text>
                <Text style={styles.navText}> &nbsp; </Text>
                </View>
                <Image style={styles.bg} source={require('../img/cm_bg_prop.png')} />
                <ListView 
                    style={styles.mission}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => 
                    <TouchableOpacity onPress={() => navigate('MissionDetail', { Mission_ID: rowData.mission.Mission_ID, id: this.state.id })}>
                        <Mission Mission_Name={rowData.mission.Mission_Name} Mission_Description={rowData.mission.Mission_Description} Mission_Icon={rowData.mission.Mission_Icon} />
                    </TouchableOpacity>
                        }
                />
            </View>
        );
      }
      
    }
    const styles = StyleSheet.create({
        
        container: {
          flex: 1,
          backgroundColor: '#B9C7D3',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: height * 0.15,
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
            paddingTop: 0,
            paddingLeft: 15,
            paddingRight: 15,
        },
        navText: {
            color: '#FFF',
            fontSize: 30,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        navBack: {
            width: width * 0.07,
            height: height * 0.07,
        },
        bg: {
            width: width,
            height: width - 100,
            position: 'absolute',
            alignItems: 'center',
            zIndex: -100,
            bottom: 0,
        },
        mission: {
            width: width * 0.92,
        },
      });
    
AppRegistry.registerComponent('CurrentMission', () => CurrentMission);
