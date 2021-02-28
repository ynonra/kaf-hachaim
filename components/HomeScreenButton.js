import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {rtlView} from '../styles/styles';

const HomeScreenButton = ({children, style, iconName, ...props}) => {
  return (
    <Button
      style={[styles.container, style]}
      {...props}
      contentStyle={[styles.content, rtlView]}
      labelStyle={styles.label}
      icon={iconName}>
      {children}
    </Button>
  );
};

export default HomeScreenButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 5,
    borderColor: '#f4a460',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#f3ddca',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    paddingVertical: 10,
  },
  label: {
    fontSize: 19,
    color: 'black',
  },
});
