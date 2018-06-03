// @flow

import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  Animated
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
  loading: boolean,
  scrollY: Animated.Value,
  width: number,
  height: number
};

const Divider = () => (
  <View style={{ height: StyleSheet.hairlineWidth, backgroundColor: '#ddd' }} />
);

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

class Events extends Component<Props, State> {
  state = {
    events: [],
    loading: false,
    scrollY: new Animated.Value(0),
    width: 0,
    height: 0
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.fetchData();
    }
  }

  fetchData = async () => {
    this.setState({ loading: true });
    try {
      const events = await fetchEvents(this.props.token);
      this.setState({ events, loading: false });
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  keyExtractor = item => `${item.id}`;

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight
        onPress={() =>
          this.props.navigation.navigate('EventDetail', { event: item })
        }
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
        <AnimatedFlatList
          data={this.state.events}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={Divider}
          scrollEventThrottle={1}
          onContentSizeChange={(width, height) => {
            this.setState({ width, height });
          }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true }
          )}
        />
        {this.state.height && (
          <Animated.View
            style={{
              width: this.state.width,
              height: 6,
              backgroundColor: '#CC0B11',
              borderRadius: 3,
              marginVertical: 5,
              transform: [
                {
                  scaleX: this.state.scrollY.interpolate({
                    inputRange: [0, this.state.height / 2],
                    outputRange: [0.05, 1],
                    extrapolate: 'clamp'
                  })
                }
              ]
            }}
          />
        )}
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
