import React, { useState, useCallback } from 'react';
import { StyleSheet, View, I18nManager, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { convertNumericIndexToHebrew } from '../text-parse-utils/index-convertion';
import { getBookmarks, removeAllBookmarks } from '../util/bookmarks';
import LoaderView from '../components/LoaderView';
import { rtlText, rtlView } from '../styles/styles';
import { Button, Divider, Text } from 'react-native-paper';
import BookmarkListItem from '../components/BookmarkListItem';
import CustomDialog from '../components/CustomDialog';

import ScreenContainer from '../components/ScreenContainer';
import AppText from '../components/AppText';

const BookmarksScreen = () => {
  const [bookmarksData, setBookmarksData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeBookmarkData, setActiveBookmarkData] = useState(); // {index, name, action}

  useFocusEffect(
    useCallback(() => {
      fetchBookmarks();
    }, [])
  );

  async function fetchBookmarks() {
    const data = await getBookmarks();
    setBookmarksData(data);
    setIsLoading(false);
  }

  function onCloseDialog() {
    setIsDialogOpen(false);
    fetchBookmarks();
  }

  function onOpenDialog() {
    setIsDialogOpen(true);
  }

  const dialogRenameBookmarkProps = {
    confirmData: { actionType: 'renameBookmark', title: 'שנה שם' },
    title: 'שנה שם',
    textInputData: {
      label: 'שם',
      initialValue: activeBookmarkData?.name,
    },
  };

  const dialogDeleteBookmarkProps = {
    confirmData: { actionType: 'deleteBookmark', title: 'מחק סימניה' },
    title: 'מחיקת סימניה',
    description: `האם ברצונך למחוק את הסימניה "${activeBookmarkData?.name}"?`,
  };

  const dialogPropsDic = {
    rename: dialogRenameBookmarkProps,
    delete: dialogDeleteBookmarkProps,
  };

  return (
    <ScreenContainer>
      {isLoading ? (
        <LoaderView />
      ) : bookmarksData?.length ? (
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            {bookmarksData.map(
              (
                { simanIndex, seifIndex, helekFrom4Turim, bookmarkName },
                index
              ) => {
                return (
                  <View key={Math.random()}>
                    <BookmarkListItem
                      bookmarkIndex={index}
                      simanIndex={simanIndex}
                      seifIndex={seifIndex}
                      helekFrom4Turim={helekFrom4Turim}
                      bookmarkName={bookmarkName}
                      setActiveBookmarkData={setActiveBookmarkData}
                      onOpenDialog={onOpenDialog}
                    />
                    <Divider />
                  </View>
                );
              }
            )}
          </ScrollView>
          <CustomDialog
            onClose={onCloseDialog}
            open={isDialogOpen}
            setUpdatedData={setBookmarksData}
            bookmarkIndex={activeBookmarkData?.index}
            {...dialogPropsDic[activeBookmarkData?.action]}
          />
        </View>
      ) : (
        <AppText style={{ textAlign: 'center', marginTop: 25, fontSize: 19 }}>
          לא נמצאו סימניות
        </AppText>
      )}
    </ScreenContainer>
  );
};

export default BookmarksScreen;
