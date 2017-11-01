import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    Dimensions,
    Text,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default class JoinBtn extends Component {
    constructor(props) {
        super(props);
    }
    

    render() {
        return (
            <View style={styles.navBtn}>
                <Text style={styles.navBtnText}>{this.props.Status ?  'Quit' : 'Join'}</Text>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    navBtn: {
        borderWidth: 2,
        borderColor: '#165A45',
        width: width * 0.2,
        alignItems: 'center',
        borderRadius: 50
    },
    navBtnText: {
        color: '#165A45',
        fontWeight: 'bold'
    },
});

AppRegistry.registerComponent('JoinBtn', () => JoinBtn);
