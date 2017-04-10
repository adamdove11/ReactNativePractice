import React, { Component } from 'react';
import {
  MapView,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  AlertIOS,
  Linking
} from 'react-native';

export default class PlaceMap extends Component {
  constructor(props) {
    super(props);
    this.region = {
      latitude: 38.8977,
      longitude: -77.0365,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
      title: "White House"
    }
  }

    handleNavigation(la, lo) {
    const rla = this.region.latitude;
    const rlo = this.region.longitude;
    const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
    return Linking.openURL(url);
  }

  render() {
    const { annotations } = this.props;
    annotations.forEach(annotation => {
      annotation.rightCalloutView = (
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleNavigation.bind(this, annotation.latitude, annotation.longitude)}
        >
          <Text style={styles.buttonText}>Navigation</Text>
        </TouchableHighlight>
      );
    })
    return (
      <MapView
        style={styles.map}
        region={this.region}
        annotations={this.props.annotations}
      />
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});