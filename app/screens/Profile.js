// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import Button from '../components/Button';
import LoginForm from '../components/LoginForm';
import Fade from '../components/Fade';
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
              <View style={styles.profileContainer}>
                {currentUser.firstName && (
                  <View>
                    <Fade>
                      <Text style={{ fontSize: 30 }}>
                        {currentUser.firstName} {currentUser.lastName}
                      </Text>
                    </Fade>
                    <Fade
                      reverse
                      style={{ alignItems: 'flex-start', paddingTop: 10 }}
                    >
                      <View style={styles.badge}>
                        <Text style={{ fontSize: 16, fontWeight: '700' }}>
                          {getDepartment(currentUser.department)}
                        </Text>
                      </View>
                    </Fade>
                  </View>
                )}
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

const styles = StyleSheet.create({
  badge: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: 'white',
    // iOS
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: '#111',
    shadowRadius: 6,
    shadowOpacity: 0.1,
    // Android
    elevation: 2
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch' // default value
  }
});

export default Profile;
