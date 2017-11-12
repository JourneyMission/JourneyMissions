
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Picker,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ListView
} from 'react-native';
import Mission from '../component/missions/Mission';

const { width, height } = Dimensions.get('window');
export default class SearchMission extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation; 
        this.state = {
          isLoading: true,
          source: 1,
          destination: 1,
          startSearch: false,
          id: state.params.id,
          fbId: state.params.fbId,
          team: state.params.team,
          score: state.params.score,
          apiURL: state.params.apiURL,
          name: state.params.name,
          firstLoad: true,
          Source:{

          },
          Destination:{

          },
        };
    }
    
    componentDidMount() {
        let URL = this.state.apiURL + '/Missions';
        fetch( URL, {
            method: 'GET',
            headers: {'Accept': 'application/json'}
             }).then((response) => response.json())
          .then((responseJson) => {
            let missions = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
              dataSource: missions.cloneWithRows(responseJson.data),
            });
            fetch( PickerURL, {
                method: 'GET',
                headers: {'Accept': 'application/json'}
                 }).then((response) => response.json())
              .then((responseJson) => {
                this.setState({
                  isLoading: false,
                  Source: responseJson.source,
                  Destination: responseJson.destination,
                  firstLoad: false,
                });
              })
              .catch((error) => {
                console.error(error);
              });
            console.log(this.state.dataSource);
          })
          .catch((error) => {
            console.error(error);
          });
        let PickerURL = this.state.apiURL + '/ProvienceSearch';
        
      }
    
    sendVar() {
        const { state } = this.props.navigation; 
        const variable = {
            id: state.params.id,
            fbId: state.params.fbId,
            score: state.params.score,
            team: state.params.team,
            apiURL: state.params.apiURL,
            name: state.params.name,
        };
        return variable;
    }
    search() {
        let URL = this.state.apiURL + '/Missions?search=Mission_Source:' + this.state.source + ';Mission_Destination:' + this.state.destination;
        fetch( URL, {
            method: 'GET',
            headers: {'Accept': 'application/json'}
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
    sendVartoCheckpoint(Mission_ID) {
        const { state } = this.props.navigation; 
        const variable = this.sendVar();
        variable['Mission_ID'] = Mission_ID
        variable['back'] = 'SearchMission';
        return variable;
    }

    pickerSource(){
        return this.state.Source.map((l) => {return <Picker.Item value={l.id} label={l.Provience_Name} key={l.id} /> });
    }
    pickerDestination(){
        return this.state.Destination.map((l) => {return <Picker.Item value={l.id} label={l.provience_Name} key={l.id} /> });
    }
    render() {
        const { navigate } = this.props.navigation;
        if(this.state.firstLoad){
            return (
                <View style={styles.container}>
                <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigate('RecommendMission', this.sendVar())}>
                        <Image style={styles.navBack} source={require('../img/rc_btt_back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.navText}> Search Mission </Text>
                    <Text style={styles.navText}>&nbsp;</Text>
                </View>
                <Image style={styles.bg} source={require('../img/rc_bg_prop.png')} />
                <ScrollView style={styles.SearchResult}>
                    < ActivityIndicator />
                </ScrollView>
            </View>
            );
        }
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                <View style={styles.nav}>
                <TouchableOpacity onPress={() => navigate('RecommendMission', this.sendVar())}>
                        <Image style={styles.navBack} source={require('../img/rc_btt_back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.navText}> Search Mission </Text>
                    <Text style={styles.navText}>&nbsp;</Text>
                </View>
                <Image style={styles.bg} source={require('../img/rc_bg_prop.png')} />
                <ScrollView style={styles.SearchResult}>
                    <View style={styles.contain}>
                    <View>
                    <Text style={styles.TextContent}>From : </Text>
                    <Picker style={styles.pickerSearch} selectedValue={this.state.source} onValueChange={(e) => this.setState({ source: e })}>
{this.pickerSource()}
                </Picker>
                <Text style={styles.TextContent}>To : </Text>
                <Picker style={styles.pickerSearch} selectedValue={this.state.destination} onValueChange={(e) => this.setState({ destination: e })}>
{this.pickerDestination()}
                    </Picker>
                </View>
                    
                <Image style={styles.btn} source={require('../img/rc_btn_search.png')} />
                    < ActivityIndicator />
                  </View>
                </ScrollView>
            </View>
            );
          }
          
        return (
            <View style={styles.container}>
                <View style={styles.nav}>
                    <TouchableOpacity onPress={() => navigate('RecommendMission', this.sendVar())}>
                        <Image style={styles.navBack} source={require('../img/rc_btt_back.png')} />
                    </TouchableOpacity>
                    <Text style={styles.navText}> Search Mission </Text>
                    <Text style={styles.navText}>&nbsp;</Text>
                </View>
                <Image style={styles.bg} source={require('../img/rc_bg_prop.png')} />
                <ScrollView style={styles.SearchResult}>
                    <View style={styles.contain}>
                        <View>
                            <Text style={styles.TextContent}>From : </Text>
                            <Picker style={styles.pickerSearch} selectedValue={this.state.source} onValueChange={(e) => this.setState({ source: e })}>
        {this.pickerSource()}
                        </Picker>
                        <Text style={styles.TextContent}>To : </Text>
                        <Picker style={styles.pickerSearch} selectedValue={this.state.destination} onValueChange={(e) => this.setState({ destination: e })}>
        {this.pickerDestination()}
                            </Picker>
                        </View>
                    
                <TouchableOpacity onPress={() => this.search()}>
                    <Image style={styles.btn} source={require('../img/rc_btn_search.png')} />
                </TouchableOpacity>
                <ListView
                style={styles.mission}
                dataSource={this.state.dataSource}
                renderRow={(rowData) => <TouchableOpacity
                onPress={() => navigate('MissionDetail', this.sendVartoCheckpoint(rowData.id))} >
                <Mission
                    Mission_Name={rowData.Mission_Name}
                    Mission_Description={rowData.Mission_Description}
                    Mission_Icon={rowData.Mission_Icon} />
            </TouchableOpacity>} />
                
               
                  </View>
                </ScrollView>
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
          paddingTop: height * 0.12,
        },
        contain: {
            flex: 1,
            alignItems: 'center',
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
            flex: 1,
            resizeMode: 'stretch',
        }, 
        pickerSearch: {
            width: width * 0.8,
            backgroundColor: '#FFF',
            marginBottom: 20,
            height: height * 0.075,
        },
        btn: {
            width: width * 0.7,
            height: width * 0.15,
            resizeMode: 'contain',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
        },
        TextContent: {
            color: '#FFF',
            fontSize: 15,
            textAlign: 'left',
        },
        SearchResult: {
            width: width,
            flex: 1,
        }
      });
    
AppRegistry.registerComponent('SearchMission', () => SearchMission);
