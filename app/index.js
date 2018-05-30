// @flow

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Alert } from 'react-native';
import Button from './components/Button';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Make a Difference"
          onPress={() => Alert.alert('Hello!')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
  }
});
