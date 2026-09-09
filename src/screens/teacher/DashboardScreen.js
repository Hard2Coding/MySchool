import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { TEACHER, TEACHER_TODAY, TEACHER_STATS, AT_RISK_STUDENTS } from '../../data/mockData';

const TOOLS = [
  { key: 'attendance', label: 'เช็กชื่อ', icon: 'checkmark-done-outline', screen: 'TeacherAttendance' },
  { key: 'announce', label: 'สร้างประกาศ', icon: 'megaphone-outline', screen: 'CreateAnnouncement' },
  { key: 'quiz', label: 'สร้างแบบทดสอบ', icon: 'document-text-outline', screen: 'AIQuiz' },
  { key: 'scores', label: 'บันทึกคะแนน', icon: 'create-outline', screen: 'RecordScores' },
];

export default function TeacherDashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={`ยินดีต้อนรับ, ${TEACHER.name}`} subtitle={`กลุ่มสาระ${TEACHER.subjectGroup}`} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>{TEACHER_STATS.toGrade}</Text>
            <Text style={styles.statLabel}>งานที่ต้องตรวจ</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.danger }]}>{TEACHER_STATS.absentToday}</Text>
            <Text style={styles.statLabel}>ขาดเรียนวันนี้</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={[styles.statValue, { color: colors.secondaryDark }]}>{TEACHER_STATS.pendingRequests}</Text>
            <Text style={styles.statLabel}>คำร้องรอดำเนินการ</Text>
          </Card>
        </View>

        <Text style={styles.sectionTitle}>ตารางสอนวันนี้</Text>
        <Card>
          {TEACHER_TODAY.map((s, i) => (
            <View key={i} style={[styles.scheduleRow, i === TEACHER_TODAY.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.timeBadge}><Text style={styles.timeText}>{s.time}</Text></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.scheduleSubject}>{s.subject}</Text>
                <Text style={styles.scheduleRoom}>{s.room} · {s.location}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Text style={styles.sectionTitle}>เครื่องมือครู</Text>
        <View style={styles.toolsGrid}>
          {TOOLS.map((t) => (
            <TouchableOpacity
              key={t.key}
              style={styles.toolItem}
              activeOpacity={0.8}
              onPress={() => t.screen && navigation.navigate(t.screen)}
            >
              <View style={styles.toolIcon}>
                <Ionicons name={t.icon} size={20} color={colors.primary} />
              </View>
              <Text style={styles.toolLabel}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.aiCta} activeOpacity={0.85} onPress={() => navigation.navigate('TeacherAI')}>
          <View style={styles.aiIcon}><Ionicons name="sparkles" size={20} color={colors.white} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.aiTitle}>AI Teacher Copilot</Text>
            <Text style={styles.aiSub}>ช่วยวิเคราะห์นักเรียนที่ควรติดตาม พร้อมแนะนำสิ่งที่ครูควรทำต่อ</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.white} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>นักเรียนกลุ่มเสี่ยง (AI Early Warning)</Text>
        <Card style={{ gap: 12 }}>
          {AT_RISK_STUDENTS.map((s) => (
            <View key={s.id} style={styles.riskRow}>
              <Ionicons name="warning-outline" size={18} color={colors.danger} style={{ marginTop: 2 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.riskName}>{s.name}</Text>
                <Text style={styles.riskReason}>{s.room} · {s.reason}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.advisoryLink} onPress={() => navigation.navigate('Advisory')}>
            <Text style={styles.advisoryLinkText}>ดูนักเรียนในความดูแลทั้งหมด</Text>
            <Ionicons name="chevron-forward" size={15} color={colors.primary} />
          </TouchableOpacity>
        </Card>

        <TouchableOpacity style={styles.healthCta} activeOpacity={0.85} onPress={() => navigation.navigate('HealthWarning')}>
          <View style={styles.healthIcon}><Ionicons name="pulse" size={20} color={colors.white} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.healthTitle}>Health Warning</Text>
            <Text style={styles.healthSub}>รวมสัญญาณเช็กอิน การเข้าเรียน คะแนน และงาน — ไม่ใช่การวินิจฉัย ครูตัดสินใจขั้นสุดท้าย</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.white} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 6 },
  statCard: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statValue: { fontFamily: fonts.bold, fontSize: 22, color: colors.text },
  statLabel: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, marginTop: 4, textAlign: 'center' },

  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text, marginTop: 22, marginBottom: 10 },

  scheduleRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  timeBadge: { backgroundColor: colors.secondarySoft, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8 },
  timeText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.secondaryDark },
  scheduleSubject: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  scheduleRoom: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },

  toolsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  toolItem: {
    width: '47%', backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border,
    padding: 14, alignItems: 'flex-start', gap: 10,
  },
  toolIcon: {
    width: 38, height: 38, borderRadius: 12, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  toolLabel: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },

  aiCta: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 18,
    backgroundColor: colors.primary, borderRadius: radius.lg, padding: 16,
  },
  aiIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  aiTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.white },
  aiSub: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', marginTop: 2 },

  healthCta: {
    flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 14,
    backgroundColor: colors.secondaryDark, borderRadius: radius.lg, padding: 16,
  },
  healthIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  healthTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.white },
  healthSub: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.9)', marginTop: 2, lineHeight: 16 },

  riskRow: { flexDirection: 'row', gap: 10 },
  riskName: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  riskReason: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  advisoryLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingTop: 4 },
  advisoryLinkText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.primary },
});
