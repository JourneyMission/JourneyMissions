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
    Modal,
    ActivityIndicator,
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
            name: state.params.name,
            modalVisible: false,
            imgURL: 'https://www.journeymission.me/storage',
            badge : {
                Badge_Name: 'Badge Name',
                Badge_Description: 'Badge_Description',
                Badge_Photo: 'Photo',
            }
          };
    }
    componentDidMount(){
        let URL = this.state.apiURL + '/ProfileBadges/' + this.state.id + '?with=Badge';
        console.log(URL);
        return fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            let badges = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            this.setState({
                isLoading: false,
                dataSource: badges.cloneWithRows(responseJson.data)
            });

        }).catch((error) => {
            console.error(error);
        });
    
    }

    setModalVisible(visible, badge) {
        this.setState({
            modalVisible: visible,
            badge: badge,
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
    getBadge(imglink){
        let imgURL = this.state.imgURL + '/badge/' + imglink;
        return (<Image source={{ uri: imgURL }} style={styles.Badge} />);
    }

    render() {
        const {navigate} = this.props.navigation;
        let count = 0;
        if(this.state.isLoading){
            return(
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
                        <ActivityIndicator />
                    </ScrollView>
                </View>
            </View>
            );
        }
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
                    <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={styles.modal}>
          <View style={styles.modalContent}>
          <View style={styles.ModalNav}>
          <TouchableOpacity onPress={() => {
              this.setModalVisible(!this.state.modalVisible,this.state.badge)
            }} style={styles.ModalCloseCover}>
            <Text style={styles.ModalClose}>Close</Text>
            </TouchableOpacity>
              </View>
          <View style={styles.Content}>
          <Image style={styles.badgeIcon} source={{ uri: this.state.imgURL + '/badge/' + this.state.badge.Badge_Photo }} />
            <Text style={styles.badgeName}>{this.state.badge.Badge_Name}</Text>
            <Text style={styles.badgeContent}>{this.state.badge.Badge_Description}</Text>
          </View>
          <View />
          </View>
          
         </View>
        </Modal>
                        <View style={styles.Row}>
                            <ListView
                            contentContainerStyle={styles.list}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData) => 
                            <View style={styles.badgeCover}>
                                <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => {
                                    this.setModalVisible(true,rowData.badge)
                                  }}>
                                    {this.getBadge(rowData.badge.Badge_Photo)}
                                </TouchableOpacity>
                            </View>}/>
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
    modal: {
        backgroundColor: '#000',
        opacity: 0.9,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        width: width * 0.8,
        height: height * 0.5,
        borderRadius: width * 0.05,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    Content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0
    },
    badgeIcon: {
        width: 100,
        height: 100,
    },
    badgeName: {
        fontWeight: 'bold',
        fontSize: 30
    },
    badgeContent: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    ModalNav: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: width * 0.7,
    },
    ModalClose: {
        
    },
    Desc: {
        flex: 5,
        backgroundColor: '#FFF',
        paddingTop: 10,
        justifyContent: 'center'
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
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    Block: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    badgeCover: {
        width: width * 0.333,
        alignItems: 'center',
        marginBottom: 10,
    },
    Badge: {
        width: 80,
        height: 80,
        borderRadius: 80,
    }
    
});

AppRegistry.registerComponent('Profile', () => Profile);
