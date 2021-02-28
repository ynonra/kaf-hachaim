import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppText from './AppText';
// import { BookContext } from '../context/book';

const SelectableText = ({ children: text, ...props }) => {
  const [startSelectionIndex, setStartSelectionIndex] = useState(null);
  // const { setBookSettings, bookSettings } = useContext(BookContext);
  const wordAndSpacesArray = text.replace(/ /g, '* *').split('*');
  let i = 0;
  return (
    <AppText {...props}>
      {text}
      {/* {wordAndSpacesArray.map((wordOrSpace, i) => {
        return (
          <AppText
            key={Math.random()}
            onLongPress={() => {
              // console.log('onLongPress');
              setStartSelectionIndex(i);
              // console.log(i);
            }}
            onPress={() => {
              setStartSelectionIndex(null);
              // console.log(startSelectionIndex);
            }}
            style={
              startSelectionIndex !== null && startSelectionIndex === i
                ? { backgroundColor: '#1f68ff50' }
                : {}
            }
          >
            {wordOrSpace}
          </AppText>
        );
      })} */}
    </AppText>
  );
};

export default SelectableText;

const styles = StyleSheet.create({});
