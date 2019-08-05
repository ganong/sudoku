import { createStackNavigator, createAppContainer } from "react-navigation";

import Home from './Home/HomeScreen';
import Grid from './Grid/GridScreen';
import Win from './Win/WinScreen';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
    },
    Grid: {
      screen: Grid,
    },
    Win: {
      screen: Win,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
