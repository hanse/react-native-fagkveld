// @flow

import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import Button from '../components/Button';
import { fetchAuthToken } from '../services/mad';

type Props = {
  onLoginSuccess: (token: string) => void
};

type State = {
  email: string,
  password: string,
  loggingIn: boolean,
  error: ?Error
};

const delay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

export default class LoginForm extends Component<Props, State> {
  state = {
    email: '',
    password: '',
    loggingIn: false,
    error: null
  };

  handleSubmit = async () => {
    if (
      this.state.email.trim() === '' ||
      this.state.password.trim() === '' ||
      this.loggingIn
    ) {
      return;
    }

    try {
      this.setState({ loggingIn: true });
      await delay(1500);
      const token = await fetchAuthToken(this.state.email, this.state.password);
      this.setState({ loggingIn: false });
      this.props.onLoginSuccess(token);
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', "Who's fault might it be?");
      this.setState({ error, loggingIn: false });
    }
  };

  render() {
    return (
      <View style={styles.loginForm}>
        <TextInput
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.input}
          placeholder="Email"
        />

        <View style={styles.divider} />

        <TextInput
          autoCapitalize="none"
          value={this.state.password}
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          style={styles.input}
          placeholder="Password"
        />

        <Button
          title="Login"
          onPress={this.handleSubmit}
          loading={this.state.loggingIn}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontSize: 16
  },
  loginForm: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#bbb',
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 15
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc'
  }
});
