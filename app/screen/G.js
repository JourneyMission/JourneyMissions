import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  Navigator,
  StyleSheet,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position : {
          coords: {
            latitude: 0,
            longitude: 0
          }
      }
  }
}

componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({position});
        },
        (error) => alert(error.message),
        {enableHighAccuracy: true, timeout: 20000}
    );
    navigator.geolocation.watchPosition((position) => {
        this.setState({position});
    });
}

  render() {
    console.log(this.state.position.coords.latitude);
    console.log(this.state.position.coords.longitude);
    return (
      <View>
        <MapView style = {styles.map}
        region={{
          latitude: this.state.position.coords.latitude,
          latitudeDelta: 0.001,
          longitude: this.state.position.coords.longitude,
          longitudeDelta: 0.001
        }} />
      </View>
    );
  }
}

Map.propTypes = {
  provider: MapView.ProviderPropType
};

const styles = StyleSheet.create({
  map: {
      flex: 1,
  },
});