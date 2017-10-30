
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  ActivityIndicator,
  ListView,
} from 'react-native';
import MissionDesc from '../component/missions/MissionDesc';

const { width, height } = Dimensions.get('window');
export default class MissionDetail extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation; 
        this.state = {
          isLoading: true,
          team: state.params.Team,
          id: state.params.id,
          Mission_ID: state.params.Mission_ID,
        };
    }

    componentDidMount() {
        let url = 'http://www.journeymission.me/api/JoinMissions?with=Mission&search=Profile_ID:' + this.state.id + ';Mission_ID:' + this.state.Mission_ID + ';&searchJoin=and';
        return fetch( url, {
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
    
      render() {
        const { goBack } = this.props.navigation;
        if (this.state.isLoading) {
          return (
            <View style={{ flex: 1, paddingTop: 20 }}>
              <ActivityIndicator />
            </View>
          );
        }
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <View>
                        <TouchableOpacity onPress={() => goBack('', { team: this.state.team, id: this.state.id })} >
                            <Image style={styles.navBack} source={require('../img/vm_btt_back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle}>
                        <Image style={styles.navMission} source={require('../img/rc_ic_missionName.png')} />
                        <Text style={styles.navText}> Mission Name </Text>
                    </View>
                    <TouchableOpacity onPress={null}>
                        <View style={styles.navBtn}>
                            <Text style={styles.navBtnText}>Join</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <MissionDesc style={styles.Desc} Mission_Description={'Mission_Description'} Mission_Source={'Source'} Mission_Destination={'Destination'} Mission_Category={'Category'} Mission_Score={'Score'}/>
                <ScrollView style={styles.Scroll}>
                    <Image style={styles.Map} source={require('../img/vm_pattern.png')}>
                        <View style={styles.row}>
                            <View>
                                <Image style={styles.CarImg} source={require('../img/icc_team_bear-01.png')} /> 
                            </View>
                            <View />
                            <View />
                        </View>
                        <View style={styles.row}>
                            <View />
                            <View />
                            <View>
                                <Image style={styles.CheckpointImg} source={require('../img/chtm_slide_gray-01.png')} />
                                <Text> Checkpoint 1 </Text> 
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.CheckpointLeft}>
                                <Image style={styles.CheckpointImg} source={require('../img/chtm_slide_gray-01.png')} />
                                <Text> Checkpoint 2 </Text> 
                            </View>
                            <View />
                            <View />
                        </View>
                        <View style={styles.row}>
                            <View />
                            <View />
                            <View style={styles.CheckpointRight}>
                                <Image style={styles.CheckpointImg} source={require('../img/chtm_slide_gray-01.png')} />
                                <Text> Checkpoint 3 </Text> 
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.CheckpointLeft}>
                                <Image style={styles.CheckpointImg} source={require('../img/chtm_slide_gray-01.png')} />
                                <Text> Checkpoint 4 </Text> 
                            </View>
                            <View />
                            <View />
                        </View>
                        <View style={styles.row}>
                            <View style={styles.CheckpointRight}>
                            <Image style={styles.CheckpointImg} source={require('../img/chtm_slide_gray-01.png')} />
                            <Text> Checkpoint 5 </Text>
                            </View>
                        </View>
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
            paddingTop: height * 0.14,
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
              paddingRight: 15,
          },
          navTitle: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
          },
          navText: {
              color: '#165A45',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
          },
          navMission: {
              height: 44,
              resizeMode: 'cover',
          },
          navBtn: {
              borderWidth: 2,
              borderColor: '#165A45',
              width: width * 0.2,
              alignItems: 'center',
              borderRadius: 50,
          },
          navBtnText: {
              color: '#165A45',
              fontWeight: 'bold',
          },
          navBack: {
              width: width * 0.07,
              height: height * 0.07,
          },
          Desc: {
              flex: 1,
              width: width,
              backgroundColor: '#000',
          },
          Scroll: {
            width: width,
            flex: 1,
        },
        Map: {
            width: width,
            flex: 1,
            zIndex: 100,
            top: 0,
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        CheckpointLeft: {
            
        },
        CheckpointImg: {
            width: 70,
            height: 70,
            borderWidth: 7,
            borderColor: '#FFF',
            borderRadius: 70,
        },
        CheckpointRight: {
            
        },
        CarImg: {
            width: 100,
            height: 85,
        },
        row: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: width,
        }
      });
      
    
AppRegistry.registerComponent('MissionDetail', () => MissionDetail);
