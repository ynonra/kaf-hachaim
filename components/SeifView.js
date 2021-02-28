import React, {useEffect, useRef, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  Pressable,
  I18nManager,
} from 'react-native';
import {Divider, Modal, FAB, Portal} from 'react-native-paper';
import {parseHtmlToReactElements} from '../text-parse-utils/seif-html-to-react';

import {UserPreferencesContext} from '../context/theme';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
// import FAB from './FAB';

import orahChaim from '../data/orah-chaim.json';
import yoreDea from '../data/yore-dea.json';

import {rtlText, rtlView} from '../styles/styles';
import AppText from './AppText';

const SeifView = ({
  simanIndex,
  seifIndex,
  helekFrom4Turim,
  setMistakeReportData,
  isMistakeReportMode,
}) => {
  const [showShulchanArukhModal, setShowShulchanArukhModal] = useState(false);
  const AnimatedPortal = Animated.createAnimatedComponent(Portal);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  fadeAnim.addListener(({value}) => {
    fadeAnimValue = value;
  });
  let fadeAnimValue = 0;

  const {userPreferences} = React.useContext(UserPreferencesContext);
  const {fontSize, theme} = userPreferences;

  const seifScrollView = useRef(null);
  const helek = helekFrom4Turim === 'אורח חיים' ? orahChaim : yoreDea;
  const kafHaChaimArray = helek[simanIndex][seifIndex].kafHaChaim;
  const {width: windowWidth} = useWindowDimensions();

  useEffect(() => {
    seifScrollView.current.scrollTo({y: 0, animated: false});
    fadeAnim.setValue(0);
  }, [simanIndex, seifIndex]);

  function onPressMistakeReport({isShulchanArukh, isKafHaChaim, html}) {
    if (!isMistakeReportMode) return;
    const mistakeReportData = {
      originalText: html.replace(/<.+?>/g, ''),
      isShulchanArukh,
      isKafHaChaim,
      simanIndex,
      seifIndex,
      helekFrom4Turim,
      correctText: null,
    };
    setMistakeReportData(mistakeReportData);
  }

  function closeShulchanArukhModal() {
    setShowShulchanArukhModal(false);
  }
  function openShulchanArukhModal() {
    const buttonIsTransparent = fadeAnimValue === 0;
    if (buttonIsTransparent) return;
    setShowShulchanArukhModal(true);
  }
  function toggleShulchanArukhModal() {
    setShowShulchanArukhModal(!showShulchanArukhModal);
  }

  function fadeIn() {
    Animated.timing(fadeAnim, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function fadeOut() {
    Animated.timing(fadeAnim, {
      duration: 200,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }

  function onScroll({
    nativeEvent: {
      contentOffset: {y},
    },
  }) {
    if (y > 400 && fadeAnimValue === 0) {
      fadeIn();
    } else if (y < 400 && fadeAnimValue === 1) {
      fadeOut();
    }
  }

  return (
    <View>
      <ScrollView
        ref={seifScrollView}
        style={[
          styles.container,
          {
            width: windowWidth,
          },
          rtlText,
        ]}
        onScroll={onScroll}
        scrollEventThrottle={25}>
        <View style={[styles.textContainer, rtlText]}>
          <View style={[rtlView, styles.h2Container]}>
            <View style={styles.h2Border} />
            <AppText
              style={[styles.h2, {fontSize: fontSize + 4, color: theme.color}]}
              bold>
              שולחן ערוך
            </AppText>
          </View>
          <Pressable
            onPress={() =>
              onPressMistakeReport({
                isShulchanArukh: true,
                html: helek[simanIndex][seifIndex].shulchanArukh,
              })
            }>
            <View style={[rtlText]}>
              {parseHtmlToReactElements(
                helek[simanIndex][seifIndex].shulchanArukh,
                {fontSize},
              )}
            </View>
          </Pressable>
          <Divider
            style={[styles.divider, {backgroundColor: theme.dividerColor}]}
          />
          {kafHaChaimArray.length ? (
            <View style={[rtlView, styles.h2Container]}>
              <View style={styles.h2Border} />
              <AppText
                style={[
                  styles.h2,
                  {
                    fontSize: fontSize + 4,
                    color: theme.color,
                  },
                ]}
                bold>
                כף החיים
              </AppText>
            </View>
          ) : null}
          {kafHaChaimArray.length ? (
            <View style={[rtlText]}>
              {kafHaChaimArray.map((seifKatanArr) =>
                seifKatanArr.map((html, i) => (
                  <Pressable
                    onPress={() =>
                      onPressMistakeReport({
                        isKafHaChaim: true,
                        html,
                      })
                    }
                    key={Math.random()}>
                    {parseHtmlToReactElements(html, {
                      fontSize,
                    })}
                  </Pressable>
                )),
              )}
            </View>
          ) : null}
        </View>
      </ScrollView>
      {/* <Portal> */}

      <Portal>
        <Modal
          visible={showShulchanArukhModal}
          onDismiss={closeShulchanArukhModal}
          style={styles.shulchanArukhModaContent}>
          <ScrollView
            style={[
              styles.shulchanArukhModalView,
              rtlText,
              {backgroundColor: theme.backgroundColor},
            ]}>
            {parseHtmlToReactElements(
              helek[simanIndex][seifIndex].shulchanArukh,
              {fontSize},
            )}
          </ScrollView>
        </Modal>
      </Portal>
      <Portal>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            ...(I18nManager.isRTL ? {right: 0} : {left: 0}),
            transform: [
              {
                scale: fadeAnim.interpolate({
                  inputRange: [0, 0.8, 1],
                  outputRange: [0.9, 1.02, 1],
                }),
              },
            ],
            opacity: fadeAnim,
          }}>
          <FAB
            style={styles.fab}
            small
            icon={showShulchanArukhModal ? 'eye-off' : 'eye'}
            label={showShulchanArukhModal ? 'הסתר שו״ע' : 'הראה שו״ע'}
            animated={false}
            onPress={toggleShulchanArukhModal}
          />
        </Animated.View>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: 200,
  },
  textContainer: {
    marginBottom: 90,
    // alignItems: 'stretch',
  },
  h2Container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  h2Border: {
    borderRightWidth: 5,
    borderStyle: 'solid',
    borderRightColor: '#cd853f',
    height: 25,
  },
  h2: {
    ...rtlText,
    paddingRight: 5,
  },
  divider: {
    marginVertical: 30,
  },
  fab: {
    margin: 16,
    bottom: 0,
  },
  shulchanArukhModaContent: {
    padding: 25,
    paddingBottom: 40,
  },
  shulchanArukhModalView: {
    padding: 20,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#888',
  },
});

export default SeifView;
