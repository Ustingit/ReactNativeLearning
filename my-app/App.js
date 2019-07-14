/*import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
 });   */

import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import { Location, Permissions } from "expo";

import { getWeather } from "./api/Api";

export default class App extends React.Component {
  state = {
    weatherData: [],
    loading: false
  };

  async componentWillMount() {
    this.setState({
      loading: true
    });

    await this._getLocation();

    const lat = this.state.location.coords.latitude;
    const lon = this.state.location.coords.longitude;

    const weatherData = await getWeather(lat, lon);

    this.setState({
      weatherData,
      loading: false
    });
  }

  async _getLocation() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      console.error("Not granted! Uh oh. :(");
    }

    const location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  }

  render() {
    const { weather, main } = this.state.weatherData;

    if (this.state.loading) {
      return (
        <ImageBackground
          style={styles.background}
          source={require("./assets/wait.png")}
        >
          <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
          </View>
        </ImageBackground>
      );
    } else {
      return (
        <ImageBackground
          style={styles.background}
          source={require("./assets/cosmos.png")}
        >
          <View style={styles.container}>
            <View style={styles.weatherCard}>
              <Text style={styles.text}>45°C</Text>
              <Text style={styles.text}>Минск</Text>
            </View>
          </View>
        </ImageBackground>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    color: "white"
  },
  background: {
    width: "100%",
    height: "100%"
  },
  weatherCard: {
    width: 350,
    height: 120,
    borderRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 13,
    padding: 10
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    color: "white"
  }
});