import { AppRegistry, YellowBox } from 'react-native';
import App from './app/index';

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Remote debugger is in a background tab'
]);

global.log = value => (console.log(value), value);

AppRegistry.registerComponent('Mad', () => App);
