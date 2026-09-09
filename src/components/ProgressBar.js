import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/colors';

export default function ProgressBar({ value = 0, height = 8, trackColor, fillColor }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={[styles.track, { height, backgroundColor: trackColor || colors.secondarySoft, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.fill,
          {
            width: `${pct}%`,
            height,
            backgroundColor: fillColor || colors.primary,
            borderRadius: height / 2,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
  fill: {},
});
