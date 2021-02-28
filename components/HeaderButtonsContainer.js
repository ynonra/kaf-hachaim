import React from 'react';
import { View } from 'react-native';
import { rtlView } from '../styles/styles';
import HeaderMenuBtn from './HeaderMenuBtn';
import HeaderSettingsBtn from './HeaderSettingsBtn';
import HeaderShareBtn from './HeaderShareBtn';

const HeaderButtonsContainer = ({ buttonsData }) => {
  const buttonsDic = {
    menu: (props) => <HeaderMenuBtn {...props} />,
    share: (props) => <HeaderShareBtn {...props} />,
    settings: (props) => <HeaderSettingsBtn {...props} />,
  };

  return (
    <View style={rtlView}>
      {buttonsData.map((buttonData) =>
        buttonsDic[buttonData.type]({
          key: Math.random(),
          onPress: buttonData.onPress,
        })
      )}
    </View>
  );
};

export default HeaderButtonsContainer;
