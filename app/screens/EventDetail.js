// @flow

import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import type { Event } from '../models';

type Props = {
  navigation: {
    state: {
      params: {
        event: Event
      }
    }
  }
};

type State = {};

class EventDetail extends Component<Props, State> {
  static navigationOptions = ({ navigation }: any) => ({
    title: navigation.state.params.event.name
  });

  render() {
    const { event } = this.props.navigation.state.params;
    return (
      <ScrollView>
        <Text>{JSON.stringify(event)}</Text>
      </ScrollView>
    );
  }
}

export default EventDetail;
