// @flow

import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

const EventsNavigator = createStackNavigator({
  Index: {
    getScreen: () => require('./Events').default
  },
  EventDetail: {
    getScreen: () => require('./EventDetail').default
  }
});

const ProfileNavigator = createStackNavigator({
  Index: {
    getScreen: () => require('./Profile').default
  }
});

const TabNavigator = createBottomTabNavigator(
  {
    Events: {
      screen: EventsNavigator,
      navigationOptions: {
        tabBarLabel: 'Events'
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        tabBarLabel: 'Profile'
      }
    }
  },
  {
    initialRouteName: 'Events'
  }
);

export default TabNavigator;
