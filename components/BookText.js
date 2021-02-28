import React from 'react';
import {Text} from 'react-native';
import {UserPreferencesContext} from '../context/theme';

const BookText = ({children, ...props}) => {
  const {theme, fontFamily, fontSize} = React.useContext(
    UserPreferencesContext,
  ).userPreferences;
  const style = {
    color: theme.color,
    fontFamily: props.bold ? `${fontFamily}-Bold` : `${fontFamily}`,
    fontSize: props.small ? fontSize - 3 : fontSize,
  };

  return (
    <Text {...props} style={[style, props.style]}>
      {children}
    </Text>
  );
};

export default BookText;
