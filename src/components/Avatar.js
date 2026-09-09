import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

/**
 * Shows a photo when `source` is given (e.g. require('../../assets/avatars/student.png')),
 * otherwise falls back to a colored circle with the person's initial.
 *
 * To swap in a real photo later: just replace the file at
 * assets/avatars/<role>.png with the real photo (same filename) —
 * no code changes needed.
 */
export default function Avatar({ name = '', size = 48, bg = colors.secondarySoft, color = colors.primaryDark, source }) {
  if (source) {
    return (
      <Image
        source={source}
        style={{ width: size, height: size, borderRadius: size / 2 }}
        resizeMode="cover"
      />
    );
  }

  const initial = name?.trim()?.charAt(0) || '?';
  return (
    <View
      style={[
        styles.circle,
        { width: size, height: size, borderRadius: size / 2, backgroundColor: bg },
      ]}
    >
      <Text style={[styles.text, { fontSize: size * 0.4, color }]}>{initial}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: fonts.semiBold,
  },
});
