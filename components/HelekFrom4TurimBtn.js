import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import AppText from './AppText';

const HelekFrom4TurimBtn = ({ title, active, setHelekFrom4Turim }) => {
  return (
    <TouchableOpacity
      style={[styles.helekButton, active && styles.helekButtonActive]}
      onPress={() => setHelekFrom4Turim(title)}
    >
      <AppText style={styles.helekButtonText}>{title}</AppText>
    </TouchableOpacity>
  );
};

export default HelekFrom4TurimBtn;

const styles = StyleSheet.create({
  helekButton: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f4a460',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    backgroundColor: '#f3ddca',
  },
  helekButtonText: {
    fontSize: 20,
  },
  helekButtonActive: {
    backgroundColor: '#f4a460',
  },
});
