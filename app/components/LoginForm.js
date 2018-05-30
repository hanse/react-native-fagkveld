// @flow

import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
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
      const token = await fetchAuthToken(this.state.email, this.state.password);
      this.setState({ loggingIn: false });
      this.props.onLoginSuccess(token);
    } catch (error) {
      console.log(error);
      this.setState({ error, loggingIn: false });
    }
  };

  render() {
    return (
      <View>
        {this.state.error && <Text>Could not log in</Text>}
        <TextInput
          autoCapitalize="none"
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
          style={styles.input}
          placeholder="Email"
        />

        <TextInput
          autoCapitalize="none"
          value={this.state.password}
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          style={styles.input}
          placeholder="Password"
        />

        <Button title="Login" onPress={this.handleSubmit} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    fontSize: 16
  }
});
