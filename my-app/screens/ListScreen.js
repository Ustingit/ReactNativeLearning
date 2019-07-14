//list of sorted compamies with opportunity to subscribe some
import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';


class ListScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>List of the companies!</Text>
      </View>
    );
  }
}