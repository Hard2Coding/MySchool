import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import BarChart from '../../components/BarChart';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { SCHOOL_STATS, SCHOOL_ANALYTICS, ADMIN_AI_SUMMARY } from '../../data/mockData';

export default function AdminDashboardScreen({ navigation }) {
  const showInsight = (title, detail) => Alert.alert(title, detail);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ภาพรวมโรงเรียน" subtitle="School Analytics Dashboard" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.statsGrid}>
          <StatTile
            icon="school-outline"
            value={SCHOOL_STATS.students.toLocaleString()}
            label="นักเรียนทั้งหมด"
            onPress={() => navigation.navigate('ManageUsers', { userType: 'student' })}
          />
          <StatTile
            icon="person-outline"
            value={SCHOOL_STATS.teachers.toLocaleString()}
            label="ครูทั้งหมด"
            onPress={() => navigation.navigate('ManageUsers', { userType: 'teacher' })}
          />
          <StatTile
            icon="people-outline"
            value={SCHOOL_STATS.parents.toLocaleString()}
            label="ผู้ปกครอง"
            onPress={() => navigation.navigate('ManageUsers', { userType: 'parent' })}
          />
          <StatTile
            icon="pulse-outline"
            value={SCHOOL_STATS.activeToday.toLocaleString()}
            label="ใช้งานวันนี้"
            onPress={() => navigation.navigate('AuditLog')}
          />
        </View>

        <View style={styles.aiBox}>
          <View style={styles.aiIconWrap}><Ionicons name="sparkles" size={18} color={colors.white} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>AI วิเคราะห์ภาพรวมโรงเรียน</Text>
            <Text style={styles.aiBody}>{ADMIN_AI_SUMMARY}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>อัตราการเข้าเรียนรายเดือน</Text>
        <Card>
          <BarChart data={SCHOOL_ANALYTICS.attendanceByMonth} max={100} />
          <Text style={styles.chartFooter}>เฉลี่ยรวม {SCHOOL_ANALYTICS.overallAttendanceRate}%</Text>
        </Card>

        <Text style={styles.sectionTitle}>จุดที่ควรให้ความสำคัญ</Text>
        <Card style={{ gap: 4 }} padded={false}>
          <InsightRow
            icon="trending-down-outline"
            tone="danger"
            title={`วิชา${SCHOOL_ANALYTICS.lowestSubject.name} ${SCHOOL_ANALYTICS.lowestSubject.level}`}
            desc={`คะแนนเฉลี่ยต่ำสุดในโรงเรียน (${SCHOOL_ANALYTICS.lowestSubject.avg}%)`}
            onPress={() =>
              showInsight(
                `วิชา${SCHOOL_ANALYTICS.lowestSubject.name} ${SCHOOL_ANALYTICS.lowestSubject.level}`,
                `คะแนนเฉลี่ยของนักเรียนทั้งระดับชั้นอยู่ที่ ${SCHOOL_ANALYTICS.lowestSubject.avg}% ต่ำกว่าเกณฑ์ที่ตั้งไว้ (65%) แนะนำให้จัดสอนเสริมหรือทบทวนแผนการสอนร่วมกับหัวหน้ากลุ่มสาระ`
              )
            }
          />
          <InsightRow
            icon="alert-circle-outline"
            tone="warning"
            title={`ห้อง ${SCHOOL_ANALYTICS.highestAbsenceRoom.name}`}
            desc={`อัตราขาดเรียนสูงสุด (${SCHOOL_ANALYTICS.highestAbsenceRoom.rate}%)`}
            onPress={() =>
              showInsight(
                `ห้อง ${SCHOOL_ANALYTICS.highestAbsenceRoom.name}`,
                `อัตราการขาดเรียนของห้องนี้อยู่ที่ ${SCHOOL_ANALYTICS.highestAbsenceRoom.rate}% ในเดือนนี้ สูงกว่าค่าเฉลี่ยของโรงเรียน แนะนำให้ครูที่ปรึกษาติดตามและแจ้งผู้ปกครอง`
              )
            }
          />
          <InsightRow
            icon="warning-outline"
            tone="danger"
            title="นักเรียนกลุ่มเสี่ยง"
            desc={`มีนักเรียน ${SCHOOL_ANALYTICS.atRiskCount} คน ที่ AI ประเมินว่ามีความเสี่ยงด้านผลการเรียน`}
            onPress={() => navigation.navigate('ManageUsers', { userType: 'student' })}
            last
          />
        </Card>
      </ScrollView>
    </View>
  );
}

function StatTile({ icon, value, label, onPress }) {
  return (
    <TouchableOpacity style={styles.statTileWrap} activeOpacity={0.8} onPress={onPress}>
      <Card style={styles.statTile}>
        <View style={styles.statIcon}><Ionicons name={icon} size={18} color={colors.primary} /></View>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </Card>
    </TouchableOpacity>
  );
}

function InsightRow({ icon, tone, title, desc, onPress, last }) {
  const color = tone === 'danger' ? colors.danger : colors.warning;
  return (
    <TouchableOpacity
      style={[styles.insightRow, !last && styles.insightRowBorder]}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Ionicons name={icon} size={18} color={color} style={{ marginTop: 2 }} />
      <View style={{ flex: 1 }}>
        <Text style={styles.insightTitle}>{title}</Text>
        <Text style={styles.insightDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statTileWrap: { width: '47%' },
  statTile: { alignItems: 'flex-start', gap: 8 },
  statIcon: { width: 34, height: 34, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontFamily: fonts.bold, fontSize: 20, color: colors.text },
  statLabel: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted },

  aiBox: {
    flexDirection: 'row', gap: 12, backgroundColor: colors.secondarySoft, borderRadius: radius.lg,
    padding: 16, marginTop: 16,
  },
  aiIconWrap: { width: 34, height: 34, borderRadius: 11, backgroundColor: colors.secondaryDark, alignItems: 'center', justifyContent: 'center' },
  aiTitle: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text, marginBottom: 4 },
  aiBody: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.text, lineHeight: 19 },

  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text, marginTop: 22, marginBottom: 10 },
  chartFooter: { fontFamily: fonts.medium, fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 10 },

  insightRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingVertical: 14, paddingHorizontal: 16 },
  insightRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  insightTitle: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  insightDesc: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
