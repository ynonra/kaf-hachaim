import React from 'react';
import {SectionList, StyleSheet, Text, View} from 'react-native';

const TableOfContentsSectionList = React.forwardRef(
  ({data, renderItem}, ref) => {
    return (
      <SectionList
        sections={data}
        renderItem={renderItem}
        keyExtractor={({title}) => title}
        ref={ref}
      />
    );
  },
);

export default React.memo(
  TableOfContentsSectionList,
  (prevProps, nextProps) => prevProps.data === nextProps.data,
);
