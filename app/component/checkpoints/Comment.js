
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import TeamWithProfile from '../../component/team/TeamWithProfileSmall';


const { width, height } = Dimensions.get('window');
export default class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            star: 3.5,
        };
    }
    rate(){
        if(this.props.rate != null && this.props.rate !== 0){
            return (
                <StarRating
                buttonStyle={styles.StarRow}
                disabled={true}
                maxStars={5}
                emptyStar={require('../../img/ch_rt_star1-gray-01.png')}
                fullStar={require('../../img/ch_rt_star1-yellow-01.png')}
                rating={this.props.rate}
                starSize={10}
              />
            );
        }
    }
    render() {
            return (

                    <View style={styles.Container}>
                        <View style={styles.Column}>
                            <TeamWithProfile fbId={this.props.fbId} team={this.props.team} />
                        </View>
                        <View style={styles.ColumnContent}>
                            <View style={styles.Row}>
                                <Text style={styles.Name}>{this.props.name}</Text>
                            </View>
                            <View style={styles.Row}>
                            {this.rate()}
                            </View>
                            
                            <View style={styles.Row}>
                                <Text style={styles.Comment}>{this.props.comment}</Text>
                            </View>
                        </View>
                    </View>
        );
    }
    }
    const styles = StyleSheet.create({
        StarRow: {
            marginLeft: 5,
        },
        Container: {
            width: width * 0.8,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            marginBottom: 10,
            flex: 1,
        },
        Row: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        Column: {
            paddingRight: 5,
        },
        ColumnContent: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            paddingRight: 5,
            width: width * 0.65,
            flexWrap: 'wrap',
        },
        Name: {
            fontSize: 15,
            fontWeight: 'bold',
            marginLeft: 5
        },
        Comment: {
            fontSize: 14,
            marginLeft: 5
        }
      });
      
    
AppRegistry.registerComponent('Comment', () => Comment);
