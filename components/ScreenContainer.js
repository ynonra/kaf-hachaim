import React from 'react';
import { StyleSheet, View } from 'react-native';

const ScreenContainer = ({ children, style, props }) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdf5e6',
    flex: 1,
  },
});
