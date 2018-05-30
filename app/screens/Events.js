// @flow

import React, { Component } from 'react';
import Button from '../components/Button';

type Props = {};

class Events extends Component<Props> {
  static navigationOptions = () => ({
    title: 'Itera'
  });

  render() {
    return <Button title="Make a Difference" />;
  }
}

export default Events;
