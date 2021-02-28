import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-paper';
import { UserPreferencesContext } from '../context/theme';

import { rtlView } from '../styles/styles';

const SidebarItem = ({ children, style, onPress, icon }) => {
  const { theme } = useContext(UserPreferencesContext).userPreferences;

  let content = (
    <View
      style={[
        styles.listItem,
        rtlView,
        {
          backgroundColor: theme.sidebarBackgroundColor,
        },
        style,
      ]}
    >
      {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
      {children}
    </View>
  );
  if (onPress)
    content = <TouchableOpacity onPress={onPress}>{content}</TouchableOpacity>;

  return (
    <>
      {content}
      <Divider
        style={[styles.divider, { backgroundColor: theme.dividerColor }]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  iconContainer: {
    paddingLeft: 5,
  },
  divider: {
    marginHorizontal: 13,
  },
});

export default SidebarItem;
