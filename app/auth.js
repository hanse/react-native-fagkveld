// @flow

import React, { type Node } from 'react';
import { AsyncStorage } from 'react-native';

import { fetchCurrentUser } from './services/mad';

// $FlowFixMe
const AuthContext = React.createContext();

const TOKEN_KEY = '@mad/token';

type Props = {
  children: Node
};

type State = {
  token: ?string,
  currentUser: Object,
  login: (token: string) => void,
  logout: () => void,
  ready: boolean
};

export class AuthProvider extends React.Component<Props, State> {
  handleLogin = (token: string) => {
    this.setState({ token });
  };

  handleLogout = () => {
    this.setState({ token: null });
  };

  state = {
    ready: false,
    token: null,
    currentUser: {},
    login: this.handleLogin,
    logout: this.handleLogout
  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    this.setState({ token, ready: true });
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.state.token && this.state.token !== prevState.token) {
      fetchCurrentUser(this.state.token).then(
        currentUser => {
          AsyncStorage.setItem(TOKEN_KEY, this.state.token);
          this.setState({ currentUser });
        },
        error => {
          // Assume the fetch failed because the token was invalid
          this.setState({ token: null });
        }
      );
    }

    if (prevState.token && !this.state.token) {
      AsyncStorage.removeItem(TOKEN_KEY);
    }
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.state.ready ? this.props.children : null}
      </AuthContext.Provider>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
