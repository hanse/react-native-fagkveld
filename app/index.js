// @flow

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './screens';
import { AuthProvider } from './auth';

type Props = {};

export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <AuthProvider>
          <Navigator />
        </AuthProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
