// @flow

import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';
import { AuthConsumer } from '../auth';
import { getDepartment } from '../models';

type Props = {};

class Profile extends Component<Props> {
  static navigationOptions = () => ({
    title: 'Make a Difference'
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
                <Text>{getDepartment(currentUser.department)}</Text>
                <Button title="Logout" onPress={logout} />
              </View>
            ) : (
              <View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 150
                  }}
                >
                  <Image
                    source={require('../assets/itera_logo.png')}
                    resizeMode="contain"
                    style={{ width: 250 }}
                  />
                </View>
                <LoginForm onLoginSuccess={login} />
              </View>
            )
          }
        </AuthConsumer>
      </View>
    );
  }
}

export default Profile;
