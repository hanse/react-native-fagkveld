// @flow

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './screens';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
