import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './scr/store';
import AppNavigator from './scr/navigator';
import {Linking, LogBox} from 'react-native';
import {StripeProvider} from '@stripe/stripe-react-native';
import {stripePublishableKey} from './scr/store/util';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

LogBox.ignoreAllLogs(true);

const App: () => Node = () => {
  // useEffect(() => {
  //   Linking.addEventListener('url', url => {
  //     // console.log('navigation object', navigation);
  //   });
  // }, []);

  return (
    <StripeProvider publishableKey={stripePublishableKey}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </StripeProvider>
  );
};

export default App;
