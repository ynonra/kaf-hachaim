import React from 'react';
import {StyleSheet, Share} from 'react-native';
import {IconButton} from 'react-native-paper';
import {onShare} from '../util/share';

const HeaderShareBtn = () => {
  return <IconButton color="#fff" icon="share-variant" onPress={onShare} />;
};

export default HeaderShareBtn;

const styles = StyleSheet.create({});
