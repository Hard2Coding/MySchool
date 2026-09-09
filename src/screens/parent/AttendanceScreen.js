import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { ATTENDANCE_SUMMARY } from '../../data/mockData';

const WEEKDAYS = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];
const STATUS_META = {
  present: { color: colors.success, label: 'มาเรียน' },
  late: { color: colors.warning, label: 'มาสาย' },
  absent: { color: colors.danger, label: 'ขาดเรียน' },
  leave: { color: colors.info, label: 'ลากิจ/ลาป่วย' },
};

// Build a mock June 2569 (2024) calendar — first day is Saturday, 30 days.
function buildMonth() {
  const firstWeekday = 6; // Sat
  const daysInMonth = 30;
  const specialStatus = { 3: 'late', 8: 'late', 15: 'leave' };
  const cells = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const weekdayIdx = (firstWeekday + d - 1) % 7;
    const isWeekend = weekdayIdx === 0 || weekdayIdx === 6;
    cells.push({
      day: d,
      status: isWeekend ? null : specialStatus[d] || 'present',
    });
  }
  return cells;
}

export default function AttendanceScreen({ navigation }) {
  const cells = useMemo(buildMonth, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="การเข้าเรียน" subtitle="มิถุนายน 2569" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.weekRow}>
            {WEEKDAYS.map((w) => (
              <Text key={w} style={styles.weekLabel}>{w}</Text>
            ))}
          </View>
          <View style={styles.grid}>
            {cells.map((c, i) => (
              <View key={i} style={styles.cell}>
                {c && (
                  <>
                    <Text style={styles.cellDay}>{c.day}</Text>
                    {c.status && <View style={[styles.dot, { backgroundColor: STATUS_META[c.status].color }]} />}
                  </>
                )}
              </View>
            ))}
          </View>
        </Card>

        <View style={styles.legendRow}>
          {Object.entries(STATUS_META).map(([key, meta]) => (
            <View key={key} style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: meta.color }]} />
              <Text style={styles.legendText}>{meta.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>สรุปสถิติเดือนนี้</Text>
        <Card style={{ gap: 0 }}>
          <SummaryRow label="มาเรียน" value={`${ATTENDANCE_SUMMARY.present} วัน`} />
          <SummaryRow label="ขาดเรียน" value={`${ATTENDANCE_SUMMARY.absent} วัน`} />
          <SummaryRow label="มาสาย" value={`${ATTENDANCE_SUMMARY.late} ครั้ง`} />
          <SummaryRow label="ลาป่วย / ลากิจ" value={`${ATTENDANCE_SUMMARY.sickLeave + ATTENDANCE_SUMMARY.personalLeave} ครั้ง`} last />
        </Card>
      </ScrollView>
    </View>
  );
}

function SummaryRow({ label, value, last }) {
  return (
    <View style={[styles.summaryRow, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const CELL_SIZE = '14.28%';

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  weekRow: { flexDirection: 'row', marginBottom: 8 },
  weekLabel: { width: CELL_SIZE, textAlign: 'center', fontFamily: fonts.medium, fontSize: 11.5, color: colors.textMuted },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: { width: CELL_SIZE, aspectRatio: 1, alignItems: 'center', justifyContent: 'center' },
  cellDay: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.text },
  dot: { width: 5, height: 5, borderRadius: 2.5, marginTop: 2 },

  legendRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, marginTop: 14, paddingHorizontal: 4 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted },

  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text, marginTop: 22, marginBottom: 10 },
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  summaryLabel: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted },
  summaryValue: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text },
});
