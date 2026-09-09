import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { TEACHER_CLASS_FEED, STUDENT_ROSTERS } from '../../data/mockData';
import { askGeminiOnce } from '../../services/gemini';

const TABS = [
  { key: 'feed', label: 'ประกาศ' },
  { key: 'roster', label: 'รายชื่อนักเรียน' },
  { key: 'lesson', label: 'บทเรียน AI' },
];

export default function TeacherClassDetailScreen({ route, navigation }) {
  const { classItem } = route.params;
  const [tab, setTab] = useState('feed');

  // Re-read from the store each render so a newly-posted announcement shows up
  const feed = TEACHER_CLASS_FEED[classItem.id] || [];
  const roster = STUDENT_ROSTERS[classItem.id] || [];

  // ── Lesson AI state ──
  const [lessonText, setLessonText] = useState('');
  const [summary, setSummary] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [quizLoading, setQuizLoading] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(true);
  const [quizOpen, setQuizOpen] = useState(true);

  const generateSummary = async () => {
    if (!lessonText.trim()) return;
    setSummaryLoading(true);
    setSummary('');
    try {
      const prompt = `สรุปเนื้อหาบทเรียนต่อไปนี้ให้กระชับ เข้าใจง่าย ไม่เกิน 5 ประโยค ภาษาไทย สำหรับนักเรียนมัธยม:\n\n${lessonText}`;
      const result = await askGeminiOnce(prompt);
      setSummary(result);
      setSummaryOpen(true);
    } catch (e) {
      setSummary(`⚠ ${e.message}`);
    } finally {
      setSummaryLoading(false);
    }
  };

  const generateQuiz = async () => {
    if (!lessonText.trim()) return;
    setQuizLoading(true);
    setQuiz([]);
    try {
      const prompt = `สร้างคำถามแบบปรนัย 5 ข้อ จากเนื้อหาต่อไปนี้ ภาษาไทย สำหรับนักเรียนมัธยม\nแต่ละข้อมีตัวเลือก ก, ข, ค, ง และระบุคำตอบที่ถูกต้อง\nตอบในรูปแบบ:\nข้อ 1: [คำถาม]\nก) [ตัวเลือก]\nข) [ตัวเลือก]\nค) [ตัวเลือก]\nง) [ตัวเลือก]\nเฉลย: [ตัวอักษร]\n\nเนื้อหา:\n${lessonText}`;
      const result = await askGeminiOnce(prompt);
      // Split raw text into question blocks
      const blocks = result.split(/(?=ข้อ \d+:)/).filter((b) => b.trim());
      setQuiz(blocks);
      setQuizOpen(true);
    } catch (e) {
      setQuiz([`⚠ ${e.message}`]);
    } finally {
      setQuizLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScreenHeader
        title={classItem.name}
        subtitle={`${classItem.room} · นักเรียน ${roster.length} คน`}
        onBack={() => navigation.goBack()}
        showBell={false}
      />

      {/* Tab bar */}
      <View style={styles.tabRow}>
        {TABS.map((t) => (
          <TouchableOpacity key={t.key} style={styles.tabBtn} onPress={() => setTab(t.key)}>
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
            {tab === t.key && <View style={styles.tabIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* ── Feed ── */}
        {tab === 'feed' && (
          <>
            <TouchableOpacity
              style={styles.newBtn}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('CreateAnnouncement', { classItem })}
            >
              <Ionicons name="add-circle" size={18} color={colors.white} />
              <Text style={styles.newBtnText}>สร้างประกาศใหม่</Text>
            </TouchableOpacity>

            {feed.length === 0 ? (
              <Text style={styles.emptyText}>ยังไม่มีประกาศในรายวิชานี้</Text>
            ) : (
              feed.map((a) => (
                <Card key={a.id} style={{ marginBottom: 12 }}>
                  <View style={{ flexDirection: 'row', gap: 10 }}>
                    <Ionicons name="megaphone-outline" size={18} color={colors.primary} style={{ marginTop: 2 }} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.announceTitle}>{a.title}</Text>
                      <Text style={styles.announceBody}>{a.body}</Text>
                      <Text style={styles.announceDate}>โพสต์เมื่อ {a.date}</Text>
                    </View>
                  </View>
                </Card>
              ))
            )}
          </>
        )}

        {/* ── Roster ── */}
        {tab === 'roster' && (
          <Card padded={false}>
            {roster.map((s, i) => (
              <View
                key={s.id}
                style={[styles.rosterRow, i === roster.length - 1 && { borderBottomWidth: 0 }]}
              >
                <Avatar name={s.name} size={36} />
                <Text style={styles.rosterName}>{s.name}</Text>
              </View>
            ))}
          </Card>
        )}

        {/* ── Lesson AI ── */}
        {tab === 'lesson' && (
          <>
            {/* AI banner */}
            <View style={styles.aiBanner}>
              <View style={styles.aiBannerIcon}>
                <Ionicons name="sparkles" size={20} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.aiBannerTitle}>AI ช่วยสร้างบทเรียน</Text>
                <Text style={styles.aiBannerSub}>วางเนื้อหาบทเรียน แล้วให้ AI สรุปและสร้างข้อสอบให้อัตโนมัติ</Text>
              </View>
            </View>

            {/* Lesson input */}
            <Text style={styles.inputLabel}>เนื้อหาบทเรียน</Text>
            <TextInput
              style={styles.lessonInput}
              multiline
              numberOfLines={8}
              placeholder="วางหรือพิมพ์เนื้อหาบทเรียนที่นี่..."
              placeholderTextColor={colors.textFaint}
              value={lessonText}
              onChangeText={setLessonText}
              textAlignVertical="top"
            />

            {/* Action buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnPrimary, (!lessonText.trim() || summaryLoading) && { opacity: 0.5 }]}
                onPress={generateSummary}
                disabled={!lessonText.trim() || summaryLoading}
              >
                {summaryLoading ? (
                  <ActivityIndicator size="small" color={colors.white} />
                ) : (
                  <Ionicons name="document-text-outline" size={16} color={colors.white} />
                )}
                <Text style={styles.actionBtnText}>สรุปบทเรียน</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnSecondary, (!lessonText.trim() || quizLoading) && { opacity: 0.5 }]}
                onPress={generateQuiz}
                disabled={!lessonText.trim() || quizLoading}
              >
                {quizLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <Ionicons name="help-circle-outline" size={16} color={colors.primary} />
                )}
                <Text style={[styles.actionBtnText, { color: colors.primary }]}>สร้างข้อสอบ</Text>
              </TouchableOpacity>
            </View>

            {/* Summary result */}
            {summary !== '' && (
              <Card style={{ marginTop: 20 }}>
                <TouchableOpacity
                  style={styles.collapseHeader}
                  onPress={() => setSummaryOpen((v) => !v)}
                >
                  <View style={styles.collapseLeft}>
                    <Ionicons name="document-text" size={16} color={colors.primary} />
                    <Text style={styles.collapseTitle}>สรุปบทเรียน</Text>
                  </View>
                  <Ionicons name={summaryOpen ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
                </TouchableOpacity>
                {summaryOpen && (
                  <Text style={styles.resultText}>{summary}</Text>
                )}
              </Card>
            )}

            {/* Quiz result */}
            {quiz.length > 0 && (
              <Card style={{ marginTop: 16, marginBottom: 20 }}>
                <TouchableOpacity
                  style={styles.collapseHeader}
                  onPress={() => setQuizOpen((v) => !v)}
                >
                  <View style={styles.collapseLeft}>
                    <Ionicons name="help-circle" size={16} color={colors.secondary} />
                    <Text style={styles.collapseTitle}>ข้อสอบที่สร้างโดย AI</Text>
                  </View>
                  <Ionicons name={quizOpen ? 'chevron-up' : 'chevron-down'} size={16} color={colors.textMuted} />
                </TouchableOpacity>
                {quizOpen &&
                  quiz.map((block, i) => (
                    <View key={i} style={[styles.quizBlock, i < quiz.length - 1 && styles.quizBlockBorder]}>
                      <Text style={styles.resultText}>{block.trim()}</Text>
                    </View>
                  ))}
              </Card>
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  tabRow: {
    flexDirection: 'row', paddingHorizontal: 20,
    borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.bg,
  },
  tabBtn: { marginRight: 22, paddingBottom: 10 },
  tabText: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.textMuted },
  tabTextActive: { color: colors.primary },
  tabIndicator: { height: 2, backgroundColor: colors.primary, borderRadius: 2, marginTop: 6 },
  scroll: { padding: 20, paddingBottom: 60 },

  newBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 46, borderRadius: radius.md, backgroundColor: colors.primary, marginBottom: 16,
  },
  newBtnText: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.white },
  emptyText: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: 20 },
  announceTitle: { fontFamily: fonts.medium, fontSize: 14, color: colors.text },
  announceBody: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted, marginTop: 4, lineHeight: 18 },
  announceDate: { fontFamily: fonts.regular, fontSize: 11, color: colors.textFaint, marginTop: 6 },
  rosterRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  rosterName: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },

  // ── AI Lesson tab ──
  aiBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.primarySoft, borderRadius: radius.md, padding: 14, marginBottom: 20,
  },
  aiBannerIcon: {
    width: 40, height: 40, borderRadius: 20, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  aiBannerTitle: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.primaryDark },
  aiBannerSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.primary, marginTop: 2, lineHeight: 17 },
  inputLabel: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.text, marginBottom: 8 },
  lessonInput: {
    borderWidth: 1, borderColor: colors.border, borderRadius: radius.md,
    backgroundColor: colors.surface, padding: 14, fontFamily: fonts.regular,
    fontSize: 13.5, color: colors.text, lineHeight: 21, minHeight: 160,
  },
  actionRow: { flexDirection: 'row', gap: 12, marginTop: 14 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 46, borderRadius: radius.md,
  },
  actionBtnPrimary: { backgroundColor: colors.primary },
  actionBtnSecondary: { backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.primary },
  actionBtnText: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.white },

  collapseHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 },
  collapseLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  collapseTitle: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text },
  resultText: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.text, lineHeight: 22 },
  quizBlock: { paddingVertical: 12 },
  quizBlockBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
});
