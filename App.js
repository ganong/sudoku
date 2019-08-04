import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import NavigationService from './src/navigationService';

import AppContainer from './src/AppContainer';


function App() {
  return (
    <Provider store={store}>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
}

export default App;
