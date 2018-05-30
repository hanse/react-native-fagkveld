// @flow

import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';
import { AuthConsumer } from '../auth';

type Props = {};

class Profile extends Component<Props> {
  static navigationOptions = () => ({
    title: 'Min Profil'
  });

  render() {
    return (
      <View style={{ padding: 20 }}>
        <AuthConsumer>
          {({ token, login, logout, currentUser }) =>
            token !== null ? (
              <View>
                <Text style={{ fontSize: 30 }}>
                  {currentUser.firstName} {currentUser.lastName}
                </Text>
                <Text>{currentUser.department}</Text>
                <Button title="Logout" onPress={logout} />
              </View>
            ) : (
              <LoginForm onLoginSuccess={login} />
            )
          }
        </AuthConsumer>
      </View>
    );
  }
}

export default Profile;
