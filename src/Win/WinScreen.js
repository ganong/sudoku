import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
  winScreen: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
  success: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});


const WinScreen = () => {
  return (
    <View style={styles.winScreen}>
      <Text style={styles.success}>
        Success!!
      </Text>
    </View>
  );
};
WinScreen.propTypes = {};

export default WinScreen;
