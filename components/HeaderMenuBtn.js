import React, {useContext, useState} from 'react';
import {IconButton, Menu, Divider} from 'react-native-paper';
import {headerButtonStyle, rtlDirection, rtlText} from '../styles/styles';
import {useNavigation} from '@react-navigation/native';

const HeaderMenuBtn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();

  function openMenu() {
    setIsOpen(true);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  const button = (
    <IconButton color="#fff" icon="dots-vertical" onPress={openMenu} />
  );

  return (
    <Menu
      style={rtlDirection}
      visible={isOpen}
      onDismiss={closeMenu}
      anchor={button}>
      <Menu.Item
        onPress={() => {
          navigation.navigate('Home');
          closeMenu();
        }}
        titleStyle={rtlText}
        title="תפריט ראשי"
      />
      <Menu.Item
        onPress={() => {
          navigation.navigate('Table-of-Contents');
          closeMenu();
        }}
        titleStyle={rtlText}
        title="תוכן עניינים"
      />
      <Menu.Item
        onPress={() => {
          navigation.navigate('Bookmarks');
          closeMenu();
        }}
        titleStyle={rtlText}
        title="סימניות"
      />
      <Menu.Item
        onPress={() => {
          navigation.navigate('LastVisited');
          closeMenu();
        }}
        titleStyle={rtlText}
        title="נקראו לאחרונה"
      />
      <Menu.Item
        onPress={() => {
          navigation.navigate('About');
          closeMenu();
        }}
        titleStyle={rtlText}
        title="אודות"
      />
    </Menu>
  );
};

export default HeaderMenuBtn;
