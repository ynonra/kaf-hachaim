import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {
  Dialog,
  Paragraph,
  Portal,
  TextInput,
  Button,
  Modal,
  HelperText,
} from 'react-native-paper';

import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import {
  deleteBookmark,
  renameBookmark,
  saveOneBookmark,
} from '../util/bookmarks';
import {convertNumericIndexToHebrew} from '../text-parse-utils/index-convertion';
import {sendReportMail} from '../util/report';

import {rtlDirection, rtlText, rtlView} from '../styles/styles';

const CustomDialog = ({
  simanIndex,
  seifIndex,
  helekFrom4Turim,
  bookmarkIndex,
  title,
  description,
  confirmData,
  cancelData,
  textInputData,
  open,
  onClose,
  setUpdatedData,
  mistakeReportData,
}) => {
  // const { simanIndex, seifIndex } = useRoute().params;
  const [textInputValue, setTextInputValue] = React.useState(
    textInputData?.initialValue || '',
  );

  React.useEffect(() => {
    setTextInputValue(calcBookmarkName());
  }, [simanIndex, seifIndex]);

  React.useEffect(() => {
    setTextInputValue(textInputData?.initialValue);
  }, [textInputData?.initialValue]);

  function saveBookmark() {
    saveOneBookmark({
      simanIndex,
      seifIndex,
      helekFrom4Turim,
      bookmarkName: textInputValue,
    });
  }

  async function renameBookmarkHandler() {
    return await renameBookmark(bookmarkIndex, textInputValue);
  }

  async function deleteBookmarkHandler() {
    return await deleteBookmark(bookmarkIndex);
  }

  function mistakeReport() {
    mistakeReportData.correctText = textInputValue;
    sendReportMail(mistakeReportData);
  }

  function calcBookmarkName() {
    return `סימן ${convertNumericIndexToHebrew(
      simanIndex,
    )} סעיף ${convertNumericIndexToHebrew(seifIndex)}`;
  }

  const confirmActions = {
    saveBookmark,
    renameBookmark: renameBookmarkHandler,
    deleteBookmark: deleteBookmarkHandler,
    mistakeReport,
  };

  return (
    <Portal>
      <Modal
        visible={open}
        style={{
          alignItems: 'center',
        }}
        contentContainerStyle={{
          backgroundColor: '#eee',
          width: useWindowDimensions().width * 0.85,
          paddingHorizontal: 10,
        }}
        onDismiss={onClose}>
        <ScrollView>
          <Dialog.Title style={[rtlText]}>{title}</Dialog.Title>
          {description ? (
            <Dialog.Content>
              <Paragraph style={[rtlText]}>{description}</Paragraph>
            </Dialog.Content>
          ) : null}
          {textInputData ? (
            <View>
              <TextInput
                label={textInputData.label}
                value={textInputValue}
                onChangeText={(text) => setTextInputValue(text)}
                multiline={textInputData.multiline}
                autoFocus
              />
              <HelperText
                type="error"
                style={rtlText}
                visible={!textInputValue}>
                אנא מלא את השדה
              </HelperText>
            </View>
          ) : null}
          {confirmData || cancelData ? (
            <Dialog.Actions style={[rtlView]}>
              <Button onPress={onClose}>{cancelData?.title || 'בטל'}</Button>
              {confirmData ? (
                <Button
                  onPress={async () => {
                    onClose();
                    const newData = await confirmActions[
                      confirmData.actionType
                    ]();
                    setUpdatedData && setUpdatedData(newData);
                  }}
                  disabled={textInputData && !textInputValue}>
                  {confirmData.title}
                </Button>
              ) : null}
            </Dialog.Actions>
          ) : null}
        </ScrollView>
      </Modal>
    </Portal>
  );
};

export default CustomDialog;

const styles = StyleSheet.create({});
