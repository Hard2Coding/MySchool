import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import {
  STUDENT,
  TEACHER,
  MOOD_SCALE,
  WELLNESS_HISTORY,
  WELLNESS_SETTINGS,
  WELLNESS_DISCLAIMER,
  MENTAL_HEALTH_HOTLINE,
} from '../../data/mockData';

const STRESS_LEVELS = [1, 2, 3, 4, 5];

function summarize(history) {
  const answered = history.filter((d) => d.mood != null);
  if (answered.length === 0) return null;
  const avgMood = answered.reduce((s, d) => s + d.mood, 0) / answered.length;
  const avgStress = answered.reduce((s, d) => s + d.stress, 0) / answered.length;
  let moodText;
  if (avgMood >= 4) moodText = 'อารมณ์โดยรวมค่อนข้างดี 🙂';
  else if (avgMood >= 3) moodText = 'อารมณ์โดยรวมอยู่ในเกณฑ์ปานกลาง 😐';
  else moodText = 'ช่วงนี้อารมณ์ดูลดลงกว่าปกติ ลองดูแลตัวเองเพิ่มขึ้นสักหน่อยนะ';
  return { avgMood, avgStress, moodText, checkedIn: answered.length };
}

export default function WellnessScreen({ navigation }) {
  const [version, setVersion] = useState(0); // bump to re-render after mutating module-level store
  const todayIndex = WELLNESS_HISTORY.length - 1;
  const today = WELLNESS_HISTORY[todayIndex];
  const alreadyCheckedInToday = today.mood != null;

  const [pendingMood, setPendingMood] = useState(null);
  const [pendingStress, setPendingStress] = useState(null);

  const summary = summarize(WELLNESS_HISTORY);

  const submitCheckIn = () => {
    if (pendingMood == null || pendingStress == null) return;
    WELLNESS_HISTORY[todayIndex] = { ...today, mood: pendingMood, stress: pendingStress };
    setVersion((v) => v + 1);
  };

  const toggleShare = () => {
    WELLNESS_SETTINGS.shareWithParent = !WELLNESS_SETTINGS.shareWithParent;
    setVersion((v) => v + 1);
  };

  const talkToTeacher = () => {
    navigation.navigate('SharedChat', {
      personaName: TEACHER.name,
      personaSubtitle: 'ครูที่ปรึกษา · พร้อมรับฟัง',
      systemPrompt: `คุณคือครูที่ปรึกษาชื่อ ${TEACHER.name} กำลังแชทคุยกับนักเรียนชื่อ ${STUDENT.firstName} ที่อยากมีคนรับฟัง บทสนทนานี้เป็นเรื่องความรู้สึกและความเป็นอยู่ ไม่ใช่เรื่องการเรียน ตอบด้วยความเข้าใจ อบอุ่น รับฟังก่อนให้คำแนะนำ ใช้ภาษาไทยเป็นกันเอง ประโยคสั้นๆ ไม่ต้องรีบแก้ปัญหา ถามคำถามเปิดเพื่อให้นักเรียนได้ระบายก่อน`,
      starterText: `สวัสดีจ้ะ${STUDENT.firstName} ครูอยู่ตรงนี้นะ วันนี้เป็นยังไงบ้าง อยากเล่าอะไรให้ครูฟังไหม?`,
    });
  };

  const callHotline = () => {
    Linking.openURL(`tel:${MENTAL_HEALTH_HOTLINE.phone}`).catch(() => {});
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="🌱 Mental Wellness" subtitle="เช็กอินความรู้สึกประจำวัน" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {!alreadyCheckedInToday ? (
          <Card style={styles.checkinCard}>
            <Text style={styles.checkinTitle}>วันนี้รู้สึกยังไง?</Text>
            <View style={styles.moodRow}>
              {MOOD_SCALE.map((m) => (
                <TouchableOpacity
                  key={m.value}
                  style={[styles.moodBtn, pendingMood === m.value && styles.moodBtnActive]}
                  onPress={() => setPendingMood(m.value)}
                >
                  <Text style={styles.moodEmoji}>{m.emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.checkinTitle, { marginTop: 22 }]}>วันนี้เครียดแค่ไหน?</Text>
            <View style={styles.stressRow}>
              {STRESS_LEVELS.map((n) => (
                <TouchableOpacity
                  key={n}
                  style={[styles.stressBtn, pendingStress === n && styles.stressBtnActive]}
                  onPress={() => setPendingStress(n)}
                >
                  <Text style={[styles.stressText, pendingStress === n && { color: colors.white }]}>{n}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.stressLabelRow}>
              <Text style={styles.stressLabelText}>ไม่เครียดเลย</Text>
              <Text style={styles.stressLabelText}>เครียดมาก</Text>
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, (pendingMood == null || pendingStress == null) && styles.submitBtnDisabled]}
              disabled={pendingMood == null || pendingStress == null}
              onPress={submitCheckIn}
            >
              <Text style={styles.submitBtnText}>บันทึกวันนี้ (ใช้เวลาไม่ถึงนาที)</Text>
            </TouchableOpacity>
          </Card>
        ) : (
          <Card style={styles.doneCard}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.doneText}>เช็กอินวันนี้แล้ว ขอบคุณที่แวะมาเล่าให้ฟังนะ</Text>
          </Card>
        )}

        {summary && (
          <>
            <Text style={styles.sectionTitle}>ภาพรวม 7 วันที่ผ่านมา</Text>
            <Card>
              <Text style={styles.summaryHeadline}>{summary.moodText}</Text>

              <View style={styles.weekRow}>
                {WELLNESS_HISTORY.map((d, i) => {
                  const meta = MOOD_SCALE.find((m) => m.value === d.mood);
                  return (
                    <View key={i} style={styles.weekCell}>
                      <View style={[styles.weekBubble, d.mood == null && styles.weekBubbleEmpty]}>
                        <Text style={styles.weekEmoji}>{meta ? meta.emoji : '·'}</Text>
                      </View>
                      <Text style={styles.weekDay}>{d.day}</Text>
                    </View>
                  );
                })}
              </View>

              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{summary.avgStress.toFixed(1)}/5</Text>
                  <Text style={styles.statLabel}>ความเครียดเฉลี่ย</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{summary.checkedIn}/7</Text>
                  <Text style={styles.statLabel}>เช็กอินแล้ว</Text>
                </View>
              </View>
            </Card>
          </>
        )}

        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
          <Text style={styles.disclaimerText}>{WELLNESS_DISCLAIMER}</Text>
        </View>

        <Card style={styles.shareRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.shareLabel}>แชร์ข้อมูลนี้ให้ผู้ปกครองเห็น</Text>
            <Text style={styles.shareSub}>ผู้ปกครองจะเห็นเฉพาะภาพรวม ไม่เห็นคำตอบรายวัน</Text>
          </View>
          <Switch
            value={WELLNESS_SETTINGS.shareWithParent}
            onValueChange={toggleShare}
            trackColor={{ false: colors.border, true: colors.primarySoft }}
            thumbColor={WELLNESS_SETTINGS.shareWithParent ? colors.primary : '#fff'}
          />
        </Card>

        <Text style={styles.sectionTitle}>อยากคุยกับใครสักคน?</Text>
        <Card style={{ gap: 12 }}>
          <TouchableOpacity style={styles.supportRow} activeOpacity={0.8} onPress={talkToTeacher}>
            <View style={styles.supportIcon}>
              <Ionicons name="chatbubble-ellipses" size={17} color={colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>คุยกับครูที่ปรึกษา</Text>
              <Text style={styles.supportSub}>{TEACHER.name} · พร้อมรับฟัง</Text>
            </View>
            <Ionicons name="chevron-forward" size={17} color={colors.textFaint} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.supportRow} activeOpacity={0.8} onPress={callHotline}>
            <View style={[styles.supportIcon, { backgroundColor: colors.secondaryDark }]}>
              <Ionicons name="call" size={16} color={colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.supportTitle}>{MENTAL_HEALTH_HOTLINE.name}</Text>
              <Text style={styles.supportSub}>โทร {MENTAL_HEALTH_HOTLINE.phone} · {MENTAL_HEALTH_HOTLINE.note}</Text>
            </View>
            <Ionicons name="chevron-forward" size={17} color={colors.textFaint} />
          </TouchableOpacity>

          <Text style={styles.urgentNote}>ถ้าเป็นเรื่องเร่งด่วน ควรบอกผู้ใหญ่ที่ไว้ใจได้ทันที</Text>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  checkinCard: {},
  checkinTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text, marginBottom: 14, textAlign: 'center' },
  moodRow: { flexDirection: 'row', justifyContent: 'space-between' },
  moodBtn: {
    width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.bg, borderWidth: 1.5, borderColor: 'transparent',
  },
  moodBtnActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  moodEmoji: { fontSize: 26 },

  stressRow: { flexDirection: 'row', justifyContent: 'space-between' },
  stressBtn: {
    width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.bg, borderWidth: 1.5, borderColor: colors.border,
  },
  stressBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  stressText: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text },
  stressLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, paddingHorizontal: 2 },
  stressLabelText: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textFaint },

  submitBtn: {
    height: 48, borderRadius: radius.md, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginTop: 24,
  },
  submitBtnDisabled: { opacity: 0.35 },
  submitBtnText: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.white },

  doneCard: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: colors.successSoft, borderColor: colors.successSoft },
  doneText: { flex: 1, fontFamily: fonts.medium, fontSize: 13, color: colors.text },

  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text, marginTop: 22, marginBottom: 10 },
  summaryHeadline: { fontFamily: fonts.medium, fontSize: 14, color: colors.text, marginBottom: 16, lineHeight: 20 },

  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  weekCell: { alignItems: 'center', gap: 6 },
  weekBubble: {
    width: 32, height: 32, borderRadius: 16, backgroundColor: colors.bg,
    alignItems: 'center', justifyContent: 'center',
  },
  weekBubbleEmpty: { borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed' },
  weekEmoji: { fontSize: 16 },
  weekDay: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted },

  statsRow: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, backgroundColor: colors.bg, borderRadius: radius.md, paddingVertical: 12, alignItems: 'center' },
  statValue: { fontFamily: fonts.bold, fontSize: 17, color: colors.text },
  statLabel: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, marginTop: 3 },

  disclaimerBox: {
    flexDirection: 'row', gap: 8, backgroundColor: colors.bg, borderRadius: radius.md,
    padding: 12, marginTop: 16, alignItems: 'flex-start',
  },
  disclaimerText: { flex: 1, fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, lineHeight: 17 },

  shareRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  shareLabel: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  shareSub: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },

  supportRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  supportIcon: {
    width: 38, height: 38, borderRadius: 12, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  supportTitle: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  supportSub: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  urgentNote: { fontFamily: fonts.regular, fontSize: 11, color: colors.textFaint, textAlign: 'center' },
});
