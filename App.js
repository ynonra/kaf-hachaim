import './wdyr';

import React, {useState, useEffect} from 'react';
import RNBootSplash from 'react-native-bootsplash';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  Provider as PaperProvider,
  DefaultTheme,
  configureFonts,
} from 'react-native-paper';
import {useFonts} from 'expo-font';

import HomeScreen from './screens/HomeScreen';
import TableOfContents from './screens/TableOfContents';
import SeifScreen from './screens/SeifScreen';

import {userPreferencesTheme, UserPreferencesContext} from './context/theme';
import {convertNumericIndexToHebrew} from './text-parse-utils/index-convertion';

import BookmarksScreen from './screens/BookmarksScreen';
import LastVisitedScreen from './screens/LastVisitedScreen';
import {getItem, setItem} from './util/async-storage';
import HeaderButtonsContainer from './components/HeaderButtonsContainer';
import AboutScreen from './screens/AboutScreen';

const Stack = createStackNavigator();

const fontStyles = {
  regular: {
    fontFamily: 'Alef',
  },
  medium: {
    fontFamily: 'Alef-Bold',
  },
};

const paperTheme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5D4037',
    accent: '#f1c40f',
  },
  fonts: configureFonts({
    web: fontStyles,
    android: fontStyles,
    ios: fontStyles,
  }),
};

const App = () => {
  const [userPreferences, setUserPreferences] = useState(userPreferencesTheme);
  const [helekFrom4Turim, setHelekFrom4Turim] = useState(null);

  const [loaded, error] = useFonts({Alef: require('./assets/fonts/Alef.ttf')});

  function setAndSaveUserPreferences(data) {
    setItem('user-preferences', data);
    setUserPreferences(data);
  }

  useEffect(() => {
    RNBootSplash.hide({fade: true});
    async function fetchStore() {
      const data = (await getItem('user-preferences')) || {};
      setUserPreferences({...userPreferences, ...data});
    }

    fetchStore();
  }, []);

  // useEffect(() => {
  //   if (loaded) {
  //     RNBootSplash.hide({fade: true});
  //   }
  // }, [loaded, error]);

  return (
    <UserPreferencesContext.Provider
      value={{
        userPreferences,
        setUserPreferences: setAndSaveUserPreferences,
      }}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: {backgroundColor: '#763b11'},
              headerTitleStyle: {fontFamily: 'Alef'},
              headerTintColor: '#eee',
              // headerBackTitleStyle: {
              //   fontSize: 15,
              // },
              // headerBackTitleStyle: {fontFamily: 'Alef'},

              headerRight: () => (
                <HeaderButtonsContainer
                  buttonsData={[{type: 'share'}, {type: 'menu'}]}
                />
              ),
            }}>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'תפריט ראשי'}}
            />
            <Stack.Screen
              name="Table-of-Contents"
              options={{
                title: 'תוכן עניינים',
              }}>
              {(props) => (
                <TableOfContents
                  helekFrom4Turim={helekFrom4Turim}
                  setHelekFrom4Turim={setHelekFrom4Turim}
                  {...props}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Bookmarks"
              component={BookmarksScreen}
              options={{title: 'סימניות'}}
            />
            <Stack.Screen
              name="LastVisited"
              component={LastVisitedScreen}
              options={{title: 'נפתחו לאחרונה'}}
            />
            <Stack.Screen
              name="About"
              component={AboutScreen}
              options={{title: 'אודות'}}
            />
            <Stack.Screen
              name="Seif"
              component={SeifScreen}
              options={({route, navigation}) => ({
                title: `סימן ${convertNumericIndexToHebrew(
                  route.params.simanIndex,
                )}, סעיף ${convertNumericIndexToHebrew(
                  route.params.seifIndex,
                )}`,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </UserPreferencesContext.Provider>
  );
};

export default App;
