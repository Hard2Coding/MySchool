import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { CLASS_DETAIL } from '../../data/mockData';

const TABS = [
  { key: 'feed', label: 'หน้าหลัก' },
  { key: 'content', label: 'เนื้อหา' },
  { key: 'assignments', label: 'งาน' },
  { key: 'grades', label: 'คะแนน' },
];

const FILE_ICONS = { pdf: 'document-text-outline', pptx: 'easel-outline', video: 'play-circle-outline' };

export default function ClassDetailScreen({ route, navigation }) {
  const { classItem } = route.params;
  const [tab, setTab] = useState('feed');
  const detail = CLASS_DETAIL[classItem.id] || CLASS_DETAIL.c1;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={classItem.name} subtitle={classItem.teacher} onBack={() => navigation.goBack()} showBell={false} />

      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity key={t.key} style={styles.tabBtn} onPress={() => setTab(t.key)}>
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
            {tab === t.key && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {tab === 'feed' && (
          <>
            <Text style={styles.sectionTitle}>ประกาศ</Text>
            {detail.announcements.map((a) => (
              <Card key={a.id} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
                  <Ionicons name="megaphone-outline" size={18} color={colors.primary} style={{ marginTop: 2 }} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.announceTitle}>{a.title}</Text>
                    <Text style={styles.announceBody}>{a.body}</Text>
                    <Text style={styles.announceDate}>ประกาศเมื่อ {a.date}</Text>
                  </View>
                </View>
              </Card>
            ))}

            <TouchableOpacity
              style={styles.aiCta}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('AIAssistant', { classItem })}
            >
              <View style={styles.aiIcon}>
                <Ionicons name="sparkles" size={20} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.aiTitle}>AI ผู้ช่วยการเรียนรู้</Text>
                <Text style={styles.aiSub}>ถาม-ตอบ สรุปเนื้อหา สร้างข้อสอบฝึกทำ</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.white} />
            </TouchableOpacity>
          </>
        )}

        {tab === 'content' && (
          <>
            <Text style={styles.sectionTitle}>เอกสารและสื่อการเรียน</Text>
            {detail.files.map((f) => (
              <Card key={f.id} style={styles.fileRow}>
                <Ionicons name={FILE_ICONS[f.type]} size={22} color={colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.fileName} numberOfLines={2}>{f.name}</Text>
                  {f.duration && <Text style={styles.fileMeta}>{f.duration}</Text>}
                </View>
                <Ionicons name="download-outline" size={18} color={colors.textMuted} />
              </Card>
            ))}
          </>
        )}

        {tab === 'assignments' && (
          <>
            <Text style={styles.sectionTitle}>งานและการบ้าน</Text>
            {detail.assignments.map((a) => (
              <Card key={a.id} style={{ marginBottom: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.assignTitle}>{a.title}</Text>
                  <Chip label={a.status} tone={a.status === 'ส่งแล้ว' ? 'success' : 'warning'} />
                </View>
                <Text style={styles.assignDue}>กำหนดส่ง {a.due}</Text>
                {a.score && <Text style={styles.assignScore}>คะแนน: {a.score}</Text>}
              </Card>
            ))}
          </>
        )}

        {tab === 'grades' && (
          <Card>
            <GradeRow label="คะแนนเก็บ" value={`${detail.grades.collected}`} />
            <GradeRow label="คะแนนสอบกลางภาค" value={`${detail.grades.midterm}`} />
            <GradeRow label="คะแนนปลายภาค" value={detail.grades.final ? `${detail.grades.final}` : 'ยังไม่มีคะแนน'} />
            <GradeRow label="รวม" value={`${detail.grades.total} / ${detail.grades.maxTotal}`} last />
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

function GradeRow({ label, value, last }) {
  return (
    <View style={[styles.gradeRow, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.gradeLabel}>{label}</Text>
      <Text style={styles.gradeValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.bg,
  },
  tabBtn: { marginRight: 22, paddingBottom: 10 },
  tabText: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.textMuted },
  tabTextActive: { color: colors.primary },
  tabIndicator: { height: 2, backgroundColor: colors.primary, borderRadius: 2, marginTop: 6 },
  scroll: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text, marginBottom: 10 },

  announceTitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.text },
  announceBody: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted, marginTop: 4, lineHeight: 18 },
  announceDate: { fontFamily: fonts.regular, fontSize: 11, color: colors.textFaint, marginTop: 6 },

  aiCta: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.primary, borderRadius: radius.lg, padding: 16, marginTop: 4,
  },
  aiIcon: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  aiTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.white },
  aiSub: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', marginTop: 2 },

  fileRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  fileName: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  fileMeta: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },

  assignTitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.text, flexShrink: 1 },
  assignDue: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 6 },
  assignScore: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.success, marginTop: 4 },

  gradeRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  gradeLabel: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted },
  gradeValue: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text },
});
