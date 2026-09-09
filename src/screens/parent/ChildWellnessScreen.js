import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import {
  STUDENT,
  MOOD_SCALE,
  WELLNESS_HISTORY,
  WELLNESS_SETTINGS,
  PARENT_WELLNESS_DISCLAIMER,
} from '../../data/mockData';

function summarize(history) {
  const answered = history.filter((d) => d.mood != null);
  if (answered.length === 0) return null;
  const avgMood = answered.reduce((s, d) => s + d.mood, 0) / answered.length;
  const avgStress = answered.reduce((s, d) => s + d.stress, 0) / answered.length;
  const stressySpikes = answered.filter((d) => d.stress >= 4).length;

  let overview;
  if (avgMood >= 4 && stressySpikes === 0) {
    overview = 'ช่วง 7 วันที่ผ่านมา อารมณ์โดยรวมค่อนข้างคงที่และดี';
  } else if (stressySpikes > 0) {
    overview = 'ช่วง 7 วันที่ผ่านมา อารมณ์โดยรวมค่อนข้างคงที่ แต่มีบางวันที่ความเครียดสูงขึ้น';
  } else {
    overview = 'ช่วง 7 วันที่ผ่านมา อารมณ์โดยรวมอยู่ในเกณฑ์ปานกลาง';
  }

  const advice =
    stressySpikes > 0
      ? 'ลองชวนลูกคุยแบบสบายๆ ว่า "ช่วงนี้เป็นยังไงบ้าง" โดยไม่จำเป็นต้องเริ่มจากเรื่องคะแนน ให้เวลาฟังมากกว่าให้คำแนะนำก่อน'
      : 'ลูกดูแลตัวเองได้ดีในช่วงนี้ การชวนคุยสั้นๆ ทุกวันแบบไม่กดดันจะช่วยให้ลูกรู้สึกว่ามีคนพร้อมรับฟังเสมอ';

  return { avgMood, avgStress, checkedIn: answered.length, overview, advice };
}

export default function ChildWellnessScreen({ navigation }) {
  const shared = WELLNESS_SETTINGS.shareWithParent;
  const summary = shared ? summarize(WELLNESS_HISTORY) : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="💛 สุขภาวะของบุตร" subtitle={STUDENT.name} onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {!shared || !summary ? (
          <Card style={styles.emptyCard}>
            <Ionicons name="lock-closed-outline" size={22} color={colors.textFaint} />
            <Text style={styles.emptyTitle}>ยังไม่มีข้อมูลให้แสดง</Text>
            <Text style={styles.emptyBody}>
              {STUDENT.firstName} ยังไม่ได้เปิดแชร์ข้อมูลสุขภาวะให้ผู้ปกครองเห็น เมื่อเปิดแชร์แล้ว
              ภาพรวมจะแสดงที่นี่โดยอัตโนมัติ
            </Text>
          </Card>
        ) : (
          <>
            <Card>
              <Text style={styles.overviewText}>{summary.overview}</Text>
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

            <View style={styles.aiBox}>
              <View style={styles.aiIconWrap}>
                <Ionicons name="sparkles" size={16} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.aiTitle}>AI แนะนำ</Text>
                <Text style={styles.aiBody}>{summary.advice}</Text>
              </View>
            </View>
          </>
        )}

        <View style={styles.disclaimerBox}>
          <Ionicons name="information-circle-outline" size={16} color={colors.textMuted} />
          <Text style={styles.disclaimerText}>{PARENT_WELLNESS_DISCLAIMER}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  emptyCard: { alignItems: 'center', gap: 10, paddingVertical: 28 },
  emptyTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text },
  emptyBody: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted, textAlign: 'center', lineHeight: 19, paddingHorizontal: 10 },

  overviewText: { fontFamily: fonts.medium, fontSize: 14, color: colors.text, marginBottom: 16, lineHeight: 20 },

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

  aiBox: {
    flexDirection: 'row', gap: 12, backgroundColor: colors.secondarySoft, borderRadius: radius.lg,
    padding: 16, marginTop: 16,
  },
  aiIconWrap: {
    width: 34, height: 34, borderRadius: 11, backgroundColor: colors.secondaryDark,
    alignItems: 'center', justifyContent: 'center',
  },
  aiTitle: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text, marginBottom: 4 },
  aiBody: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.text, lineHeight: 19 },

  disclaimerBox: {
    flexDirection: 'row', gap: 8, backgroundColor: colors.surface, borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.border, padding: 12, marginTop: 16, alignItems: 'flex-start',
  },
  disclaimerText: { flex: 1, fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, lineHeight: 17 },
});
