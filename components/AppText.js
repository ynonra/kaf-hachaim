import React from 'react';
import {Text} from 'react-native';
import {rtlText} from '../styles/styles';

const AppText = ({children, bold, ...props}) => {
  return (
    <Text
      {...props}
      style={[
        {fontFamily: bold ? 'Alef-Bold' : 'Alef', color: '#111'},
        rtlText,
        props.style,
      ]}>
      {children}
    </Text>
  );
};

export default AppText;
