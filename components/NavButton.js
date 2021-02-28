import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {Button} from 'react-native-paper';

import AppText from './AppText';

import orahChaim from '../data/orah-chaim.json';
import yoreDea from '../data/yore-dea.json';
import {rtlDirection, rtlText} from '../styles/styles';

const NavButton = ({label, style, seifIndexes, ...props}) => {
  function calcSeifText() {
    const {helekFrom4Turim, simanIndex, seifIndex} = seifIndexes;
    const helek = helekFrom4Turim === 'אורח חיים' ? orahChaim : yoreDea;
    return helek[simanIndex][seifIndex].shulchanArukh
      .replace(/<.+?>/g, ' ')
      .replace(/ +/g, ' ');
  }

  return (
    <TouchableHighlight underlayColor="#4A332D15" {...props}>
      <View style={[styles.container, style]}>
        <AppText style={styles.label} bold>
          {label}
        </AppText>
        <AppText style={styles.seifText} numberOfLines={2}>
          {calcSeifText()}
        </AppText>
      </View>
    </TouchableHighlight>
  );
};

export default NavButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  label: {color: '#4A332D', fontSize: 19},
  seifText: {color: '#4A332Daa', fontSize: 16},
});
