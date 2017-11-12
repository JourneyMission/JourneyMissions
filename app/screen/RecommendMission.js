
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ListView, 
} from 'react-native';
import Mission from '../component/missions/Mission';

const { width, height } = Dimensions.get('window');
export default class RecommendMission extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation; 
        this.state = {
          isLoading: true,
          id: state.params.id,
          fbId: state.params.fbId,
          team: state.params.team,
          apiURL: state.params.apiURL,
          score: state.params.score,
          name: state.params.name,
        };
    }

    componentDidMount() {
        let URL = this.state.apiURL + '/RecommendMission/' + this.state.id;
        return fetch(URL, {
            method: 'GET',
            headers: { Accept: 'application/json' }
             }).then((response) => response.json())
          .then((responseJson) => {
            let missions = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              isLoading: false,
              dataSource: missions.cloneWithRows(responseJson.data),
            });
          })
          .catch((error) => {
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
    sendVartoCheckpoint(Mission_ID) {
        const { state } = this.props.navigation; 
        const variable = this.sendVar();
        variable['Mission_ID'] = Mission_ID;    
        variable['back'] = 'RecommendMission';
        return variable;
    }

    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
               < ActivityIndicator />
            );
          }

        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => navigate('Home', this.state)}>
                        <Image style={styles.navBack} source={require('../img/rc_btt_back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.navText}> Recommend {'\n'} Mission </Text>
                    <TouchableOpacity onPress={() => navigate('SearchMission', this.state)}>
                        <Image style={styles.navSearch} source={require('../img/rc_btt_search.png')} />
                    </TouchableOpacity>
                </View>
                <Image style={styles.bg} source={require('../img/rc_bg_prop.png')} />
                
                <ListView
                    style={styles.mission}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => navigate('MissionDetail', this.sendVartoCheckpoint(rowData.id))} >
                    <Mission
                        Mission_Name={rowData.Mission_Name}
                        Mission_Description={rowData.Mission_Description}
                        Mission_Icon={rowData.Mission_Icon} />
                </TouchableOpacity>} />
            </View>
        );
      }
      
    }
    const styles = StyleSheet.create({
        
        container: {
          flex: 1,
          backgroundColor: '#253A57',
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
        navSearch: {
            width: width * 0.12,
            height: height * 0.07,
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
    
    
AppRegistry.registerComponent('RecommendMission', () => RecommendMission);
