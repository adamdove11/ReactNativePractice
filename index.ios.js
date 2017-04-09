/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';
import PlaceMap from './place_map';




export default class ReactNativePractice extends Component {
  /*render() {
    return (
      <View style={styles.container}>
        <MapView style={styles.map}
        initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}/>
      </View>
    );
  }*/

  constructor() {
    super();
    this.state = {
      selectedTab: 0,
      annotations: [
        {
          title: 'Smithsonian Museum',
          latitude: 38.8980,
          longitude: -77.0230
        },
        {
          title: 'UMCP',
          latitude: 38.9869,
          longitude: -76.9426
        },
        {
          title: 'Arlington',
          latitude: 38.8783,
          longitude: -77.0687
        }
      ]
    };
  }

handleTabPress(tab) {
  this.setState({ selectedTab: tab })
}

  render() {
    return (
    <TabBarIOS>
  <TabBarIOS.Item
    systemIcon="favorites"
    selected={this.state.selectedTab === 0}
    onPress={this.handleTabPress.bind(this, 0)}
  >
    <PlaceMap annotations={this.state.annotations} />
  </TabBarIOS.Item>
  <TabBarIOS.Item
    title="Place"
    icon={require('./assets/pin.png')}
    selected={this.state.selectedTab === 1}
    onPress={this.handleTabPress.bind(this, 1)}
  >
    <View style={styles.view}>
      <Text style={styles.text}>Add Place</Text>
    </View>
  </TabBarIOS.Item>
</TabBarIOS>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  text: {
    textAlign: 'center',
    color: '#333333',
    marginTop: 50,
  },
  view: {
    backgroundColor: '#fed',
    flex: 1
  }
});

AppRegistry.registerComponent('ReactNativePractice', () => ReactNativePractice);
