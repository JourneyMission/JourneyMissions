
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
  ListView,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Swiper from 'react-native-swiper';
import TeamWithProfile from '../component/team/TeamWithProfileSmall';
import Name from '../component/checkpoints/Name';
import SumRate from '../component/checkpoints/SumRate';
import Comment from '../component/checkpoints/Comment';

const { width, height } = Dimensions.get('window');
export default class CheckpointReview extends Component {
    constructor(props) {
        super(props);
        const { state } = this.props.navigation; 
        this.state = {
            isLoading: true,
            id: state.params.id,
            fbId: state.params.fbId,
            score: state.params.score,
            team: state.params.team,
            apiURL: state.params.apiURL,
            name: state.params.name,
            Mission_ID: state.params.Mission_ID,
            imgURL: 'http://journeymission.me/storage',
            Checkpoint_ID: state.params.Checkpoint_ID,
            Mission_Score: state.params.Mission_Score,
            back: state.params.back,
            JoinMission: state.params.JoinMission,
            text: '',
            refreshing: false,
            starCount: 2.5,
        };
    }

    componentDidMount() {
        let checkpointURL = this.state.apiURL + '/Checkpoints?search=id:' + this.state.Checkpoint_ID;
        let checkpointPhotoURL = this.state.apiURL + '/CheckpointPhotos?search=Checkpoint_ID:' + this.state.Checkpoint_ID + '&orderBy=created_at';
        let reviewURL = this.state.apiURL + '/Reviews/' + this.state.Checkpoint_ID + '?with=Profile';
        return fetch(checkpointURL, {
            method: 'GET',
            headers: { Accept: 'application/json' }
             }).then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              checkpoint: responseJson[0],
            });
            fetch(checkpointPhotoURL, {
                method: 'GET',
                headers: { Accept: 'application/json' }
                 }).then((response) => response.json())
              .then((responseJson) => {
                this.setState({
                  checkpointPhoto: responseJson.data[0].Checkpoint_Photo,
                });
                this.setState({
                    checkpoint_Photo: this.state.imgURL + '/checkpoint/' + this.state.checkpointPhoto,
                });
                fetch(reviewURL, {
                    method: 'GET',
                    headers: { Accept: 'application/json' }
                     }).then((response) => response.json())
                  .then((responseJson) => {
                    let review = new ListView.DataSource({
                        rowHasChanged: (r1, r2) => r1 !== r2
                    });
                    this.setState({
                        Review: review.cloneWithRows(responseJson.data),
                        rate: responseJson.rate,
                        rateShow: responseJson.rateShow,
                        count: responseJson.count,
                        isLoading: false,
                    });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            console.error(error);
          });
          
      }
      
      onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
        this.refs.mySwiper.scrollBy(1);
      }

      _onRefresh() {
        this.setState({
            refreshing: true,
            isLoading: true
        });
        fetchData().then(() => {
            this.setState({refreshing: false});
          });
      }

      sendVar() {
        const {state} = this.props.navigation;
        const variable = {
            id: state.params.id,
            fbId: state.params.fbId,
            team: state.params.team,
            apiURL: state.params.apiURL,
            name: state.params.name,
            Mission_ID: state.params.Mission_ID,
            score: state.params.score,
            Mission_Score: state.params.Mission_Score,
            back: this.state.back
        };
        return variable;
    }

    sendVartoCheckpoint(Checkpoint_ID) {
        const {state} = this.props.navigation;
        const variable = this.sendVar();
        variable['Mission_ID'] = state.params.Mission_ID;
        variable['Checkpoint_ID'] = Checkpoint_ID;
        variable['JoinMission'] = this.state.JoinMission;
        variable['back'] = this.state.back;
        return variable;
    }

    checkNull(){
        if (this.state.count > 0) {
            return (
                <View style={styles.DescComment}>
                    <SumRate rate={this.state.rate} rateShow={this.state.rateShow} count={this.state.count} />
                    <View style={styles.line} />
                    <ListView
                    style={styles.comment}
                    refreshControl={
                        <RefreshControl
                          refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh.bind(this)}
                        />
                      }
                    dataSource={this.state.Review}
                    renderRow={(rowData) => 
                    
                    <Comment 
                        fbId={rowData.profile.Profile_ProviderID}
                        team={rowData.profile.Profile_Team}
                        name={rowData.profile.Profile_Name}
                        comment={rowData.Review_Content}
                        rate={rowData.Review_Rate}
                    />} />
                </View>
            );
        }
        return (
            <View style={styles.DescComment}>
                <Text> No Review Data </Text>
            </View>
        );
    }
    Comment(){
        let URL = this.state.apiURL + '/Reviews?Checkpoint_ID=' + this.state.Checkpoint_ID + '&Profile_ID=' + this.state.id + '&Review_Content=' + this.state.text + '&Review_Rate=' + this.state.starCount;
        let reviewURL = this.state.apiURL + '/Reviews/' + this.state.Checkpoint_ID + '?with=Profile';
        console.log(URL);
        if(this.state.starCount !== 0 || this.state.text !== ''){
            fetch(URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json'
                }
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    text: '',
                    starCount: 2.5,
                }, () => {
                    alert('Comment Save');
                });
                fetch(reviewURL, {
                    method: 'GET',
                    headers: { Accept: 'application/json' }
                     }).then((response) => response.json())
                  .then((responseJson) => {
                    let review = new ListView.DataSource({
                        rowHasChanged: (r1, r2) => r1 !== r2
                    });
                    this.setState({
                        Review: review.cloneWithRows(responseJson.data),
                        rate: responseJson.rate,
                        rateShow: responseJson.rateShow,
                        count: responseJson.count,
                        isLoading: false,
                    });
                    this.refs.mySwiper.scrollBy(-1);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
    
            }).catch((error) => {
                console.error(error);
            });
        }else{
            alert('Please Rate or Comment Before Submit.');
        }
    }

    skip() {
        this.setState({
            starCount: 0,
        });
        this.refs.mySwiper.scrollBy(1);
    }
    render() {
        const { navigate } = this.props.navigation;
        if (this.state.isLoading) {
            return (
                < ActivityIndicator />
            );
        } else {
            return (
            <View style={styles.container}>
            <ScrollView>
                <View style={styles.nav}>
                    <View>
                        <TouchableOpacity onPress={() => navigate('MissionDetail', this.sendVar())}>
                            <Image style={styles.navBack} source={require('../img/rc_btt_back.png')} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.navTitle} />
                    <View />
                </View>
                <Image style={styles.CheckpointPhoto} source={{ uri: this.state.checkpoint_Photo }} />
                <View style={styles.CheckpointMenu}>
                <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('CheckpointDetail', this.sendVartoCheckpoint(this.state.Checkpoint_ID))}>
                <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                    <Text style={styles.normalText}>Checkin</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => navigate('CheckpointLocation', this.sendVartoCheckpoint(this.state.Checkpoint_ID))}>
                <View style={[styles.CheckpointMenuBtn, styles.normal]}>
                    <Text style={styles.normalText}>Location</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
                <View style={[styles.CheckpointMenuBtn, styles.active]}>
                    <Text>Review</Text>
                </View>
            </TouchableOpacity>
                </View>
                <View style={styles.Desc}>
                <View style={styles.checkpoint}>
                    <View style={styles.checkpointContent}>
                        <View style={styles.checkpointRow}>
                            <Name Checkpoint_Name={this.state.checkpoint.Checkpoint_Name} />
                        </View>
                        <Swiper 
                    ref='mySwiper'
                    style={styles.warpper}
                    dot={< View />}
                    activeDot={< View />}
                    loop={false} 
                    height={height * 0.3}
                    showsButtons={true} 
                    nextButton={<View />}
                    prevButton={<Text style={{color:'#888',fontSize: 30}}>‹</Text>}
                        >
                    <View style={styles.slide}>
                        <TeamWithProfile fbId={this.state.fbId} team={this.state.team} />
                        <Text style={[styles.name, this.state.team === 'fox' ? styles.foxColor : styles.bearColor]}>{this.state.name}</Text>
                        <Text style={styles.Ratethis}>Rate this Checkpoint</Text>
                        <View style={styles.StarRow}>
                        <StarRating
        disabled={false}
        maxStars={5}
        emptyStar={require('../img/ch_rt_star1-gray-01.png')}
        fullStar={require('../img/ch_rt_star1-yellow-01.png')}
        halfStar={require('../img/ch_rt_star1-yellow-01.png')}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
        buttonStyle={styles.Star}
        starSize={30}
      />
                        </View>
                        <View style={styles.btnRow}>
                            <TouchableHighlight onPress={() => this.skip()}>
                            <Text>Skip</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={styles.slide}>
                    <Text style={styles.Ratethis}>Add comment...</Text>
                        <View style={styles.StarRow}>
                            <TextInput style={styles.input} editable={true} multiline={true} numberOfLines={4} onChangeText={(text) => this.setState({text})}
         value={this.state.text} />
                        </View>
                        <View style={styles.submitRow}>
                            <TouchableOpacity onPress={() => this.Comment()}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Swiper>
                    </View>  
                </View>
            </View>
            
                    {this.checkNull()}
                
            </ScrollView>
            </View>
        );
    }
      }
      
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#FFF',
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
            alignItems: 'center',
        },
        navBack: {
            width: width * 0.07,
            height: height * 0.07,
        },
        CheckpointPhoto: {
            backgroundColor: '#E3EF6F',
            height: height * 0.37,
            width: width,
            justifyContent: 'center',
            alignItems: 'center'
        },
        Desc: {
            flex: 5,
            width: width,
            backgroundColor: '#E8E7C5'
        },
        CheckpointMenu: {
            width: width,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: 35,
            marginTop: (-1) * (height * 0.07),
        },
        CheckpointMenuBtn: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            width: width / 3,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        normalText: {
            color: '#FFF',
        },
        normal: {
            backgroundColor: '#7C7C65',
            flex: 1,
        },
        active: {
            backgroundColor: '#FFF',
            flex: 1,
        },
        checkpointContent: {
            width: width,
            flexDirection: 'column',
            
            marginTop: 10
        },
        checkpointRow: {
            flexDirection: 'row',
            marginBottom: 5,
            paddingLeft: 20,
        },
        warpper: {
            height: height * 0.3,
        },
        slide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: width,
        },
        name: {
            fontSize: 15,
            fontWeight: 'bold',
            paddingBottom: 2,
        },
        foxColor: {
            color: '#554126',
        },
        BearColor: {
            color: '#F15A24',
        },
        Ratethis: {
            fontSize: 15,
            paddingBottom: 5,
        },
        Star: {
            marginLeft: 5,
        },
        StarRow: {
            flexDirection: 'row',
            marginBottom: 10,
        },
        btnRow: {
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            marginBottom: 10,
            width: width * 0.8
        },
        submitRow: {
            flexDirection: 'column',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            width: width,
            marginLeft: -30,
        },
        input: {
            backgroundColor: '#FFF',
            width: width * 0.8,
            marginBottom: 5,
        },
        DescComment: {
            flex: 5,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
        },
        line: {
            backgroundColor: '#000',
            width: width * 0.8,
            height: 1,
            marginTop: 10,
            marginBottom: 10,
        }
      });
      
    
AppRegistry.registerComponent('CheckpointReview', () => CheckpointReview);
