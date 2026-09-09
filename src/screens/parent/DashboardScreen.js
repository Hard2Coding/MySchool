import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { PARENT, STUDENT, ATTENDANCE_SUMMARY, PARENT_AI_SUMMARY } from '../../data/mockData';

const TILES = [
  { key: 'schedule', label: 'ตารางเรียน', icon: 'calendar-outline', screen: 'Attendance' },
  { key: 'grades', label: 'ผลการเรียน', icon: 'bar-chart-outline', screen: 'ParentGrades' },
  { key: 'homework', label: 'งาน/การบ้าน', icon: 'document-text-outline', screen: 'ParentHomework' },
  { key: 'payment', label: 'ค่าธรรมเนียม', icon: 'card-outline', screen: 'ParentPayment' },
  { key: 'wellness', label: '💛 สุขภาวะของบุตร', icon: 'heart-outline', screen: 'ChildWellness' },
];

export default function ParentDashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={`สวัสดี, ${PARENT.name}`} subtitle="ผู้ปกครอง" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.childCard}>
          <View style={styles.childRow}>
            <Avatar name={STUDENT.name} size={52} />
            <View style={{ flex: 1 }}>
              <Text style={styles.childName}>{STUDENT.name}</Text>
              <Text style={styles.childSub}>{STUDENT.room} · รหัส {STUDENT.id}</Text>
            </View>
            <TouchableOpacity style={styles.switchPill}>
              <Text style={styles.switchPillText}>ภาคเรียนที่ 1/2569</Text>
              <Ionicons name="chevron-down" size={13} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </Card>

        <TouchableOpacity style={styles.aiBox} activeOpacity={0.86} onPress={() => navigation.navigate('AIFamilyAdvisor')}>
          <View style={styles.aiIconWrap}>
            <Ionicons name="sparkles" size={18} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>🤖 AI Family Advisor</Text>
            <Text style={styles.aiBody}>{PARENT_AI_SUMMARY}</Text>
            <Text style={styles.aiLink}>ดูว่า “วันนี้ช่วยลูกเรียนอะไรดี?” →</Text>
          </View>
          <Ionicons name="chevron-forward" size={17} color={colors.secondaryDark} />
        </TouchableOpacity>

        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{ATTENDANCE_SUMMARY.rate}%</Text>
            <Text style={styles.statLabel}>การเข้าเรียน (เดือนนี้)</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{STUDENT.gpa.toFixed(2)}</Text>
            <Text style={styles.statLabel}>เกรดเฉลี่ย (GPA)</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, STUDENT.behaviorScore < 80 && { color: colors.danger }]}>{STUDENT.behaviorScore}/100</Text>
            <Text style={styles.statLabel}>คะแนนคุณลักษณะ</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>เมนูด่วน</Text>
        <View style={styles.tilesGrid}>
          {TILES.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={styles.tile}
              activeOpacity={0.8}
              onPress={() => t.screen && navigation.navigate(t.screen)}
            >
              <View style={styles.tileIcon}><Ionicons name={t.icon} size={20} color={colors.primary} /></View>
              <Text style={styles.tileLabel}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.attendanceCta} activeOpacity={0.85} onPress={() => navigation.navigate('Attendance')}>
          <Ionicons name="calendar" size={18} color={colors.primary} />
          <Text style={styles.attendanceCtaText}>ดูปฏิทินการเข้าเรียนทั้งหมด</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  childCard: {},
  childRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  childName: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text },
  childSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  switchPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.bg,
    paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill,
  },
  switchPillText: { fontFamily: fonts.medium, fontSize: 10.5, color: colors.textMuted },

  aiBox: {
    flexDirection: 'row', gap: 12, backgroundColor: colors.secondarySoft, borderRadius: radius.lg,
    padding: 16, marginTop: 14,
  },
  aiIconWrap: {
    width: 34, height: 34, borderRadius: 11, backgroundColor: colors.secondaryDark,
    alignItems: 'center', justifyContent: 'center',
  },
  aiTitle: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text, marginBottom: 4 },
  aiBody: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.text, lineHeight: 19 },
  aiLink: { fontFamily: fonts.semiBold, fontSize: 11.5, color: colors.secondaryDark, marginTop: 8 },

  statsRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statValue: { fontFamily: fonts.bold, fontSize: 18, color: colors.text },
  statLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 4, textAlign: 'center' },

  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text, marginTop: 22, marginBottom: 10 },
  tilesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tile: {
    width: '47%', backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: 14, alignItems: 'flex-start', gap: 10,
  },
  tileIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  tileLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },

  attendanceCta: {
    flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16,
    backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 15,
  },
  attendanceCtaText: { flex: 1, fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
});
