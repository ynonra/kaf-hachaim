import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator as AndroidActivityIndicator,
} from 'react-native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import {ActivityIndicator, Colors} from 'react-native-paper';

import AppText from './AppText';

const LoaderView = ({lastPage, firstPage}) => {
  const {height: windowHeight} = useWindowDimensions();

  const Loader = () => {
    return (
      <>
        {Platform.OS === 'ios' ? (
          <AndroidActivityIndicator
            // style={{ paddingTop: (windowHeight - 150) / 2 }}
            size="large"
          />
        ) : (
          <ActivityIndicator color="#555" size="large" />
        )}
      </>
    );
  };
  return (
    <View
      style={[styles.container, {height: useWindowDimensions().height - 80}]}>
      {firstPage ? (
        <AppText style={styles.text}>התחלה</AppText>
      ) : lastPage ? (
        <AppText style={styles.text}>תם ונשלם שבח לבורא עולם</AppText>
      ) : (
        <Loader />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff0',
  },
  text: {fontSize: 30},
});

export default LoaderView;
