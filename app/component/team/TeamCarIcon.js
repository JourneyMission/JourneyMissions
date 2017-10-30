import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';


const { width } = Dimensions.get('window');
export default class TeamCarIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: this.props.team,
        };
    }

    checkTeam(team) {
        if (team === 'fox') {
            return (
                <Image style={styles.CarImg} source={require('../../img/icc_team_fox-01.png')}/>
            );
        } else if (team === 'bear') {
            return (
                <Image style={styles.CarImg} source={require('../../img/icc_team_bear-01.png')}/>
            );
        }
    }

  render() {
    return (
        <View>
            { this.checkTeam(this.state.team, this.state.fbPhotoURL) }
        </View>
    );
  }
}
const styles = StyleSheet.create({
    CarImg: {
        width: 100,
        height: 85
    },
  });

AppRegistry.registerComponent('TeamCarIcon', () => TeamCarIcon);