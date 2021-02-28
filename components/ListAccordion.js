import React from 'react';
import {Animated, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Entypo';
import AppText from './AppText';

import {
  convertHebrewIndexToNumeric,
  convertNumericIndexToHebrew,
} from '../text-parse-utils/index-convertion';
import orahChaim from '../data/orah-chaim.json';
import yoreDea from '../data/yore-dea.json';

import {
  rtlDirection,
  rtlText,
  rtlView,
  rtlDirectionOpposite,
} from '../styles/styles';

const ListAccordion = ({
  simanimData,
  helekFrom4Turim,
  setSelectedSimanIndex,
  setSeifimModalVisible,
}) => {
  const [showSimanimList, setShowSimanimList] = React.useState(false);
  const rotateAnimValue = React.useRef(new Animated.Value(0)).current;
  function openRotate() {
    Animated.timing(rotateAnimValue, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  function closeRotate() {
    Animated.timing(rotateAnimValue, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }

  function toggleSimanimList() {
    setShowSimanimList(!showSimanimList);
    !showSimanimList ? openRotate() : closeRotate();
  }

  const helek = helekFrom4Turim === 'אורח חיים' ? orahChaim : yoreDea;
  const {startSiman, endSiman} = simanimData;
  const startSimanIndex = convertHebrewIndexToNumeric(startSiman);
  const endSimanIndex = endSiman && convertHebrewIndexToNumeric(endSiman);
  const indexesArr = endSiman
    ? new Array(endSimanIndex + 1 - startSimanIndex)
        .fill()
        .map((val, i) => i + startSimanIndex)
    : [startSimanIndex];
  const activeColor = '#00004b';
  const title =
    simanimData.title +
    ` ${endSiman ? `(${startSiman}' - ${endSiman}')` : `(${startSiman}')`}`;

  return (
    <View
      style={[styles.listAccordionContainer, rtlDirectionOpposite]}
      key={Math.random()}>
      <TouchableOpacity onPress={toggleSimanimList}>
        <View
          style={[
            styles.listAccordion,
            rtlView,
            showSimanimList && {backgroundColor: '#f9ebd3'},
          ]}>
          <AppText
            style={[
              styles.listAccordionTitle,
              rtlText,
              {color: showSimanimList ? activeColor : '#000'},
            ]}>
            {title}
          </AppText>
          <Animated.View
            style={{
              transform: [
                {
                  rotateZ: rotateAnimValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '-90deg'],
                  }),
                },
              ],
            }}>
            <Icon name="chevron-left" size={24} color="black" />
          </Animated.View>
        </View>
      </TouchableOpacity>
      {showSimanimList && (
        <View>
          {indexesArr.map((simanIndex) => {
            const description = helek[simanIndex]?.[0]?.shulchanArukh
              ?.match(/^.+? ובו /)?.[0]
              .slice(3, -5);
            const hebSiman = convertNumericIndexToHebrew(simanIndex);
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedSimanIndex({simanIndex, helekFrom4Turim});
                  setSeifimModalVisible(true);
                }}
                key={Math.random()}>
                <View
                  style={[
                    styles.listItem,
                    rtlView,
                    showSimanimList && {backgroundColor: '#fbf1de'},
                  ]}>
                  <AppText
                    bold
                    style={[
                      styles.simanDescription,
                    ]}>{`סימן ${hebSiman}'`}</AppText>
                  <AppText
                    style={[
                      styles.simanDescription,
                      {
                        flex: 1,
                      },
                      rtlText,
                    ]}
                    numberOfLines={1}>{`${
                    description ? ` - ${description}` : ''
                  }`}</AppText>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listAccordionContainer: {
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: '#aaa',
  },
  listAccordion: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  listAccordionTitle: {
    fontSize: 16,
  },
  listItem: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  simanDescription: {
    fontSize: 16,
    color: '#444',
  },
});

export default React.memo(ListAccordion);
