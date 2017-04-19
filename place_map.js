import React, { Component } from 'react';
import {
  MapView,
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
  AlertIOS,
  Linking,
  Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height 
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO




export default class PlaceMap extends Component {

  

constructor(props) {
    super(props);
    
    this.state = {
      latitude: 0,
      longitude: 0,
      latitude: 0,
      latitudeDelta: 0,
      longitudeDelta: 0,
    }
  }


/*    handleNavigation(la, lo) {
    const rla = this.region.latitude;
    const rlo = this.region.longitude;
    const url = `http://maps.apple.com/?saddr=${rla},${rlo}&daddr=${la},${lo}&dirflg=d`;
    return Linking.openURL(url);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }*/


  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

    this.setState({initialPosition: initialRegion})
    this.setState({markerPosition: initialRegion})
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        longitudeDelta: LONGITUDE_DELTA,
        latitudeDelta: LATITUDE_DELTA
      }

      this.setState({initialPosition: lastRegion})
      this.setState({markerPosition: lastRegion})
    })
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
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
        annotations={this.props.annotations}
        showsUserLocation={true}
        followsUserLocation={true}
        region={this.state.initialPosition}
        showsMyLocationButton={true}
      >
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});