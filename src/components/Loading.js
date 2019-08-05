import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
  loading: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
  },
});

const Loading = () => (
  <View style={styles.loading}>
      <Text>
        Loading...
      </Text>
    </View>
);

export default Loading;
