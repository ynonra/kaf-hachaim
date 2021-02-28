import React from 'react';
import {I18nManager, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FAB = ({left, style, label, small, icon, ...props}) => {
  const dirStyle = left
    ? I18nManager.isRTL
      ? {left: 20}
      : {right: 20}
    : !I18nManager.isRTL
    ? {left: 20}
    : {right: 20};

  return (
    <View style={[styles.container, dirStyle, style]} {...props}>
      <Icon name={icon} color="#fff" />
      <Text>{label}</Text>
    </View>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 25,
    height: 50,
    backgroundColor: '#eebd3d',
    padding: 20,
  },
});
