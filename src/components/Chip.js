import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/typography';

const TONES = {
  primary: { bg: colors.primarySoft, fg: colors.primaryDark },
  secondary: { bg: colors.secondarySoft, fg: colors.secondaryDark },
  success: { bg: colors.successSoft, fg: colors.success },
  danger: { bg: colors.dangerSoft, fg: colors.danger },
  warning: { bg: colors.warningSoft, fg: colors.warning },
  info: { bg: colors.infoSoft, fg: colors.info },
  neutral: { bg: colors.bg, fg: colors.textMuted },
};

export default function Chip({ label, tone = 'primary', style }) {
  const t = TONES[tone] || TONES.primary;
  return (
    <View style={[styles.chip, { backgroundColor: t.bg }, style]}>
      <Text style={[styles.text, { color: t.fg }]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 11.5,
  },
});
