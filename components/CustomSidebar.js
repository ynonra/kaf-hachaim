import React, {useContext} from 'react';
import {View, Text, StyleSheet, I18nManager} from 'react-native';
import {Switch} from 'react-native-paper';
import SideMenu from 'react-native-side-menu-updated';
import sideMenuStyles from 'react-native-side-menu-updated/build/styles';
import Slider from '@react-native-community/slider';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import RadioButtonFont from './RadioButtonFont';
import AppText from './AppText';
import SidebarItem from './SidebarItem';

import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {theme as themeData, UserPreferencesContext} from '../context/theme';

import {rtlText, rtlView} from '../styles/styles';

if (I18nManager.isRTL) {
  SideMenu.prototype.render = function render() {
    const menu = <View style={sideMenuStyles.menu}>{this.props.menu}</View>;

    return (
      <View style={sideMenuStyles.container} onLayout={this.onLayoutChange}>
        {menu}
        {this.getContentView()}
      </View>
    );
  };
}

const CustomSidebar = ({
  children,
  isOpen,
  onClose,
  setBookmarkDialogOpen,
  setIsMistakeReportMode,
  setReportSnackbarOpen,
}) => {
  const {userPreferences, setUserPreferences} = useContext(
    UserPreferencesContext,
  );
  const theme = userPreferences.theme;
  // const navigation = useNavigation();
  const windowWidth = useWindowDimensions().width;

  function changeFontSizeHandler(fontSize) {
    setUserPreferences({...userPreferences, fontSize});
  }

  function toggleTheme() {
    const theme =
      userPreferences.theme.backgroundColor === themeData.light.backgroundColor
        ? themeData.dark
        : themeData.light;

    setUserPreferences({...userPreferences, theme});
  }

  function startMistakeReportMode() {
    setReportSnackbarOpen(true);
    onClose();
    setIsMistakeReportMode(true);
  }

  const menu = (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.sidebarBackgroundColor,
          width: (windowWidth * 2) / 3,
        },
      ]}>
      <SidebarItem
        onPress={() => setBookmarkDialogOpen(true)}
        icon={
          <MaterialCommunityIcon
            name="bookmark-plus"
            size={24}
            color={theme.color}
          />
        }>
        <AppText style={[styles.listItemButtonText, {color: theme.color}]}>
          צור סימנייה
        </AppText>
      </SidebarItem>
      <SidebarItem
        onPress={startMistakeReportMode}
        icon={<MaterialIcon name="report" size={24} color={theme.color} />}>
        <AppText style={[styles.listItemButtonText, {color: theme.color}]}>
          דווח על שגיאה
        </AppText>
      </SidebarItem>
      <SidebarItem>
        <AppText style={{color: theme.color}}>מצב חשוך</AppText>
        <Switch
          value={theme == themeData.dark}
          style={[styles.switch]}
          onValueChange={toggleTheme}
          color="#783D21"
        />
      </SidebarItem>
      <SidebarItem>
        <AppText style={{color: theme.color}}>גודל כתב</AppText>
        <Slider
          minimumValue={10}
          maximumValue={30}
          step={2}
          inverted={I18nManager.isRTL}
          style={{width: 100, marginRight: 7}}
          value={20}
          onValueChange={changeFontSizeHandler}
          minimumTrackTintColor="#783D21"
          thumbTintColor="#111"
        />
      </SidebarItem>
      <SidebarItem
        style={{
          flexDirection: 'column',
          alignItems: 'stretch',
          height: 90,
        }}>
        <AppText style={[{color: theme.color, marginBottom: 5}, rtlText]}>
          סוג גופן
        </AppText>
        <View style={styles.radioButtonsContainer}>
          <RadioButtonFont fontNameEn="TaameyFrankCLM" fontNameHeb="פראנק" />
          <RadioButtonFont fontNameEn="Assistant" fontNameHeb="אסיסטנט" />
          <RadioButtonFont fontNameEn="Alef" fontNameHeb="אלף" />
          {/* <RadioButtonFont fontNameEn="Shofar" fontNameHeb="שופר" /> */}
        </View>
      </SidebarItem>
    </View>
  );
  return (
    <SideMenu
      menu={menu}
      menuPosition="right"
      isOpen={isOpen}
      onChange={(isOpen) => !isOpen && onClose()}
      overlayColor="#0005"
      bounceBackOnOverdraw={false}
      edgeHitWidth={0}>
      {children}
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    // width: 240,
    // ...rtlDirection,
  },
  switch: {
    marginRight: 10,
  },
  radioButtonsContainer: {
    ...rtlView,
    justifyContent: 'space-around',
    flex: 1,
    // backgroundColor: 'red',
  },
  radioButtonContainer: {
    alignItems: 'center',
    // padding: 5,
    // paddingBottom: 0,
    marginBottom: -15,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#8b000011',
    width: 60,
  },
  activeRadioButtonContainer: {
    // backgroundColor: '#ecd8d1',
    // borderWidth: 1,
    borderColor: '#8b000055',
  },
  listItemButton: {
    height: 40,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemButtonText: {
    fontSize: 18,
  },
});

export default CustomSidebar;
