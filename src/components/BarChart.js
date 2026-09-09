import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

export default function BarChart({ data, height = 120, max = 100, barColor = colors.primary }) {
  return (
    <View style={[styles.wrap, { height }]}>
      {data.map((d, i) => (
        <View key={i} style={styles.barCol}>
          <Text style={styles.valueLabel}>{d.value}</Text>
          <View style={styles.track}>
            <View
              style={[
                styles.bar,
                {
                  height: `${Math.max(4, (d.value / max) * 100)}%`,
                  backgroundColor: i === data.length - 1 ? colors.secondaryDark : barColor,
                },
              ]}
            />
          </View>
          <Text style={styles.xLabel}>{d.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  barCol: { flex: 1, alignItems: 'center', height: '100%', justifyContent: 'flex-end' },
  valueLabel: { fontFamily: fonts.medium, fontSize: 10, color: colors.textMuted, marginBottom: 4 },
  track: { width: 16, flex: 1, justifyContent: 'flex-end' },
  bar: { width: '100%', borderRadius: 5 },
  xLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 6 },
});
