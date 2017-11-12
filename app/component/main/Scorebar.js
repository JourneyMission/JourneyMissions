
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Text,
  ScrollView
} from 'react-native';

const { width, height } = Dimensions.get('window');
export default class Scorebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fox: 0.5,
            bear: 0.5,
            URL: this.props.URL,
          };
    }
    componentDidMount(){
        let URL = this.state.URL + '/TeamScore';
        return fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            }
        }).then((response) => response.json()).then((responseJson) => {
            this.setState({
                bear: responseJson.bear,
                fox: responseJson.fox,
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.bar}>
                    <Image style={styles.bearicon} source={require('../../img/ic_bear.png')} />
                    <View style={styles.barCover}>
                        <View style={[styles.bear, {width: (width * 0.7) * this.state.bear}]} />
                        <View style={[styles.fox, {width: (width * 0.7) * this.state.fox}]} />
                    </View>
                    <Image style={styles.foxicon} source={require('../../img/ic_fox.png')} />
                </View>
            </View>
        );
      }
      
    }
    const styles = StyleSheet.create({
        container: {
            width: width * 0.9,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
        },
        barCover: {
            justifyContent: 'space-around',
            alignItems: 'center',
            width: width * 0.7,
            height: 25,
            flexDirection: 'row',
            backgroundColor: '#CCC',
        },
        foxicon: {
            width: 45,
            height: 40,
            marginTop: -2,
            marginLeft: -15,
        },
        bearicon: {
            width: 45,
            height: 40,
            marginTop: -7,
            marginRight: -15,
            zIndex: 100,
        },
        bear: {
            backgroundColor: '#554126',
            
            height: 25,
        },
        fox: {
            backgroundColor: '#F15A24',
            height: 25,
        },
        bar: {
            flexDirection: 'row',
            alignItems: 'center',
        }
      });
      
    
AppRegistry.registerComponent('Scorebar', () => Scorebar);
