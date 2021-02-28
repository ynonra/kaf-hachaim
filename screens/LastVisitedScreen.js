import React from 'react';
import { StyleSheet, View, Text, I18nManager, ScrollView } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { calcTimesAgoString, getLastVisitedData } from '../util/lastVisited';

import { rtlText, rtlView } from '../styles/styles';
import LoaderView from '../components/LoaderView';
import { convertNumericIndexToHebrew } from '../text-parse-utils/index-convertion';
import { useFocusEffect } from '@react-navigation/native';

import ScreenContainer from '../components/ScreenContainer';
import AppText from '../components/AppText';
import NavButton from '../components/NavButton';

const LastVisitedScreen = ({ navigation }) => {
  const [lastVisitedData, setLastVisitedData] = React.useState(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  useFocusEffect(
    React.useCallback(() => {
      async function fetchLastVisited() {
        const data = await getLastVisitedData();
        setLastVisitedData(data?.reverse());
        setIsLoading(false);
      }
      fetchLastVisited();
    }, [])
  );
  return (
    <ScreenContainer>
      <ScrollView style={{ paddingBottom: 20 }}>
        {isLoading ? (
          <LoaderView />
        ) : lastVisitedData ? (
          lastVisitedData.map(
            ({ simanIndex, seifIndex, helekFrom4Turim, date }) => {
              const hebSiman = convertNumericIndexToHebrew(simanIndex);
              const hebSeif = convertNumericIndexToHebrew(seifIndex);
              const timesAgoString = calcTimesAgoString(date);
              const helekFrom4TurimShort =
                helekFrom4Turim.slice(0, 4) === 'אורח' ? 'או"ח' : 'יו"ד';
              return (
                <View key={Math.random()}>
                  <NavButton
                    onPress={() =>
                      navigation.navigate('Seif', {
                        simanIndex,
                        seifIndex,
                        helekFrom4Turim,
                      })
                    }
                    seifIndexes={{ simanIndex, seifIndex, helekFrom4Turim }}
                    label={`${helekFrom4TurimShort} סימן ${hebSiman} סעיף ${hebSeif} (${timesAgoString})`}
                  />
                  <Divider />
                </View>
              );
            }
          )
        ) : (
          <AppText style={{ textAlign: 'center', marginTop: 25, fontSize: 19 }}>
            טרם נקראו...
          </AppText>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

export default LastVisitedScreen;
