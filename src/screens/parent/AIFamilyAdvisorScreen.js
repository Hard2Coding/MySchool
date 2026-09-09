import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { STUDENT, GRADES, ATTENDANCE_SUMMARY, CHILD_ASSIGNMENTS } from '../../data/mockData';
import { askGeminiOnce } from '../../services/gemini';

const FALLBACK = {
  summary: 'ช่วงนี้ผลการเรียนโดยรวมอยู่ในเกณฑ์ดี แต่ควรติดตามคณิตศาสตร์เพิ่มเติม เพราะมีงานที่ยังไม่ส่งและคะแนนบางหัวข้อลดลง',
  focus: 'คณิตศาสตร์ — อนุพันธ์และการประยุกต์',
  action: 'ชวนบุตรทบทวนวันละ 15–20 นาที และลองถามให้เขาอธิบายแนวคิดด้วยคำพูดของตัวเอง',
  question: 'ถ้าเปลี่ยนค่าตัวแปรในโจทย์นี้ ผลลัพธ์จะเปลี่ยนอย่างไร?',
};

function cleanAI(text) {
  return text.replace(/\*\*/g, '').replace(/^#+\s*/gm, '').trim();
}

export default function AIFamilyAdvisorScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const grades = GRADES.subjects.map((s) => `${s.name}: ${s.score}/100`).join(', ');
    const lateWork = CHILD_ASSIGNMENTS.filter((x) => x.status !== 'ส่งแล้ว')
      .map((x) => `${x.subject} - ${x.title} (${x.status})`).join(', ') || 'ไม่มี';

    const prompt = `คุณคือ AI Family Learning Advisor ของระบบ MySchool
หน้าที่คือช่วยผู้ปกครองเข้าใจพัฒนาการของบุตร โดยไม่ตัดสินหรือทำให้เด็กถูกตีตรา
ข้อมูล:
- นักเรียน: ${STUDENT.name}, ${STUDENT.grade}, ${STUDENT.room}
- GPA: ${STUDENT.gpa}/4
- การเข้าเรียน: ${ATTENDANCE_SUMMARY.rate}%
- คะแนนคุณลักษณะ: ${STUDENT.behaviorScore}/100
- คะแนนรายวิชา: ${grades}
- งานที่ยังไม่เสร็จ/ส่งช้า: ${lateWork}

ตอบภาษาไทยแบบสั้นและอบอุ่น โดยมี 4 บรรทัด:
สรุป: ...
จุดที่ควรใส่ใจ: ...
สิ่งที่ผู้ปกครองช่วยได้: ...
คำถามชวนคุยกับลูก: ...
อย่าใช้คำว่าเด็กเรียนแย่หรือสรุปว่าเด็กมีปัญหา`;

    askGeminiOnce(prompt)
      .then((result) => { if (!cancelled) setText(cleanAI(result)); })
      .catch(() => { if (!cancelled) { setError(true); setText(''); } })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  const content = error || !text ? FALLBACK : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="AI Family Advisor" subtitle="ผู้ช่วยผู้ปกครองเพื่อสนับสนุนการเรียนรู้" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.icon}><Ionicons name="sparkles" size={22} color={colors.white} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.heroTitle}>วันนี้ช่วยลูกเรียนอะไรดี?</Text>
            <Text style={styles.heroSub}>AI วิเคราะห์ข้อมูลการเรียนเพื่อเสนอแนวทางสนับสนุนที่ทำได้จริง</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>AI วิเคราะห์</Text>
        <Card style={styles.aiCard}>
          {loading ? (
            <View style={styles.loading}><ActivityIndicator color={colors.primary} /><Text style={styles.muted}>กำลังวิเคราะห์พัฒนาการ...</Text></View>
          ) : content ? (
            <>
              <Text style={styles.label}>สรุป</Text>
              <Text style={styles.body}>{content.summary}</Text>
              <Text style={styles.label}>จุดที่ควรใส่ใจ</Text>
              <Text style={styles.body}>{content.focus}</Text>
              <Text style={styles.label}>สิ่งที่ผู้ปกครองช่วยได้</Text>
              <Text style={styles.body}>{content.action}</Text>
              <Text style={styles.label}>คำถามชวนคุยกับลูก</Text>
              <Text style={styles.quote}>“{content.question}”</Text>
            </>
          ) : (
            <Text style={styles.body}>{text}</Text>
          )}
        </Card>

        <Text style={styles.sectionTitle}>ข้อมูลที่ AI ใช้ประกอบการแนะนำ</Text>
        <View style={styles.metrics}>
          <Card style={styles.metric}><Text style={styles.metricValue}>{STUDENT.gpa.toFixed(2)}</Text><Text style={styles.metricLabel}>GPA</Text></Card>
          <Card style={styles.metric}><Text style={styles.metricValue}>{ATTENDANCE_SUMMARY.rate}%</Text><Text style={styles.metricLabel}>เข้าเรียน</Text></Card>
          <Card style={styles.metric}><Text style={styles.metricValue}>{STUDENT.behaviorScore}</Text><Text style={styles.metricLabel}>คุณลักษณะ</Text></Card>
        </View>

        <TouchableOpacity style={styles.cta} activeOpacity={0.85} onPress={() => navigation.navigate('SharedChat')}>
          <Ionicons name="chatbubbles-outline" size={20} color={colors.white} />
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>คุยกับครูที่ปรึกษา</Text>
            <Text style={styles.ctaSub}>หากต้องการพูดคุยเรื่องพัฒนาการของบุตร</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('ParentTabs')}>
          <Ionicons name="home-outline" size={17} color={colors.primary} />
          <Text style={styles.homeText}>กลับหน้า Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  hero: { flexDirection: 'row', gap: 12, backgroundColor: colors.primary, borderRadius: radius.lg, padding: 16, marginBottom: 4 },
  icon: { width: 42, height: 42, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  heroTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.white },
  heroSub: { fontFamily: fonts.regular, fontSize: 11.5, color: 'rgba(255,255,255,0.85)', lineHeight: 17, marginTop: 3 },
  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text, marginTop: 20, marginBottom: 10 },
  aiCard: { gap: 6 },
  label: { fontFamily: fonts.semiBold, fontSize: 12.5, color: colors.primary, marginTop: 7 },
  body: { fontFamily: fonts.regular, fontSize: 13, color: colors.text, lineHeight: 20 },
  quote: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, lineHeight: 20, backgroundColor: colors.bg, borderRadius: 10, padding: 11, marginTop: 2 },
  loading: { alignItems: 'center', gap: 9, paddingVertical: 18 },
  muted: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  metrics: { flexDirection: 'row', gap: 10 },
  metric: { flex: 1, alignItems: 'center', paddingVertical: 13 },
  metricValue: { fontFamily: fonts.bold, fontSize: 19, color: colors.text },
  metricLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 3 },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 11, backgroundColor: colors.secondaryDark, borderRadius: radius.lg, padding: 15, marginTop: 20 },
  ctaTitle: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.white },
  ctaSub: { fontFamily: fonts.regular, fontSize: 11, color: 'rgba(255,255,255,0.85)', marginTop: 2 },
  homeButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 18, paddingVertical: 12 },
  homeText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.primary },
});
