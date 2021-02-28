import React from 'react';
import {IconButton} from 'react-native-paper';

const HeaderSettingsBtn = ({onPress}) => {
  return <IconButton color="#fff" icon="cog" onPress={onPress} />;
};

export default HeaderSettingsBtn;
