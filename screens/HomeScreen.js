import React from 'react';

import ScreenContainer from '../components/ScreenContainer';
import HomeScreenButton from '../components/HomeScreenButton';

const HomeScreen = ({ navigation }) => {
  return (
    <ScreenContainer style={{ justifyContent: 'center' }}>
      <HomeScreenButton
        children="תוכן עניינים"
        iconName="table-of-contents"
        onPress={() => navigation.navigate('Table-of-Contents')}
      />
      <HomeScreenButton
        children="סימניות"
        iconName="bookmark-multiple"
        onPress={() => navigation.navigate('Bookmarks')}
      />
      <HomeScreenButton
        children="נפתחו לאחרונה"
        iconName="history"
        onPress={() => navigation.navigate('LastVisited')}
      />
      <HomeScreenButton
        children="אודות"
        iconName="information-variant"
        onPress={() => navigation.navigate('About')}
      />
    </ScreenContainer>
  );
};

export default HomeScreen;
