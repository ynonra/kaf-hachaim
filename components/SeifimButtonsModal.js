import React from 'react';
import {
  I18nManager,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {IconButton, Modal} from 'react-native-paper';
import {rtlText, rtlView} from '../styles/styles';
import {convertNumericIndexToHebrew} from '../text-parse-utils/index-convertion';
import AppText from './AppText';

const SeifimButtonsModal = ({
  onClose,
  selectedSimanIndex,
  getSeifimArray,
  navigation,
}) => {
  function renderSeifButton(seifIndex) {
    return (
      <TouchableHighlight
        underlayColor="#c3b1a1"
        key={Math.random()}
        style={styles.seifButton}
        onPress={() =>
          navigation.navigate('Seif', {
            seifIndex,
            simanIndex: selectedSimanIndex.simanIndex,
            helekFrom4Turim: selectedSimanIndex.helekFrom4Turim,
          })
        }>
        <AppText style={styles.seifText}>
          {convertNumericIndexToHebrew(seifIndex)}
        </AppText>
      </TouchableHighlight>
    );
  }
  return (
    <Pressable style={styles.modalPressable} onPress={onClose} key={123}>
      {/* {visible ? ( */}
      <ScrollView centerContent={true}>
        <View style={styles.modalTitleView}>
          <View style={styles.modalHeader}>
            <AppText
              style={[
                styles.modalHeaderText,
                styles.modalTitle,
              ]}>{`סימן ${convertNumericIndexToHebrew(
              selectedSimanIndex?.simanIndex,
            )}`}</AppText>
            <AppText style={[styles.modalHeaderText, styles.modalSubTitle]}>
              בחר סעיף
            </AppText>
          </View>
        </View>
        <View style={[styles.simanimContainer, rtlView]}>
          {selectedSimanIndex !== null &&
            getSeifimArray(selectedSimanIndex).map(renderSeifButton)}
        </View>
      </ScrollView>
      {/* ) : null} */}
      <IconButton
        icon="close"
        color="#eee"
        style={[
          {
            backgroundColor: '#222',
            position: 'absolute',
            bottom: 0,
          },
          !I18nManager.isRTL ? {right: 0} : {left: 0},
        ]}
        onPress={onClose}
      />
    </Pressable>
  );
};

export default React.memo(
  SeifimButtonsModal,
  (prevProps, nextProps) =>
    prevProps.selectedSimanIndex === nextProps.selectedSimanIndex,
);

const styles = StyleSheet.create({
  simanimContainer: {
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  modalPressable: {flex: 1},
  modalTitleView: {
    marginBottom: 20,
    backgroundColor: '#764b25',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderColor: '#000',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderStyle: 'solid',
  },
  modalHeader: {},
  modalHeaderText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  modalTitle: {
    fontSize: 25,
    textAlign: 'center',
  },
  modalSubTitle: {
    fontSize: 17,
  },
  seifButton: {
    width: 50,
    height: 50,
    margin: 3,
    borderColor: '#f4a460',
    borderWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#f3ddca',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  seifText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
  },
});
