import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';


const { width } = Dimensions.get('window');
export default class TeamWithProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: this.props.team,
            fbPhotoURL: 'https://graph.facebook.com/' + this.props.fbId + '/picture?type=large',
        };
    }

    componentDidMount() {
        Image.prefetch(this.state.fbPhotoURL);
    }

    getPhoto(fbPhotoURL){
        return (<Image style={styles.avatar} source={{ uri: fbPhotoURL }} />
        );

    }

    checkTeam(team, fbPhotoURL) {
        if (team === 'fox') {
            return (
                <Image style={styles.teammask} source={require('../../img/mm_team_fox.png')} >
                {this.getPhoto(fbPhotoURL)}
                </Image>
            );
        } else if (team === 'bear') {
            return (
                <Image style={styles.teammask} source={require('../../img/mm_team_bear.png')} >
                 {this.getPhoto(fbPhotoURL)}
                 </Image>
            );
        }
        return this.getPhoto(fbPhotoURL);
        
    }

  render() {
    return (
        <View style={styles.container}>
            { this.checkTeam(this.state.team, this.state.fbPhotoURL) }
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },
    avatar: {
        width: width * 0.15,
        height: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: width * 0.15,
        zIndex: -100,
    },
    teammask: {
        width: width * 0.15,
        height: width * 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
  });

AppRegistry.registerComponent('TeamWithProfile', () => TeamWithProfile);