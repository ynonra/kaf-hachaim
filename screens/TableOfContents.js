import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  I18nManager,
  TouchableOpacity,
  TouchableHighlight,
  Pressable,
  Animated,
  SectionList,
} from 'react-native';
import {
  List,
  Modal,
  IconButton,
  Button as PaperButton,
  Portal,
} from 'react-native-paper';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {rtlDirection, rtlText, rtlView} from '../styles/styles';
import simanimPartitionData from '../data/simanim-list-partition';

import orahChaim from '../data/orah-chaim.json';
import yoreDea from '../data/yore-dea.json';

import ScreenContainer from '../components/ScreenContainer';
import ListAccordion from '../components/ListAccordion';
import AppText from '../components/AppText';
import HelekFrom4TurimBtn from '../components/HelekFrom4TurimBtn';
import SeifimButtonsModal from '../components/SeifimButtonsModal';
import TableOfContentsSectionList from '../components/TableOfContentsSectionList';

const TableOfContents = ({
  navigation,
  route,
  helekFrom4Turim,
  setHelekFrom4Turim,
}) => {
  const resizeButtonsAnim = useRef(new Animated.Value(helekFrom4Turim ? 1 : 0))
    .current;
  const {height: windowHeight} = useWindowDimensions();
  const initialButtonTranslateY = windowHeight / 2 - 37 - 75;

  const [seifimModalVisible, setSeifimModalVisible] = useState(false);
  const [selectedSimanIndex, setSelectedSimanIndex] = useState(null);
  const ScrollViewListRef = useRef(null);

  const helekFrom4TurimData = simanimPartitionData[helekFrom4Turim];

  const sectionListData = helekFrom4TurimData?.data;

  useEffect(() => {
    if (!helekFrom4Turim) return;
    shrinkButtonsAnim();
    // ScrollViewListRef.current.scrollTo({x: 0, y: 0});
    ScrollViewListRef?.current?.scrollToLocation({
      sectionIndex: 0,
      itemIndex: 0,
    });
  }, [helekFrom4Turim]);

  function getSeifimArray({simanIndex}) {
    const helek = helekFrom4Turim === 'אורח חיים' ? orahChaim : yoreDea;
    return Array(helek[simanIndex].length)
      .fill()
      .map((val, simanIndex) => simanIndex);
  }

  function onCloseModal() {
    setSeifimModalVisible(false);
  }

  function shrinkButtonsAnim() {
    Animated.timing(resizeButtonsAnim, {
      duration: 400,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  function renderListAccordion({item, index}) {
    return (
      <ListAccordion
        key={index}
        helekFrom4Turim={helekFrom4TurimData.title}
        simanimData={item}
        setSeifimModalVisible={setSeifimModalVisible}
        setSelectedSimanIndex={setSelectedSimanIndex}
      />
    );
  }

  const MemoSectionList = React.memo(Animated.SectionList, () => true);
  MemoSectionList.whyDidYouRender = true;

  return (
    <ScreenContainer>
      <Portal.Host>
        <Animated.View
          style={[
            styles.helekButtonsContainer,
            rtlView,
            {
              transform: [
                {
                  translateY: resizeButtonsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [initialButtonTranslateY, -23],
                  }),
                },
                {
                  scale: resizeButtonsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.6],
                  }),
                },
              ],
            },
          ]}>
          <HelekFrom4TurimBtn
            title="אורח חיים"
            active={helekFrom4Turim === 'אורח חיים'}
            setHelekFrom4Turim={setHelekFrom4Turim}
          />
          <HelekFrom4TurimBtn
            title="יורה דעה"
            active={helekFrom4Turim === 'יורה דעה'}
            setHelekFrom4Turim={setHelekFrom4Turim}
          />
        </Animated.View>

        <Animated.View
          style={[
            {
              opacity: resizeButtonsAnim,
            },
            {
              transform: [
                {
                  translateY: resizeButtonsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -45],
                  }),
                },
              ],
            },
          ]}>
          {helekFrom4Turim ? (
            <View style={styles.container}>
              <TableOfContentsSectionList
                data={sectionListData}
                renderItem={renderListAccordion}
                ref={ScrollViewListRef}
              />
            </View>
          ) : null}
        </Animated.View>

        <Portal>
          <Modal
            visible={seifimModalVisible}
            contentContainerStyle={styles.modal}>
            <SeifimButtonsModal
              getSeifimArray={getSeifimArray}
              onClose={onCloseModal}
              selectedSimanIndex={selectedSimanIndex}
              navigation={navigation}
            />
          </Modal>
        </Portal>
      </Portal.Host>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  helekButtonsContainer: {
    justifyContent: 'center',
    marginVertical: 5,
    zIndex: 10,
  },
  helekFrom4TurimTitle: {
    fontSize: 22,
    backgroundColor: '#5552',
    color: '#000',
    padding: 15,
    fontWeight: 'bold',
  },
  scrollViewList: {
    position: 'absolute',
    top: 130,
    left: 0,
    right: 0,
    bottom: -45,
  },
  listSubHeader: {
    textAlign: 'center',
    color: '#000',
    padding: 15,
    backgroundColor: '#c8a78f33',
    fontSize: 20,
  },
  listAccordion: {
    paddingVertical: 0,
    ...rtlText,
    ...rtlView,
    borderStyle: 'solid',
    borderTopWidth: 1,
    borderColor: '#aaa',
  },
  listItem: {
    paddingVertical: 0,
  },
  container: {
    paddingBottom: 100,
  },
  bigSimanimSection: {
    borderStyle: 'solid',
    borderTopWidth: 2,
    borderColor: '#aaa',
  },
  modal: {
    position: 'relative',
    flex: 1,
    zIndex: 1000,
  },
});

export default TableOfContents;
// 029080629
