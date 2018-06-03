// @flow

import React, { Component, type Node } from 'react';
import { Animated } from 'react-native';

type Props = {
  children: Node,
  reverse?: boolean,
  style?: mixed
};

type State = {
  animationValue: Animated.Value
};

export default class Fade extends Component<Props, State> {
  state = {
    animationValue: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.spring(this.state.animationValue, {
      toValue: 1,
      useNativeDriver: true
    }).start();
  }

  render() {
    return (
      <Animated.View
        {...this.props}
        style={[
          this.props.style,
          {
            opacity: this.state.animationValue,
            transform: [
              {
                translateX: this.state.animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.props.reverse ? -200 : 200, 0]
                })
              }
            ]
          }
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
