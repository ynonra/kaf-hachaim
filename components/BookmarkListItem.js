import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import { rtlView } from '../styles/styles';
import NavButton from './NavButton';

const BookmarkListItem = ({
  bookmarkName,
  bookmarkIndex,
  simanIndex,
  seifIndex,
  helekFrom4Turim,
  setActiveBookmarkData,
  onOpenDialog,
}) => {
  const navigation = useNavigation();

  function createActionHandler(action) {
    return () => {
      setActiveBookmarkData({
        index: bookmarkIndex,
        name: bookmarkName,
        action,
      });
      onOpenDialog();
    };
  }

  const containerWidth = useWindowDimensions().width - 60;

  return (
    <View
      style={[
        rtlView,
        {
          alignItems: 'center',
          justifyContent: 'center',
          width: containerWidth,
        },
      ]}
    >
      <NavButton
        onPress={() =>
          navigation.navigate('Seif', {
            simanIndex,
            seifIndex,
            helekFrom4Turim,
          })
        }
        label={bookmarkName || 'ללא שם'}
        seifIndexes={{
          simanIndex,
          seifIndex,
          helekFrom4Turim,
        }}
      />
      <IconButton
        style={{ margin: 0 }}
        color="#333"
        size={18}
        icon="delete"
        onPress={createActionHandler('delete')}
      />
      <IconButton
        style={{ margin: 0 }}
        color="#333"
        size={18}
        icon="pencil"
        onPress={createActionHandler('rename')}
      />
    </View>
  );
};

export default BookmarkListItem;
