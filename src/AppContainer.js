import { createStackNavigator, createAppContainer } from "react-navigation";

import Grid from './Grid/GridContainer';
import WinScreen from './Win/WinScreen';

const AppNavigator = createStackNavigator(
  {
    Grid: {
      screen: Grid,
    },
    WinScreen: {
      screen: WinScreen,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Grid',
  },
);

export default createAppContainer(AppNavigator);
