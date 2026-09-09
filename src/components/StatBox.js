import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/typography';

export default function StatBox({ label, value, suffix, tone = 'primary', icon }) {
  const toneColor =
    tone === 'danger' ? colors.danger : tone === 'success' ? colors.success : tone === 'warning' ? colors.warning : colors.primary;

  return (
    <Card style={styles.card} padded={false}>
      <View style={styles.inner}>
        {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
        <Text style={[styles.value, { color: toneColor }]} numberOfLines={1} adjustsFontSizeToFit>
          {value}
          {suffix ? <Text style={styles.suffix}> {suffix}</Text> : null}
        </Text>
        <Text style={styles.label} numberOfLines={1}>{label}</Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  inner: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: 'flex-start',
  },
  iconWrap: {
    marginBottom: 6,
  },
  value: {
    fontFamily: fonts.bold,
    fontSize: 22,
  },
  suffix: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.textMuted,
  },
  label: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 2,
  },
});
