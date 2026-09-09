import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { AT_RISK_STUDENTS, TEACHER_CLASSES, TEACHER_STATS } from '../../data/mockData';
import { askGeminiOnce } from '../../services/gemini';

const FALLBACK = `ห้อง ม.4/3 ควรติดตามนักเรียน 2 คนเป็นพิเศษ โดยเน้นการพูดคุยกับนักเรียนและทบทวนพื้นฐานคณิตศาสตร์ก่อนเพิ่มความยากของบทเรียน
แนะนำให้ครูใช้ข้อมูลการเข้าเรียน คะแนน และการส่งงานร่วมกัน ไม่ควรใช้สัญญาณใดสัญญาณหนึ่งเพื่อตัดสินนักเรียน`;

export default function TeacherAIAssistantScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const students = AT_RISK_STUDENTS.map((s) => `${s.name} (${s.room}): ${s.reason}`).join('\n');
    const prompt = `คุณคือ AI Early Intervention Assistant สำหรับครูในระบบ MySchool
ช่วยครูค้นหาสัญญาณที่ควรติดตาม โดยไม่วินิจฉัยเด็กและไม่ตีตราเด็ก
ข้อมูล:
- ห้องเรียนที่ครูสอน: ${TEACHER_CLASSES.map((x) => `${x.name} ${x.room} ${x.students} คน`).join(', ')}
- งานที่ต้องตรวจ: ${TEACHER_STATS.toGrade}
- ขาดเรียนวันนี้รวม: ${TEACHER_STATS.absentToday}
- นักเรียนที่มีสัญญาณเบื้องต้น:
${students}

ตอบภาษาไทยสั้น ๆ 4 ส่วน:
1) ภาพรวม
2) นักเรียน/กลุ่มที่ควรติดตาม
3) สิ่งที่ครูควรทำใน 1 สัปดาห์นี้
4) สิ่งที่ควรติดตามต่อ
ย้ำว่าข้อมูลเป็นเพียงสัญญาณเพื่อช่วยครูตัดสินใจ ไม่ใช่ข้อสรุป`;

    askGeminiOnce(prompt)
      .then((result) => { if (!cancelled) setInsight(result.replace(/\*\*/g, '').trim()); })
      .catch(() => { if (!cancelled) { setError(true); setInsight(FALLBACK); } })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="AI Teacher Copilot" subtitle="ช่วยครูมองเห็นสัญญาณก่อนที่ปัญหาจะใหญ่ขึ้น" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.icon}><Ionicons name="sparkles" size={22} color={colors.white} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>AI Early Intervention</Text>
            <Text style={styles.heroSub}>วิเคราะห์สัญญาณจากการเข้าเรียน ผลการเรียน และพฤติกรรมเพื่อช่วยครูเลือกจุดที่ควรดูแล</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>นักเรียนที่ควรติดตาม</Text>
        <Card>
          {AT_RISK_STUDENTS.map((s, i) => (
            <View key={s.id} style={[styles.studentRow, i === AT_RISK_STUDENTS.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.warning}><Ionicons name="alert-circle-outline" size={20} color={colors.danger} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{s.name}</Text>
                <Text style={styles.reason}>{s.room} · {s.reason}</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={colors.textFaint} />
            </View>
          ))}
        </Card>

        <Text style={styles.sectionTitle}>AI Classroom Insight</Text>
        <Card style={styles.aiCard}>
          {loading ? (
            <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={styles.muted}>กำลังวิเคราะห์ข้อมูลห้องเรียน...</Text></View>
          ) : (
            <Text style={styles.body}>{insight}</Text>
          )}
        </Card>

        <Text style={styles.sectionTitle}>AI ช่วยครูทำอะไรต่อได้บ้าง?</Text>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.tool} onPress={() => navigation.navigate('AIQuiz')}>
            <View style={styles.toolIcon}><Ionicons name="document-text-outline" size={20} color={colors.primary} /></View>
            <Text style={styles.toolTitle}>สร้าง Quiz</Text>
            <Text style={styles.toolSub}>สร้างแบบทดสอบจากบทเรียน</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tool} onPress={() => navigation.navigate('Classes')}>
            <View style={styles.toolIcon}><Ionicons name="book-outline" size={20} color={colors.primary} /></View>
            <Text style={styles.toolTitle}>สร้างบทเรียน</Text>
            <Text style={styles.toolSub}>ต่อยอดจากเนื้อหาในรายวิชา</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('TeacherTabs')}>
          <Ionicons name="home-outline" size={17} color={colors.primary} />
          <Text style={styles.homeText}>กลับหน้า Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  hero: { flexDirection: 'row', gap: 12, backgroundColor: colors.primary, borderRadius: radius.lg, padding: 16 },
  icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.white },
  heroSub: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', lineHeight: 17, marginTop: 3 },
  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text, marginTop: 20, marginBottom: 10 },
  studentRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  warning: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.dangerSoft, alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  reason: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  aiCard: { minHeight: 130 },
  loading: { alignItems: 'center', justifyContent: 'center', gap: 9, paddingVertical: 25 },
  muted: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  body: { fontFamily: fonts.regular, fontSize: 13, color: colors.text, lineHeight: 21 },
  grid: { flexDirection: 'row', gap: 10 },
  tool: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: 14 },
  toolIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center', marginBottom: 9 },
  toolTitle: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.text },
  toolSub: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, lineHeight: 16, marginTop: 3 },
  homeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 20, paddingVertical: 12 },
  homeText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.primary },
});
