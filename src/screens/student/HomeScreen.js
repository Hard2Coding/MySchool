import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import Chip from '../../components/Chip';
import Avatar from '../../components/Avatar';
import Barcode from '../../components/Barcode';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { STUDENT, SCHEDULE_TODAY, NEWS, GRADES } from '../../data/mockData';
import { askGeminiOnce } from '../../services/gemini';

// Placeholder photo — replace assets/avatars/student.png with the real photo
// (same filename) whenever it's ready; no code changes needed.
import studentPhoto from '../../../assets/avatars/student.png';

// ──────────────────────────────────────────────────────────
// Parse Gemini's text response into an array of recommendations
// Expected format from AI: numbered lines like "1. วิชา: X | เหตุผล: Y"
// Falls back gracefully if parsing fails.
// ──────────────────────────────────────────────────────────
function parseRecommendations(text) {
  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
  const recs = [];
  for (const line of lines) {
    // Try to find a subject name from lines containing "**" bold markers or numbered items
    const clean = line.replace(/\*\*/g, '').replace(/^[\d.)\-–•]+\s*/, '');
    if (clean.length > 4) recs.push(clean);
    if (recs.length >= 3) break;
  }
  return recs.length > 0 ? recs : [text.slice(0, 120)];
}

export default function StudentHomeScreen({ navigation }) {
  const behaviorTone = STUDENT.behaviorScore < 80 ? colors.danger : colors.success;

  // ── AI recommendation state ──
  const [aiRecs, setAiRecs] = useState([]);
  const [aiLoading, setAiLoading] = useState(true);
  const [aiError, setAiError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchRecommendations = async () => {
      try {
        const gradesText = GRADES.subjects
          .map((s) => `${s.name}: ${s.score} คะแนน (เกรด ${s.grade})`)
          .join(', ');

        const prompt = `คุณเป็น AI วิเคราะห์ผลการเรียนนักเรียนไทยชั้น ${STUDENT.grade} แผน ${STUDENT.program}
ข้อมูล:
- GPA: ${STUDENT.gpa} / 4.00
- อัตราการเข้าเรียน: ${STUDENT.attendanceRate}%
- คะแนนคุณลักษณะ: ${STUDENT.behaviorScore} / 100
- คะแนนแต่ละวิชา: ${gradesText}

จากข้อมูลข้างต้น โปรดแนะนำ 3 หัวข้อ/วิชาที่นักเรียนคนนี้ควรให้ความสนใจเพิ่มเติม
ตอบเป็นภาษาไทย รายการ 1-3 ข้อ แต่ละข้อไม่เกิน 1 บรรทัด ระบุชื่อวิชา/หัวข้อและเหตุผลสั้นๆ`;

        const result = await askGeminiOnce(prompt);
        if (!cancelled) {
          setAiRecs(parseRecommendations(result));
        }
      } catch (e) {
        if (!cancelled) setAiError(true);
      } finally {
        if (!cancelled) setAiLoading(false);
      }
    };

    fetchRecommendations();
    return () => { cancelled = true; };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={`สวัสดี, ${STUDENT.firstName} 👋`} subtitle={`${STUDENT.room} · รหัสนักเรียน ${STUDENT.id}`} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Virtual student card — tap to open the full digital ID card */}
        <TouchableOpacity
          style={styles.vcard}
          activeOpacity={0.9}
          onPress={() => navigation.navigate('StudentCard')}
        >
          <View style={styles.vcardTop}>
            <Avatar source={studentPhoto} size={46} />
            <View style={{ flex: 1 }}>
              <Text style={styles.vcardName}>{STUDENT.name}</Text>
              <Text style={styles.vcardSub}>รหัสนักเรียน {STUDENT.id} · {STUDENT.room}</Text>
            </View>
            <Ionicons name="qr-code-outline" size={26} color={colors.white} />
          </View>
          <View style={styles.vcardBarcode}>
            <Barcode value={STUDENT.id} height={26} barColor="rgba(255,255,255,0.9)" />
          </View>
          <Text style={styles.vcardLabel}>บัตรนักเรียนดิจิทัล (Virtual Student Card) · แตะเพื่อดูเต็มจอ</Text>
        </TouchableOpacity>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>คะแนนคุณลักษณะ</Text>
            <Text style={[styles.statValue, { color: behaviorTone }]}>
              {STUDENT.behaviorScore} <Text style={styles.statMax}>/ 100</Text>
            </Text>
            <ProgressBar value={STUDENT.behaviorScore} fillColor={behaviorTone} height={6} />
            {STUDENT.behaviorScore < 80 && (
              <Text style={styles.warnText}>⚠ ต่ำกว่าเกณฑ์ที่กำหนด</Text>
            )}
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statLabel}>เกรดเฉลี่ย (GPA)</Text>
            <Text style={styles.statValue}>{STUDENT.gpa.toFixed(2)}</Text>
            <Text style={styles.statSub}>ภาคเรียนที่ 1/2569</Text>
          </Card>
        </View>


        {/* ── AI Recommendation Card ── */}
        <View style={styles.aiCard}>
          <View style={styles.aiCardHeader}>
            <View style={styles.aiIconWrap}>
              <Ionicons name="sparkles" size={16} color={colors.white} />
            </View>
            <Text style={styles.aiCardTitle}>AI แนะนำหัวข้อที่ควรทบทวน</Text>
          </View>

          {aiLoading ? (
            <View style={styles.aiLoading}>
              <ActivityIndicator size="small" color="rgba(255,255,255,0.8)" />
              <Text style={styles.aiLoadingText}>กำลังวิเคราะห์ผลการเรียน...</Text>
            </View>
          ) : aiError ? (
            <Text style={styles.aiErrorText}>ไม่สามารถโหลดคำแนะนำได้ในขณะนี้</Text>
          ) : (
            <View style={styles.aiRecList}>
              {aiRecs.map((rec, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.aiRecRow}
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('AiTutor')}
                >
                  <View style={styles.aiRecNum}>
                    <Text style={styles.aiRecNumText}>{i + 1}</Text>
                  </View>
                  <Text style={styles.aiRecText} numberOfLines={2}>{rec}</Text>
                  <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.6)" />
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.aiOpenTutor}
                onPress={() => navigation.navigate('AiTutor')}
              >
                <Ionicons name="sparkles" size={13} color={colors.primary} />
                <Text style={styles.aiOpenTutorText}>เปิด AI Tutor เพื่อเรียนต่อ →</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* MySkill — adaptive + accessible learning */}
        <TouchableOpacity
          style={styles.learningCard}
          activeOpacity={0.88}
          onPress={() => navigation.navigate('MySkill')}
        >
          <View style={styles.learningIcon}>
            <Ionicons name="accessibility-outline" size={22} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.learningTitle}>MySkill</Text>
            <Text style={styles.learningText}>AI วิเคราะห์จุดแข็ง จุดอ่อน และแนะนำสิ่งที่ควรเน้น พร้อม E-Learning ฟรีและคอร์สเพิ่มเติม</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.white} />
        </TouchableOpacity>

        {/* Mental Wellness — daily check-in */}
        <TouchableOpacity
          style={styles.wellnessCard}
          activeOpacity={0.88}
          onPress={() => navigation.navigate('Wellness')}
        >
          <View style={styles.wellnessIcon}>
            <Ionicons name="leaf-outline" size={22} color={colors.white} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.wellnessTitle}>🌱 Mental Wellness</Text>
            <Text style={styles.wellnessText}>เช็กอินความรู้สึกวันนี้ ใช้เวลาไม่ถึงนาที</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.white} />
        </TouchableOpacity>

        {/* Schedule */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>ตารางเรียนวันนี้</Text>
          <TouchableOpacity><Text style={styles.seeAll}>ดูทั้งหมด ›</Text></TouchableOpacity>
        </View>
        <Card>
          {SCHEDULE_TODAY.map((s, i) => (
            <View key={i} style={[styles.scheduleRow, i === SCHEDULE_TODAY.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.timeBadge}>
                <Text style={styles.timeText}>{s.time}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.scheduleSubject}>{s.subject}</Text>
                <Text style={styles.scheduleRoom}>{s.room}</Text>
              </View>
            </View>
          ))}
        </Card>

        {/* News */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>ข่าวสาร / ประกาศ</Text>
          <TouchableOpacity><Text style={styles.seeAll}>ดูทั้งหมด ›</Text></TouchableOpacity>
        </View>
        <Card style={{ gap: 12 }}>
          {NEWS.map((n, i) => (
            <View key={n.id} style={[styles.newsRow, i === NEWS.length - 1 && { marginBottom: 0 }]}>
              <Chip label={n.tag} tone={n.tag === 'ประกาศ' ? 'primary' : n.tag === 'กิจกรรม' ? 'secondary' : 'neutral'} />
              <Text style={styles.newsTitle} numberOfLines={2}>{n.title}</Text>
              <Text style={styles.newsDate}>{n.date}</Text>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },

  // ── AI Recommendation card ──
  aiCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 16,
  },
  aiCardHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  aiIconWrap: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center', justifyContent: 'center',
  },
  aiCardTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.white },
  aiLoading: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8 },
  aiLoadingText: { fontFamily: fonts.regular, fontSize: 13, color: 'rgba(255,255,255,0.8)' },
  aiErrorText: { fontFamily: fonts.regular, fontSize: 13, color: 'rgba(255,255,255,0.7)', paddingBottom: 4 },
  aiRecList: { gap: 8 },
  aiRecRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: radius.md,
    paddingHorizontal: 12, paddingVertical: 10,
  },
  aiRecNum: {
    width: 22, height: 22, borderRadius: 11, backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  aiRecNumText: { fontFamily: fonts.bold, fontSize: 11, color: colors.white },
  aiRecText: { flex: 1, fontFamily: fonts.regular, fontSize: 13, color: colors.white, lineHeight: 18 },
  aiOpenTutor: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.white, borderRadius: radius.md,
    paddingHorizontal: 14, paddingVertical: 9, marginTop: 4,
    alignSelf: 'flex-start',
  },
  aiOpenTutorText: { fontFamily: fonts.semiBold, fontSize: 12.5, color: colors.primary },

  learningCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.secondaryDark, borderRadius: radius.lg, padding: 15, marginBottom: 16,
  },
  learningIcon: {
    width: 42, height: 42, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  learningTitle: { fontFamily: fonts.bold, fontSize: 14.5, color: colors.white },
  learningText: { fontFamily: fonts.regular, fontSize: 11.5, lineHeight: 17, color: 'rgba(255,255,255,0.9)', marginTop: 3 },

  wellnessCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: colors.success, borderRadius: radius.lg, padding: 15, marginBottom: 16,
  },
  wellnessIcon: {
    width: 42, height: 42, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  wellnessTitle: { fontFamily: fonts.bold, fontSize: 14.5, color: colors.white },
  wellnessText: { fontFamily: fonts.regular, fontSize: 11.5, lineHeight: 17, color: 'rgba(255,255,255,0.9)', marginTop: 3 },

  // ── Virtual student card ──
  vcard: {
    backgroundColor: colors.primaryDark,
    borderRadius: radius.lg,
    padding: 18,
    marginBottom: 16,
  },
  vcardTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  vcardName: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.white },
  vcardSub: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  vcardBarcode: { flexDirection: 'row', marginTop: 16 },
  vcardLabel: { fontFamily: fonts.regular, fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 8 },

  statsRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  statCard: { flex: 1 },
  statLabel: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  statValue: { fontFamily: fonts.bold, fontSize: 22, color: colors.text, marginTop: 4, marginBottom: 8 },
  statMax: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted },
  statSub: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 4 },
  warnText: { fontFamily: fonts.regular, fontSize: 11, color: colors.danger, marginTop: 6 },

  sectionHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginBottom: 10 },
  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text },
  seeAll: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.primary },

  scheduleRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  timeBadge: {
    backgroundColor: colors.secondarySoft, paddingHorizontal: 8, paddingVertical: 5, borderRadius: 8,
  },
  timeText: { fontFamily: fonts.semiBold, fontSize: 12, color: colors.secondaryDark },
  scheduleSubject: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  scheduleRoom: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },

  newsRow: { marginBottom: 4 },
  newsTitle: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text, marginTop: 6 },
  newsDate: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
});
