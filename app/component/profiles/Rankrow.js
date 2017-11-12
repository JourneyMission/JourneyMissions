import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    Image,
    Text,
} from 'react-native';
import TeamWithProfileSmall from '../../component/team/TeamWithProfileSmall';

const {width, height} = Dimensions.get('window');
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rank: this.props.rank,
            team: this.props.team,
            fbId: this.props.fbId,
            name: this.props.name,
            score: this.props.score,
        };
    }

    checkRank(rank) {
        if (rank === 1) {
            return (<Image style={styles.rankImg} source={require('../../img/rk_rank_1.png')}/>);
        } else if (rank === 2) {
            return (<Image style={styles.rankImg} source={require('../../img/rk_rank_2.png')}/>);
        } else if (rank === 3) {
            return (<Image style={styles.rankImg} source={require('../../img/rk_rank_3.png')}/>);
        }
        return (
            <Text>{rank}</Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
            <View style={styles.rankRow}>
                <View style={styles.RankBlock}>
                    {this.checkRank(this.state.rank)}
                </View>
                    <View style={styles.PhotoBlock}>
                        <TeamWithProfileSmall
                            team={this.state.team}
                            fbId={this.state.fbId} />
                    </View>
                    <View style={styles.NameBlock}>
                        <Text style={styles.text}>{this.state.name}</Text>
                    </View>
                <View style={styles.ScoreBlock}>
                    <Text style={styles.text}>{this.state.score}</Text>
                </View>
            </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        width: width,
        justifyContent: 'flex-start',
        marginLeft: 5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    rankRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    NameBlock: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: width * 0.5
    },
    RankBlock: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.12
    },
    PhotoBlock: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: width * 0.18
    },
    ScoreBlock: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: width * 0.15
    },
    rankImg: {
        width: width * 0.075,
        height: width * 0.075,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 15,
    }

});

AppRegistry.registerComponent('Profile', () => Profile);
