import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import { resetGrid } from '../Grid/duck';


const styles = StyleSheet.create({
  winScreen: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'space-around',
  },
  success: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});


class WinScreen extends React.Component {
  componentDidMount() {
    this.props.resetGrid();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.winScreen}>
        <Text style={styles.success}>
          Boo-Yah!!
        </Text>
        <Button 
          title="Home"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    );
  }
};
WinScreen.propTypes = {};

const mapStateToProps = state => ({});
const mapDispatchToProps = {
  resetGrid,
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(WinScreen));
