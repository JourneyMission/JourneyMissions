
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

const { width, height } = Dimensions.get('window');
export default class SumRate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
        };
    }

    render() {
            return (

                    <View style={styles.SumRate}>
                        <View style={styles.Column}>
                            <Text style={styles.RateNumber}>{this.props.rate}</Text>
                        </View>
                        <View style={styles.Column}>
                            <View style={styles.StarRow}>
                            <StarRating
        buttonStyle={styles.StarRow}
        disabled={true}
        maxStars={5}
        emptyStar={require('../../img/ch_rt_star1-gray-01.png')}
        fullStar={require('../../img/ch_rt_star1-yellow-01.png')}
        halfStar={require('../../img/ch_rt_star1-yellow-01.png')}
        rating={this.props.rateShow}
        starSize={25}
      />
                            </View>
                            <View style={styles.Row}>
                                <Text style={styles.RateCount}>{this.props.count}</Text>
                                <Image style={styles.numberofrating} source={require('../../img/number_of_rating.png')} />
                            </View>
                        </View>
                    </View>
        );
    }
    }
    const styles = StyleSheet.create({
        StarRow: {
            marginLeft: 1,
        },
        SumRate: {
            width: width * 0.8,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        Row: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        Column: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
        },
        RateNumber: {
            fontSize: 30,
        },
        RateCount: {
            fontSize: 10,
            marginLeft: 5
        },
        numberofrating: {
            width: 10,
            height: 10,
            marginLeft: 5,
        }
      });
      
    
AppRegistry.registerComponent('SumRate', () => SumRate);
