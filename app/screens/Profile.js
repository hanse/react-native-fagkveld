// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
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
      <View style={{ padding: 20, flex: 1 }}>
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
              <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={Platform.OS === 'android' ? 25 : 0}
                style={{ flex: 1 }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    height: 250
                  }}
                >
                  <Image
                    source={require('../assets/itera_logo.png')}
                    resizeMode="contain"
                    style={{ width: 250 }}
                  />
                </View>
                <LoginForm onLoginSuccess={login} />
              </KeyboardAvoidingView>
            )
          }
        </AuthConsumer>
      </View>
    );
  }
}

export default Profile;
