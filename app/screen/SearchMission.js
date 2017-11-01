
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
          apiURL: state.params.apiURL,
        };
    }
    
    componentDidMount() {
        let URL = this.state.apiURL + '/Missions';
        return this.fetchData(URL);
      }
    
    fetchData(URL){
        return fetch( URL, {
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
    search() {
        let URL = this.state.apiURL + '/Missions?search=Mission_Source:' + this.state.source + ';Mission_Destination:' + this.state.destination;
        return this.fetchData(URL);
      }
    sendVartoCheckpoint(Mission_ID) {
        const { state } = this.props.navigation; 
        const variable = this.sendVar();
        variable['Mission_ID'] = Mission_ID
        variable['back'] = 'SearchMission';
        return variable;
    }
    render() {
        const { navigate } = this.props.navigation;
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
                                <Picker.Item value="1" label="Bangkok" />
                                <Picker.Item value="2" label="Krabi" />
                                <Picker.Item value="3" label="Kanchanaburi" />
                                <Picker.Item value="4" label="Kalasin" />
                                <Picker.Item value="5" label="Kamphaeng Phet" />
                                <Picker.Item value="6" label="Khon Kaen" />
                                <Picker.Item value="7" label="Chanthaburi" />
                                <Picker.Item value="8" label="Chachoengsao" />
                                <Picker.Item value="9" label="Chonburi" />
                                <Picker.Item value="10" label="Chainat" />
                                <Picker.Item value="11" label="Chaiyaphum" />
                                <Picker.Item value="12" label="Chumphon" />
                                <Picker.Item value="13" label="Chiang Rai" />
                                <Picker.Item value="14" label="Chiang Mai" />
                                <Picker.Item value="15" label="Trang" />
                                <Picker.Item value="16" label="Trat" />
                                <Picker.Item value="17" label="Tak" />
                                <Picker.Item value="18" label="Nakhon Nayok" />
                                <Picker.Item value="19" label="Nakhon Pathom" />
                                <Picker.Item value="20" label="Nakhon Phanom" />
                                <Picker.Item value="21" label="Nakhon Ratchasima" />
                                <Picker.Item value="22" label="Nakhon Si Thammarat" />
                                <Picker.Item value="23" label="Nakhon Sawan" />
                                <Picker.Item value="24" label="Nonthaburi" />
                                <Picker.Item value="25" label="Narathiwat" />
                                <Picker.Item value="26" label="Nan" />
                                <Picker.Item value="27" label="Bueng Kan" />
                                <Picker.Item value="28" label="Buriram" />
                                <Picker.Item value="29" label="Pathum Thani" />
                                <Picker.Item value="30" label="Prachuap Khiri Khan" />
                                <Picker.Item value="31" label="Prachinburi" />
                                <Picker.Item value="32" label="Pattani" />
                                <Picker.Item value="33" label="Ayutthaya" />
                                <Picker.Item value="34" label="Phayao" />
                                <Picker.Item value="35" label="Phang Nga" />
                                <Picker.Item value="36" label="Phatthalung" />
                                <Picker.Item value="37" label="Phichit" />
                                <Picker.Item value="38" label="Phitsanulok" />
                                <Picker.Item value="39" label="Phetchaburi" />
                                <Picker.Item value="41" label="Phetchabun" />
                                <Picker.Item value="42" label="Phuket" />
                                <Picker.Item value="43" label="Maha Sarakham" />
                                <Picker.Item value="44" label="Mukdahan" />
                                <Picker.Item value="45" label="Mae Hong Son" />
                                <Picker.Item value="46" label="Yasothon" />
                                <Picker.Item value="47" label="Yala" />
                                <Picker.Item value="48" label="Roi Et" />
                                <Picker.Item value="49" label="Ranong" />
                                <Picker.Item value="50" label="Rayong" />
                                <Picker.Item value="51" label="Ratchaburi" />
                                <Picker.Item value="52" label="Lopburi" />
                                <Picker.Item value="53" label="Lamphang" />
                                <Picker.Item value="54" label="Lampoon" />
                                <Picker.Item value="55" label="Loei" />
                                <Picker.Item value="56" label="Sisaket" />
                                <Picker.Item value="57" label="Sakon Nakhon" />
                                <Picker.Item value="58" label="Songkhla" />
                                <Picker.Item value="59" label="Satun" />
                                <Picker.Item value="60" label="Samut Prakan" />
                                <Picker.Item value="61" label="Samut Songkhram" />
                                <Picker.Item value="62" label="Samut Sakhon" />
                                <Picker.Item value="63" label="Sa Kaeo" />
                                <Picker.Item value="64" label="Saraburi" />
                                <Picker.Item value="65" label="Sing Buri" />
                                <Picker.Item value="66" label="Sukhothai" />
                                <Picker.Item value="67" label="Suphan Buri" />
                                <Picker.Item value="68" label="Surat Thani" />
                                <Picker.Item value="69" label="Surin" />
                                <Picker.Item value="70" label="Nong Khai" />
                                <Picker.Item value="71" label="Nong Bua Lamphu" />
                                <Picker.Item value="72" label="Ang Thong" />
                                <Picker.Item value="73" label="Amnat Charoen" />
                                <Picker.Item value="74" label="Udon Thani" />
                                <Picker.Item value="75" label="Uttaradit" />
                                <Picker.Item value="76" label="Uthai Thani" />
                                <Picker.Item value="77" label="Ubon Ratchathani" />
                            </Picker>
                            <Text style={styles.TextContent}>To : </Text>
                            <Picker style={styles.pickerSearch} selectedValue={this.state.destination} onValueChange={(e) => this.setState({ destination: e })}>
                                <Picker.Item value="1" label="Bangkok" />
                                <Picker.Item value="2" label="Krabi" />
                                <Picker.Item value="3" label="Kanchanaburi" />
                                <Picker.Item value="4" label="Kalasin" />
                                <Picker.Item value="5" label="Kamphaeng Phet" />
                                <Picker.Item value="6" label="Khon Kaen" />
                                <Picker.Item value="7" label="Chanthaburi" />
                                <Picker.Item value="8" label="Chachoengsao" />
                                <Picker.Item value="9" label="Chonburi" />
                                <Picker.Item value="10" label="Chainat" />
                                <Picker.Item value="11" label="Chaiyaphum" />
                                <Picker.Item value="12" label="Chumphon" />
                                <Picker.Item value="13" label="Chiang Rai" />
                                <Picker.Item value="14" label="Chiang Mai" />
                                <Picker.Item value="15" label="Trang" />
                                <Picker.Item value="16" label="Trat" />
                                <Picker.Item value="17" label="Tak" />
                                <Picker.Item value="18" label="Nakhon Nayok" />
                                <Picker.Item value="19" label="Nakhon Pathom" />
                                <Picker.Item value="20" label="Nakhon Phanom" />
                                <Picker.Item value="21" label="Nakhon Ratchasima" />
                                <Picker.Item value="22" label="Nakhon Si Thammarat" />
                                <Picker.Item value="23" label="Nakhon Sawan" />
                                <Picker.Item value="24" label="Nonthaburi" />
                                <Picker.Item value="25" label="Narathiwat" />
                                <Picker.Item value="26" label="Nan" />
                                <Picker.Item value="27" label="Bueng Kan" />
                                <Picker.Item value="28" label="Buriram" />
                                <Picker.Item value="29" label="Pathum Thani" />
                                <Picker.Item value="30" label="Prachuap Khiri Khan" />
                                <Picker.Item value="31" label="Prachinburi" />
                                <Picker.Item value="32" label="Pattani" />
                                <Picker.Item value="33" label="Ayutthaya" />
                                <Picker.Item value="34" label="Phayao" />
                                <Picker.Item value="35" label="Phang Nga" />
                                <Picker.Item value="36" label="Phatthalung" />
                                <Picker.Item value="37" label="Phichit" />
                                <Picker.Item value="38" label="Phitsanulok" />
                                <Picker.Item value="39" label="Phetchaburi" />
                                <Picker.Item value="41" label="Phetchabun" />
                                <Picker.Item value="42" label="Phuket" />
                                <Picker.Item value="43" label="Maha Sarakham" />
                                <Picker.Item value="44" label="Mukdahan" />
                                <Picker.Item value="45" label="Mae Hong Son" />
                                <Picker.Item value="46" label="Yasothon" />
                                <Picker.Item value="47" label="Yala" />
                                <Picker.Item value="48" label="Roi Et" />
                                <Picker.Item value="49" label="Ranong" />
                                <Picker.Item value="50" label="Rayong" />
                                <Picker.Item value="51" label="Ratchaburi" />
                                <Picker.Item value="52" label="Lopburi" />
                                <Picker.Item value="53" label="Lamphang" />
                                <Picker.Item value="54" label="Lampoon" />
                                <Picker.Item value="55" label="Loei" />
                                <Picker.Item value="56" label="Sisaket" />
                                <Picker.Item value="57" label="Sakon Nakhon" />
                                <Picker.Item value="58" label="Songkhla" />
                                <Picker.Item value="59" label="Satun" />
                                <Picker.Item value="60" label="Samut Prakan" />
                                <Picker.Item value="61" label="Samut Songkhram" />
                                <Picker.Item value="62" label="Samut Sakhon" />
                                <Picker.Item value="63" label="Sa Kaeo" />
                                <Picker.Item value="64" label="Saraburi" />
                                <Picker.Item value="65" label="Sing Buri" />
                                <Picker.Item value="66" label="Sukhothai" />
                                <Picker.Item value="67" label="Suphan Buri" />
                                <Picker.Item value="68" label="Surat Thani" />
                                <Picker.Item value="69" label="Surin" />
                                <Picker.Item value="70" label="Nong Khai" />
                                <Picker.Item value="71" label="Nong Bua Lamphu" />
                                <Picker.Item value="72" label="Ang Thong" />
                                <Picker.Item value="73" label="Amnat Charoen" />
                                <Picker.Item value="74" label="Udon Thani" />
                                <Picker.Item value="75" label="Uttaradit" />
                                <Picker.Item value="76" label="Uthai Thani" />
                                <Picker.Item value="77" label="Ubon Ratchathani" />
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
                            <Picker.Item value="1" label="Bangkok" />
                            <Picker.Item value="2" label="Krabi" />
                            <Picker.Item value="3" label="Kanchanaburi" />
                            <Picker.Item value="4" label="Kalasin" />
                            <Picker.Item value="5" label="Kamphaeng Phet" />
                            <Picker.Item value="6" label="Khon Kaen" />
                            <Picker.Item value="7" label="Chanthaburi" />
                            <Picker.Item value="8" label="Chachoengsao" />
                            <Picker.Item value="9" label="Chonburi" />
                            <Picker.Item value="10" label="Chainat" />
                            <Picker.Item value="11" label="Chaiyaphum" />
                            <Picker.Item value="12" label="Chumphon" />
                            <Picker.Item value="13" label="Chiang Rai" />
                            <Picker.Item value="14" label="Chiang Mai" />
                            <Picker.Item value="15" label="Trang" />
                            <Picker.Item value="16" label="Trat" />
                            <Picker.Item value="17" label="Tak" />
                            <Picker.Item value="18" label="Nakhon Nayok" />
                            <Picker.Item value="19" label="Nakhon Pathom" />
                            <Picker.Item value="20" label="Nakhon Phanom" />
                            <Picker.Item value="21" label="Nakhon Ratchasima" />
                            <Picker.Item value="22" label="Nakhon Si Thammarat" />
                            <Picker.Item value="23" label="Nakhon Sawan" />
                            <Picker.Item value="24" label="Nonthaburi" />
                            <Picker.Item value="25" label="Narathiwat" />
                            <Picker.Item value="26" label="Nan" />
                            <Picker.Item value="27" label="Bueng Kan" />
                            <Picker.Item value="28" label="Buriram" />
                            <Picker.Item value="29" label="Pathum Thani" />
                            <Picker.Item value="30" label="Prachuap Khiri Khan" />
                            <Picker.Item value="31" label="Prachinburi" />
                            <Picker.Item value="32" label="Pattani" />
                            <Picker.Item value="33" label="Ayutthaya" />
                            <Picker.Item value="34" label="Phayao" />
                            <Picker.Item value="35" label="Phang Nga" />
                            <Picker.Item value="36" label="Phatthalung" />
                            <Picker.Item value="37" label="Phichit" />
                            <Picker.Item value="38" label="Phitsanulok" />
                            <Picker.Item value="39" label="Phetchaburi" />
                            <Picker.Item value="41" label="Phetchabun" />
                            <Picker.Item value="42" label="Phuket" />
                            <Picker.Item value="43" label="Maha Sarakham" />
                            <Picker.Item value="44" label="Mukdahan" />
                            <Picker.Item value="45" label="Mae Hong Son" />
                            <Picker.Item value="46" label="Yasothon" />
                            <Picker.Item value="47" label="Yala" />
                            <Picker.Item value="48" label="Roi Et" />
                            <Picker.Item value="49" label="Ranong" />
                            <Picker.Item value="50" label="Rayong" />
                            <Picker.Item value="51" label="Ratchaburi" />
                            <Picker.Item value="52" label="Lopburi" />
                            <Picker.Item value="53" label="Lamphang" />
                            <Picker.Item value="54" label="Lampoon" />
                            <Picker.Item value="55" label="Loei" />
                            <Picker.Item value="56" label="Sisaket" />
                            <Picker.Item value="57" label="Sakon Nakhon" />
                            <Picker.Item value="58" label="Songkhla" />
                            <Picker.Item value="59" label="Satun" />
                            <Picker.Item value="60" label="Samut Prakan" />
                            <Picker.Item value="61" label="Samut Songkhram" />
                            <Picker.Item value="62" label="Samut Sakhon" />
                            <Picker.Item value="63" label="Sa Kaeo" />
                            <Picker.Item value="64" label="Saraburi" />
                            <Picker.Item value="65" label="Sing Buri" />
                            <Picker.Item value="66" label="Sukhothai" />
                            <Picker.Item value="67" label="Suphan Buri" />
                            <Picker.Item value="68" label="Surat Thani" />
                            <Picker.Item value="69" label="Surin" />
                            <Picker.Item value="70" label="Nong Khai" />
                            <Picker.Item value="71" label="Nong Bua Lamphu" />
                            <Picker.Item value="72" label="Ang Thong" />
                            <Picker.Item value="73" label="Amnat Charoen" />
                            <Picker.Item value="74" label="Udon Thani" />
                            <Picker.Item value="75" label="Uttaradit" />
                            <Picker.Item value="76" label="Uthai Thani" />
                            <Picker.Item value="77" label="Ubon Ratchathani" />
                        </Picker>
                        <Text style={styles.TextContent}>To : </Text>
                        <Picker style={styles.pickerSearch} selectedValue={this.state.destination} onValueChange={(e) => this.setState({ destination: e })}>
                            <Picker.Item value="1" label="Bangkok" />
                            <Picker.Item value="2" label="Krabi" />
                            <Picker.Item value="3" label="Kanchanaburi" />
                            <Picker.Item value="4" label="Kalasin" />
                            <Picker.Item value="5" label="Kamphaeng Phet" />
                            <Picker.Item value="6" label="Khon Kaen" />
                            <Picker.Item value="7" label="Chanthaburi" />
                            <Picker.Item value="8" label="Chachoengsao" />
                            <Picker.Item value="9" label="Chonburi" />
                            <Picker.Item value="10" label="Chainat" />
                            <Picker.Item value="11" label="Chaiyaphum" />
                            <Picker.Item value="12" label="Chumphon" />
                            <Picker.Item value="13" label="Chiang Rai" />
                            <Picker.Item value="14" label="Chiang Mai" />
                            <Picker.Item value="15" label="Trang" />
                            <Picker.Item value="16" label="Trat" />
                            <Picker.Item value="17" label="Tak" />
                            <Picker.Item value="18" label="Nakhon Nayok" />
                            <Picker.Item value="19" label="Nakhon Pathom" />
                            <Picker.Item value="20" label="Nakhon Phanom" />
                            <Picker.Item value="21" label="Nakhon Ratchasima" />
                            <Picker.Item value="22" label="Nakhon Si Thammarat" />
                            <Picker.Item value="23" label="Nakhon Sawan" />
                            <Picker.Item value="24" label="Nonthaburi" />
                            <Picker.Item value="25" label="Narathiwat" />
                            <Picker.Item value="26" label="Nan" />
                            <Picker.Item value="27" label="Bueng Kan" />
                            <Picker.Item value="28" label="Buriram" />
                            <Picker.Item value="29" label="Pathum Thani" />
                            <Picker.Item value="30" label="Prachuap Khiri Khan" />
                            <Picker.Item value="31" label="Prachinburi" />
                            <Picker.Item value="32" label="Pattani" />
                            <Picker.Item value="33" label="Ayutthaya" />
                            <Picker.Item value="34" label="Phayao" />
                            <Picker.Item value="35" label="Phang Nga" />
                            <Picker.Item value="36" label="Phatthalung" />
                            <Picker.Item value="37" label="Phichit" />
                            <Picker.Item value="38" label="Phitsanulok" />
                            <Picker.Item value="39" label="Phetchaburi" />
                            <Picker.Item value="41" label="Phetchabun" />
                            <Picker.Item value="42" label="Phuket" />
                            <Picker.Item value="43" label="Maha Sarakham" />
                            <Picker.Item value="44" label="Mukdahan" />
                            <Picker.Item value="45" label="Mae Hong Son" />
                            <Picker.Item value="46" label="Yasothon" />
                            <Picker.Item value="47" label="Yala" />
                            <Picker.Item value="48" label="Roi Et" />
                            <Picker.Item value="49" label="Ranong" />
                            <Picker.Item value="50" label="Rayong" />
                            <Picker.Item value="51" label="Ratchaburi" />
                            <Picker.Item value="52" label="Lopburi" />
                            <Picker.Item value="53" label="Lamphang" />
                            <Picker.Item value="54" label="Lampoon" />
                            <Picker.Item value="55" label="Loei" />
                            <Picker.Item value="56" label="Sisaket" />
                            <Picker.Item value="57" label="Sakon Nakhon" />
                            <Picker.Item value="58" label="Songkhla" />
                            <Picker.Item value="59" label="Satun" />
                            <Picker.Item value="60" label="Samut Prakan" />
                            <Picker.Item value="61" label="Samut Songkhram" />
                            <Picker.Item value="62" label="Samut Sakhon" />
                            <Picker.Item value="63" label="Sa Kaeo" />
                            <Picker.Item value="64" label="Saraburi" />
                            <Picker.Item value="65" label="Sing Buri" />
                            <Picker.Item value="66" label="Sukhothai" />
                            <Picker.Item value="67" label="Suphan Buri" />
                            <Picker.Item value="68" label="Surat Thani" />
                            <Picker.Item value="69" label="Surin" />
                            <Picker.Item value="70" label="Nong Khai" />
                            <Picker.Item value="71" label="Nong Bua Lamphu" />
                            <Picker.Item value="72" label="Ang Thong" />
                            <Picker.Item value="73" label="Amnat Charoen" />
                            <Picker.Item value="74" label="Udon Thani" />
                            <Picker.Item value="75" label="Uttaradit" />
                            <Picker.Item value="76" label="Uthai Thani" />
                            <Picker.Item value="77" label="Ubon Ratchathani" />
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
            fontSize: 20,
            textAlign: 'left',
        },
        SearchResult: {
            width: width,
            flex: 1,
        }
      });
    
AppRegistry.registerComponent('SearchMission', () => SearchMission);
