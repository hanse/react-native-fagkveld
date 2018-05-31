// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { AuthConsumer } from '../auth';
import { fetchEvents } from '../services/mad';
import type { Token, Event } from '../models';

type Props = {
  token: Token,
  navigation: Object
};

type State = {
  events: Array<Event>,
  loading: boolean
};

const Divider = () => (
  <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#ddd' }} />
);

class Events extends Component<Props, State> {
  state = {
    events: [],
    loading: false
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.fetchData();
    }
  }

  fetchData = () => {
    this.setState({ loading: true });
    fetchEvents(this.props.token).then(
      events => this.setState({ events, loading: false }),
      error => this.setState({ loading: false })
    );
  };

  keyExtractor = item => `${item.id}`;

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() => this.props.navigation.navigate('EventDetail')}
      >
        <View style={{ padding: 15, backgroundColor: '#fff' }}>
          <Text style={{ fontSize: 18 }}>{item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={this.state.events}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={Divider}
        />
      </View>
    );
  }
}

// could be withContext(AuthConsumer)(Events) or something instead
class EventsContainer extends Component<{ navigation: Object }> {
  static navigationOptions = () => ({
    title: 'Itera'
  });

  render() {
    return (
      <AuthConsumer>
        {({ token }) => <Events token={token} {...this.props} />}
      </AuthConsumer>
    );
  }
}

export default EventsContainer;
