import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

import BookText from '../components/BookText';
import {rtlText} from '../styles/styles';

export function parseHtmlToReactElements(html, textStyle) {
  const styles = createStyles(textStyle);
  const updatedHtml = html.replace(/\[סעיף.+?\]/g, '');

  return (
    <View key={Math.random()}>
      <BookText style={[styles.paragraphContainer, rtlText, textStyle || {}]}>
        {parseHtmlTags(updatedHtml, textStyle)}
      </BookText>
    </View>
  );
}

function parseHtmlTags(html, textStyle) {
  const openingTagMatch = html.match(/<[^<>]{0,10}>/);
  const closingTagMatch = html.match(/<\/[^<>]{0,10}>/);
  if (!openingTagMatch) return html;

  const tagName = openingTagMatch[0].slice(1, -1);
  if (tagName === 'br') {
    const firstHtml = html.slice(0, openingTagMatch.index);
    const secondHtml = html.slice(openingTagMatch.index + 4);
    return (
      <>
        {firstHtml + '\n'}
        {parseHtmlTags(secondHtml, textStyle)}
      </>
    );
  }
  const prevHtml = html.slice(0, openingTagMatch.index);
  const tagedSentenceHtml = html.slice(
    openingTagMatch.index + openingTagMatch[0].length,
    closingTagMatch.index,
  );
  const nextHtml = html.slice(
    closingTagMatch.index + closingTagMatch[0].length,
  );

  return (
    <>
      {prevHtml}
      {/* <SelectableText>{prevHtml}</SelectableText> */}
      <BookText bold={tagName === 'b'} small={tagName === 'small'}>
        {/* <SelectableText>{tagedSentenceHtml}</SelectableText> */}
        {tagedSentenceHtml}
      </BookText>
      {parseHtmlTags(nextHtml, textStyle)}
    </>
  );
}

const createStyles = (textStyle) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 7,
    },
    paragraphContainer: {
      marginBottom: 10,
      textAlign: 'right',
    },
  });
