import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';

import Grid from './src/Grid/GridContainer';


function App() {
  return (
    <Provider store={store}>
      <Grid />
    </Provider>
  );
}

export default App;
