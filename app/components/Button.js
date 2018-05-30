// @flow

import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string,
  style?: mixed
};

// Android should almost always use TouchableNativeFeedback for best experience
// because it support ripples etc.
//
// iOS can use both TouchableHighlight and TouchableOpacity depending
// on there the touchable is and its surroundings.
class Button extends Component<Props> {
  render() {
    return (
      <TouchableOpacity
        {...this.props}
        style={[styles.button, this.props.style]}
        activeOpacity={0.9}
      >
        <Text style={styles.text}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    alignItems: 'center',
    padding: 10
  },
  text: {
    color: '#fff',
    fontSize: 20
  }
});

export default Button;
