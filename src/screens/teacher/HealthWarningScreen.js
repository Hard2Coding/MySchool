import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { HEALTH_WARNINGS, HEALTH_WARNING_DISCLAIMER } from '../../data/mockData';

const FILTERS = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'mental', label: 'สุขภาพใจ' },
  { key: 'physical', label: 'สุขภาพกาย' },
];

const SEVERITY_META = {
  high: { color: colors.danger, dot: '🔴' },
  medium: { color: colors.warning, dot: '🟡' },
};

export default function HealthWarningScreen({ navigation }) {
  const [filter, setFilter] = useState('all');
  const [resolved, setResolved] = useState({});

  const list = HEALTH_WARNINGS.filter((w) => filter === 'all' || w.category === filter);

  const markFollowedUp = (item) => {
    Alert.alert(
      'ทำเครื่องหมายว่าติดตามแล้ว',
      `บันทึกว่าได้พูดคุย/ติดตาม ${item.name} แล้วใช่ไหม?`,
      [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'ยืนยัน', onPress: () => setResolved((prev) => ({ ...prev, [item.id]: true })) },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="Health Warning" subtitle="สัญญาณที่ควรติดตาม" onBack={() => navigation.goBack()} showBell={false} />

      <View style={styles.filterRow}>
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[styles.filterChip, filter === f.key && styles.filterChipActive]}
            onPress={() => setFilter(f.key)}
          >
            <Text style={[styles.filterText, filter === f.key && { color: colors.white }]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
          <Text style={styles.disclaimerText}>{HEALTH_WARNING_DISCLAIMER}</Text>
        </View>

        {list.length === 0 ? (
          <Text style={styles.emptyText}>ไม่มีสัญญาณในหมวดนี้ในตอนนี้</Text>
        ) : (
          list.map((item) => {
            const meta = SEVERITY_META[item.severity];
            const isResolved = resolved[item.id];
            return (
              <Card key={item.id} style={[styles.warnCard, isResolved && styles.warnCardResolved]}>
                <View style={styles.warnHead}>
                  <Text style={styles.dot}>{meta.dot}</Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.room}>{item.room}</Text>
                  </View>
                  {isResolved && (
                    <View style={styles.resolvedBadge}>
                      <Ionicons name="checkmark" size={12} color={colors.success} />
                      <Text style={styles.resolvedText}>ติดตามแล้ว</Text>
                    </View>
                  )}
                </View>

                <View style={styles.signalsList}>
                  {item.signals.map((s, i) => (
                    <View key={i} style={styles.signalRow}>
                      <Text style={styles.signalBullet}>•</Text>
                      <Text style={styles.signalText}>{s}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.suggestionRow}>
                  <Text style={[styles.suggestionText, { color: meta.color }]}>→ {item.suggestion}</Text>
                </View>

                {!isResolved && (
                  <TouchableOpacity style={styles.followUpBtn} onPress={() => markFollowedUp(item)}>
                    <Text style={styles.followUpText}>ทำเครื่องหมายว่าได้ติดตามแล้ว</Text>
                  </TouchableOpacity>
                )}
              </Card>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, paddingBottom: 14 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text },

  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  disclaimerBox: {
    flexDirection: 'row', gap: 8, backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, padding: 12, marginBottom: 16, alignItems: 'flex-start',
  },
  disclaimerText: { flex: 1, fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, lineHeight: 17 },

  emptyText: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: 30 },

  warnCard: { marginBottom: 12 },
  warnCardResolved: { opacity: 0.55 },
  warnHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  dot: { fontSize: 13 },
  name: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },
  room: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },
  resolvedBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: colors.successSoft,
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.pill,
  },
  resolvedText: { fontFamily: fonts.medium, fontSize: 10.5, color: colors.success },

  signalsList: { gap: 5, marginBottom: 10 },
  signalRow: { flexDirection: 'row', gap: 6 },
  signalBullet: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted },
  signalText: { flex: 1, fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted, lineHeight: 18 },

  suggestionRow: { marginBottom: 4 },
  suggestionText: { fontFamily: fonts.semiBold, fontSize: 13 },

  followUpBtn: {
    marginTop: 10, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 8,
    borderRadius: radius.pill, backgroundColor: colors.bg,
  },
  followUpText: { fontFamily: fonts.medium, fontSize: 11.5, color: colors.primary },
});
