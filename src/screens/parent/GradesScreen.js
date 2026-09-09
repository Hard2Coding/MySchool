import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { GRADES, STUDENT } from '../../data/mockData';

export default function ParentGradesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ผลการเรียน" subtitle={`${STUDENT.name} · ${GRADES.semester}`} onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.summaryRow}>
          <Card style={styles.gpaCard}>
            <View style={styles.gpaCircle}>
              <Text style={styles.gpaValue}>{GRADES.gpa.toFixed(2)}</Text>
              <Text style={styles.gpaLabel}>GPA</Text>
            </View>
          </Card>
          <Card style={styles.rankCard}>
            <Text style={styles.rankValue}>{STUDENT.rank}</Text>
            <Text style={styles.rankLabel}>อันดับในห้อง</Text>
          </Card>
        </View>

        <Card padded={false} style={{ marginTop: 14 }}>
          <View style={styles.tableHead}>
            <Text style={[styles.th, { flex: 2 }]}>รายวิชา</Text>
            <Text style={[styles.th, styles.center]}>เกรด</Text>
            <Text style={[styles.th, styles.center]}>คะแนน</Text>
          </View>
          {GRADES.subjects.map((s, i) => (
            <View key={s.id} style={[styles.tableRow, i === GRADES.subjects.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={[styles.td, { flex: 2 }]} numberOfLines={1}>{s.name}</Text>
              <Text style={[styles.tdGrade, styles.center]}>{s.grade.toFixed(1)}</Text>
              <Text style={[styles.td, styles.center]}>{s.score}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  summaryRow: { flexDirection: 'row', gap: 12 },
  gpaCard: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 18 },
  gpaCircle: {
    width: 84, height: 84, borderRadius: 42, borderWidth: 6, borderColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  gpaValue: { fontFamily: fonts.bold, fontSize: 20, color: colors.primary },
  gpaLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 1 },
  rankCard: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 18 },
  rankValue: { fontFamily: fonts.bold, fontSize: 24, color: colors.secondaryDark },
  rankLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 6 },

  tableHead: {
    flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 12,
    backgroundColor: colors.bg, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg,
  },
  th: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.textMuted, flex: 1 },
  center: { textAlign: 'center' },
  tableRow: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  td: { fontFamily: fonts.regular, fontSize: 13, color: colors.text, flex: 1 },
  tdGrade: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.primary, flex: 1 },
});
