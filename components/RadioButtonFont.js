import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {UserPreferencesContext} from '../context/theme';

import AppText from './AppText';

const RadioButtonFont = ({fontNameHeb, fontNameEn}) => {
  const {userPreferences, setUserPreferences} = React.useContext(
    UserPreferencesContext,
  );
  const {fontFamily, theme} = userPreferences;

  function changeFontFamilyHandler(fontFamily) {
    setUserPreferences({...userPreferences, fontFamily});
  }

  return (
    <TouchableOpacity onPress={() => changeFontFamilyHandler(fontNameEn)}>
      <View
        style={[
          styles.radioButtonContainer,
          fontFamily === fontNameEn ? styles.activeRadioButtonContainer : {},
        ]}>
        <AppText style={[{color: theme.color, fontFamily: fontNameEn}]}>
          {fontNameHeb}
        </AppText>
        <RadioButton
          value={fontNameEn}
          status={fontFamily === fontNameEn ? 'checked' : 'unchecked'}
          onPress={() => changeFontFamilyHandler(fontNameEn)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // radioButtonsContainer: {
  //   ...rtlView,
  //   justifyContent: 'space-around',
  //   flex: 1,
  // },
  radioButtonContainer: {
    alignItems: 'center',
    marginBottom: -15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8b000011',
    width: 60,
  },
  activeRadioButtonContainer: {
    borderColor: '#8b000055',
  },
});

export default RadioButtonFont;
