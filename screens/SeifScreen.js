import React, {useRef, useState, useEffect, useContext} from 'react';
import {Animated, StyleSheet, View, Text} from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import {CommonActions} from '@react-navigation/native';
import {Button, Portal, Snackbar} from 'react-native-paper';

import SeifView from '../components/SeifView';
import LoaderView from '../components/LoaderView';
import CustomSidebar from '../components/CustomSidebar';
import CustomDialog from '../components/CustomDialog';

import {UserPreferencesContext} from '../context/theme';
import {
  BookContext,
  bookSettings as bookInitialSettings,
} from '../context/book';
import {saveOneDoc as saveToLastVisited} from '../util/lastVisited';
import orahChaim from '../data/orah-chaim.json';
import yoreDea from '../data/yore-dea.json';

import ScreenContainer from '../components/ScreenContainer';
import HeaderMenuBtn from '../components/HeaderMenuBtn';
import HeaderButtonsContainer from '../components/HeaderButtonsContainer';
import {convertNumericIndexToHebrew} from '../text-parse-utils/index-convertion';

import {rtlDirection, rtlText, rtlView} from '../styles/styles';

const SeifScreen = ({route, navigation}) => {
  const [isMistakeReportMode, setIsMistakeReportMode] = useState(false);
  const [mistakeReportData, setMistakeReportData] = useState(false);
  const [reportSnackbarOpen, setReportSnackbarOpen] = useState(false);
  const [bookSettings, setBookSettings] = useState(bookInitialSettings);
  const {theme} = useContext(UserPreferencesContext).userPreferences;
  const ViewPagerRef = useRef(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [bookmarkDialogOpen, setBookmarkDialogOpen] = useState(false);

  let {simanIndex, seifIndex, helekFrom4Turim} = route.params;
  const helek = helekFrom4Turim === 'אורח חיים' ? orahChaim : yoreDea;
  const nextSeifIndexes = calcNextSeifIndexes({simanIndex, seifIndex});
  const prevSeifIndexes = calcPrevSeifIndexes({simanIndex, seifIndex});
  let currentPagePosition = 1;

  saveToLastVisited({simanIndex, seifIndex, helekFrom4Turim});

  useEffect(() => {
    ViewPagerRef.current.setPageWithoutAnimation(currentPagePosition);
  }, [nextSeifIndexes, prevSeifIndexes]);

  useEffect(
    () =>
      navigation.setOptions({
        headerRight: () => (
          <HeaderButtonsContainer
            buttonsData={[
              {type: 'settings', onPress: onOpenSidebar},
              {type: 'menu'},
            ]}
          />
        ),
      }),
    [],
  );

  function onPageSelected({nativeEvent: {position}}) {
    if (position === currentPagePosition - 1 && nextSeifIndexes) {
      navigation.dispatch(CommonActions.setParams({...nextSeifIndexes}));
      // setLoading(true);
    } else if (position === currentPagePosition + 1 && prevSeifIndexes) {
      navigation.dispatch(CommonActions.setParams({...prevSeifIndexes}));
    }
  }

  function onCloseBookmarkModal() {
    setBookmarkDialogOpen(false);
  }

  function onCloseSidebar() {
    setSidebarOpen(false);
  }

  function onOpenSidebar() {
    setSidebarOpen(true);
  }

  function calcNextSeifIndexes({simanIndex, seifIndex}) {
    return helek[simanIndex]?.[seifIndex + 1]
      ? {simanIndex, seifIndex: seifIndex + 1}
      : helek[simanIndex + 1]
      ? {simanIndex: simanIndex + 1, seifIndex: 0}
      : null;
  }

  function calcPrevSeifIndexes({simanIndex, seifIndex}) {
    return helek[simanIndex][seifIndex - 1]
      ? {simanIndex, seifIndex: seifIndex - 1}
      : helek[simanIndex - 1]
      ? {
          simanIndex: simanIndex - 1,
          seifIndex: helek[simanIndex - 1].length - 1,
        }
      : null;
  }

  function onCloseReportDialog() {
    setIsMistakeReportMode(false);
    setMistakeReportData(null);
  }

  return (
    <ScreenContainer>
      <CustomSidebar
        isOpen={sidebarOpen}
        onClose={onCloseSidebar}
        setBookmarkDialogOpen={setBookmarkDialogOpen}
        setIsMistakeReportMode={setIsMistakeReportMode}
        isMistakeReportMode={isMistakeReportMode}
        setReportSnackbarOpen={setReportSnackbarOpen}>
        <BookContext.Provider value={{bookSettings, setBookSettings}}>
          <ViewPager
            ref={ViewPagerRef}
            style={[styles.pager, {backgroundColor: theme.backgroundColor}]}
            initialPage={currentPagePosition}
            onPageSelected={onPageSelected}
            scrollEnabled={bookSettings.pagingEnabled}>
            <LoaderView lastPage={!nextSeifIndexes} />
            <SeifView
              simanIndex={simanIndex}
              seifIndex={seifIndex}
              helekFrom4Turim={helekFrom4Turim}
              setMistakeReportData={setMistakeReportData}
              isMistakeReportMode={isMistakeReportMode}
            />
            <LoaderView firstPage={!prevSeifIndexes} />
          </ViewPager>
        </BookContext.Provider>
      </CustomSidebar>
      <CustomDialog
        simanIndex={simanIndex}
        seifIndex={seifIndex}
        helekFrom4Turim={helekFrom4Turim}
        open={bookmarkDialogOpen}
        onClose={onCloseBookmarkModal}
        title="הוסף סימניה"
        confirmData={{
          title: 'צור סימניה',
          actionType: 'saveBookmark',
        }}
        cancelData={{
          title: 'בטל',
        }}
        textInputData={{
          label: 'שם',
          initialValue: `${helekFrom4Turim} סימן ${convertNumericIndexToHebrew(
            simanIndex,
          )} סעיף ${convertNumericIndexToHebrew(seifIndex)}`,
        }}
      />
      <CustomDialog
        simanIndex={simanIndex}
        seifIndex={seifIndex}
        helekFrom4Turim={helekFrom4Turim}
        open={mistakeReportData}
        onClose={onCloseReportDialog}
        mistakeReportData={mistakeReportData}
        title="דיווח על שגיאה"
        confirmData={{
          title: 'שלח דיווח בדוא״ל',
          actionType: 'mistakeReport',
        }}
        cancelData={{
          title: 'בטל',
        }}
        description="אנא ערוך את הכיתוב ותקן את השגיאה"
        textInputData={{
          label: 'נוסח הסעיף',
          initialValue: mistakeReportData?.originalText,
          multiline: true,
        }}
      />
      <Portal>
        <Snackbar
          visible={
            !mistakeReportData && isMistakeReportMode && reportSnackbarOpen
          }
          onDismiss={() => setReportSnackbarOpen(false)}
          style={[styles.snackbar, rtlText, rtlDirection]}>
          אנא לחץ על הפיסקה השגויה
        </Snackbar>
      </Portal>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  // pager: { flex: 1, backgroundColor: '#fffbfb' },
  pager: {flex: 1},
  snackbar: {backgroundColor: 'darkred'},
});

export default SeifScreen;
