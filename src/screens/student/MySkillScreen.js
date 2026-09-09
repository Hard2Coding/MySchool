import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Linking, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { GRADES, STUDENT } from '../../data/mockData';
import { askGeminiOnce } from '../../services/gemini';

const FREE_ELEARNING = [
  { id: 'math', subject: 'คณิตศาสตร์', title: 'ฟังก์ชันและกราฟ ม.ปลาย', duration: '18 นาที', level: 'พื้นฐาน', query: 'ฟังก์ชันและกราฟ ม.ปลาย สอน' },
  { id: 'physics', subject: 'ฟิสิกส์', title: 'การเคลื่อนที่แนวตรง', duration: '22 นาที', level: 'ทบทวน', query: 'ฟิสิกส์ การเคลื่อนที่แนวตรง ม.ปลาย สอน' },
  { id: 'english', subject: 'ภาษาอังกฤษ', title: 'Reading: Main Idea', duration: '15 นาที', level: 'เสริมทักษะ', query: 'ภาษาอังกฤษ reading main idea ม.ปลาย สอน' },
];

const LEARNING_PACKAGES = [
  {
    id: 'lite',
    name: 'Package Lite',
    price: 49,
    subtitle: 'เรียนกับ Tutor MyCare',
    description: 'เข้าถึงคอร์สพื้นฐานจาก Tutor MyCare เหมาะสำหรับเริ่มต้นและทบทวนบทเรียน',
    color: colors.secondaryDark,
    courses: [
      { id: 'lite-math', title: 'คณิตศาสตร์พื้นฐาน ม.ปลาย', tutor: 'Tutor MyCare', lessons: '24 บทเรียน', subjects: ['คณิตศาสตร์'], topics: ['ฟังก์ชัน', 'พีชคณิต', 'กราฟ'] },
      { id: 'lite-physics', title: 'ฟิสิกส์พื้นฐาน', tutor: 'Tutor MyCare', lessons: '20 บทเรียน', subjects: ['วิทยาศาสตร์', 'ฟิสิกส์'], topics: ['การเคลื่อนที่', 'แรง', 'พื้นฐานฟิสิกส์'] },
      { id: 'lite-english', title: 'English Foundation', tutor: 'Tutor MyCare', lessons: '18 บทเรียน', subjects: ['ภาษาอังกฤษ'], topics: ['Grammar', 'Reading', 'Vocabulary'] },
    ],
  },
  {
    id: 'premium',
    name: 'Package Premium',
    price: 179,
    subtitle: 'เรียนกับติวเตอร์ชั้นนำ',
    description: 'ปลดล็อกคอร์สจากติวเตอร์ชั้นนำและคอร์สเข้มข้นสำหรับเตรียมสอบ',
    color: colors.primary,
    courses: [
      { id: 'premium-calculus', title: 'SmartMathPro — Calculus Master', tutor: 'SmartMathPro', lessons: '42 บทเรียน', subjects: ['คณิตศาสตร์'], topics: ['Calculus', 'Functions', 'Limits'] },
      { id: 'premium-physics', title: 'OnDemand — Physics Intensive', tutor: 'OnDemand', lessons: '36 บทเรียน', subjects: ['วิทยาศาสตร์', 'ฟิสิกส์'], topics: ['การเคลื่อนที่', 'กลศาสตร์', 'โจทย์ประยุกต์'] },
      { id: 'premium-alevel', title: 'SmartMathPro — ตะลุยโจทย์ A-Level', tutor: 'SmartMathPro', lessons: '30 บทเรียน', subjects: ['คณิตศาสตร์'], topics: ['A-Level', 'ตะลุยโจทย์', 'ประยุกต์'] },
    ],
  },
];


const ALL_COURSES = LEARNING_PACKAGES.flatMap((pkg) => pkg.courses.map((course) => ({
  ...course,
  packageId: pkg.id,
  packageName: pkg.name,
  packagePrice: pkg.price,
})));

function fallbackCourseRecommendations(weaknesses) {
  return ALL_COURSES.map((course) => {
    const matched = weaknesses.filter((weak) => course.subjects.some((subject) => weak.name.includes(subject) || subject.includes(weak.name)));
    const matchScore = matched.length > 0 ? Math.min(98, 82 + matched.length * 7) : 45;
    const reason = matched.length > 0
      ? `AI พบว่าคุณมีคะแนน ${matched.map((m) => `${m.name} ${m.score}/100`).join(' และ ')} จึงแนะนำคอร์สนี้เพื่อเสริมพื้นฐานที่ยังอ่อน`
      : 'AI มองว่าเป็นคอร์สเสริมที่ช่วยต่อยอดทักษะหลังจากพัฒนาจุดอ่อนหลัก';
    return { course, matchScore, reason };
  }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);
}

export default function MySkillScreen({ navigation }) {
  const [largeText, setLargeText] = useState(false);
  const [simpleLanguage, setSimpleLanguage] = useState(false);
  const [captions, setCaptions] = useState(true);
  const [offlineMode, setOfflineMode] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('lite');
  const [downloaded, setDownloaded] = useState({});
  const [aiCourseRecs, setAiCourseRecs] = useState([]);
  const [aiCourseLoading, setAiCourseLoading] = useState(true);
  const [aiCourseError, setAiCourseError] = useState(false);

  const sortedGrades = useMemo(() => [...GRADES.subjects].sort((a, b) => a.score - b.score), []);
  const weaknesses = sortedGrades.slice(0, 2);
  const strengths = [...sortedGrades].reverse().slice(0, 2);

  useEffect(() => {
    let cancelled = false;
    const analyzeCourses = async () => {
      const fallback = fallbackCourseRecommendations(weaknesses);
      try {
        const gradeText = GRADES.subjects.map((s) => `${s.name}: ${s.score}/100`).join(', ');
        const courseText = ALL_COURSES.map((c) => `${c.id} | ${c.title} | ${c.packageName} ${c.packagePrice} บาท/เดือน | เนื้อหา: ${c.topics.join(', ')}`).join('\n');
        const prompt = `คุณคือ AI Learning Recommendation Engine ของ MySchool\nนักเรียนชั้น ${STUDENT.grade} มีผลการเรียน: ${gradeText}\nจุดอ่อนหลัก: ${weaknesses.map((w) => `${w.name} ${w.score}/100`).join(', ')}\n\nรายการคอร์สที่มี:\n${courseText}\n\nเลือก 3 คอร์สที่เหมาะกับนักเรียนที่สุด โดยพิจารณาจากจุดอ่อนและเนื้อหาของคอร์ส ไม่ใช่เลือกจากราคา\nตอบเป็น JSON array เท่านั้น รูปแบบ: [{\"id\":\"course-id\",\"matchScore\":90,\"reason\":\"เหตุผลสั้น ๆ ว่าคอร์สนี้ตรงกับจุดอ่อนอย่างไร\"}]\nห้ามสร้าง course id ใหม่`;
        const result = await askGeminiOnce(prompt);
        const cleaned = result.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        const valid = Array.isArray(parsed) ? parsed.map((r) => {
          const course = ALL_COURSES.find((c) => c.id === r.id);
          return course ? { course, matchScore: Math.max(0, Math.min(100, Number(r.matchScore) || 0)), reason: r.reason || 'AI วิเคราะห์ว่าเนื้อหาคอร์สนี้ตรงกับทักษะที่ควรพัฒนา' } : null;
        }).filter(Boolean).slice(0, 3) : [];
        if (!cancelled) setAiCourseRecs(valid.length ? valid : fallback);
      } catch (e) {
        if (!cancelled) { setAiCourseError(true); setAiCourseRecs(fallback); }
      } finally {
        if (!cancelled) setAiCourseLoading(false);
      }
    };
    analyzeCourses();
    return () => { cancelled = true; };
  }, []);

  const recommendationByCourseId = useMemo(() => Object.fromEntries(aiCourseRecs.map((r) => [r.course.id, r])), [aiCourseRecs]);

  const openFreeVideo = async (query) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    await Linking.openURL(url);
  };

  const toggleDownload = (id) => setDownloaded((current) => ({ ...current, [id]: !current[id] }));

  const goHome = () => navigation.navigate('StudentTabs', { screen: 'Home' });

  return (
    <View style={styles.container}>
      <ScreenHeader
        title="MySkill"
        subtitle="ค้นหาจุดแข็ง พัฒนาจุดอ่อน และวางแผนการเรียน"
        onBack={() => navigation.goBack()}
        showBell={false}
        right={(
          <TouchableOpacity style={styles.homeButton} onPress={goHome} activeOpacity={0.8}>
            <Ionicons name="home" size={17} color={colors.primary} />
            <Text style={styles.homeButtonText}>Home</Text>
          </TouchableOpacity>
        )}
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroIcon}><Ionicons name="analytics" size={22} color={colors.white} /></View>
          <Text style={[styles.heroTitle, largeText && styles.largeText]}>MySkill Profile</Text>
          <Text style={[styles.heroText, largeText && styles.largeTextSmall]}>
            AI วิเคราะห์ผลการเรียนเพื่อบอกว่า “คุณเก่งอะไร” “ควรพัฒนาอะไร” และ “ควรเรียนเรื่องไหนต่อ” โดยปรับเส้นทางให้เหมาะกับคุณ
          </Text>
          <View style={styles.heroStats}>
            <View><Text style={styles.heroStatValue}>{STUDENT.gpa.toFixed(2)}</Text><Text style={styles.heroStatLabel}>GPA</Text></View>
            <View><Text style={styles.heroStatValue}>{STUDENT.attendanceRate}%</Text><Text style={styles.heroStatLabel}>เข้าเรียน</Text></View>
            <View><Text style={styles.heroStatValue}>{Math.round((GRADES.subjects.reduce((sum, s) => sum + s.score, 0) / GRADES.subjects.length))}</Text><Text style={styles.heroStatLabel}>คะแนนเฉลี่ย</Text></View>
          </View>
        </View>

        <Text style={[styles.sectionTitle, largeText && styles.largeText]}>📊 MySkill ของฉัน</Text>
        <View style={styles.skillGrid}>
          <Card style={styles.skillCard}>
            <View style={styles.skillHeader}><View style={[styles.skillIcon, styles.strengthIcon]}><Ionicons name="trending-up" size={18} color={colors.success} /></View><Text style={styles.skillLabel}>จุดแข็ง</Text></View>
            {strengths.map((item) => <SkillRow key={item.name} name={item.name} score={item.score} tone="strength" />)}
            <Text style={styles.skillHint}>ควรต่อยอดไปสู่โจทย์ที่ยากขึ้น</Text>
          </Card>
          <Card style={styles.skillCard}>
            <View style={styles.skillHeader}><View style={[styles.skillIcon, styles.weakIcon]}><Ionicons name="flag" size={18} color={colors.danger} /></View><Text style={styles.skillLabel}>จุดที่ควรพัฒนา</Text></View>
            {weaknesses.map((item) => <SkillRow key={item.name} name={item.name} score={item.score} tone="weak" />)}
            <Text style={styles.skillHint}>AI แนะนำให้เน้นก่อน เพื่อสร้างพื้นฐาน</Text>
          </Card>
        </View>

        <Card style={styles.focusCard}>
          <View style={styles.reasonHeader}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={[styles.reasonTitle, largeText && styles.largeText]}>🎯 เรื่องที่ควรเน้นตอนนี้</Text>
          </View>
          <Text style={[styles.focusTitle, largeText && styles.largeText]}>ฟังก์ชันและกราฟ → การเคลื่อนที่แนวตรง</Text>
          <Text style={[styles.body, largeText && styles.largeTextSmall]}>
            จากคะแนนล่าสุด AI มองว่าการเสริมพื้นฐาน 2 เรื่องนี้จะช่วยให้ต่อยอดไปยังบทเรียนที่ยากขึ้นได้เร็วขึ้น ไม่จำเป็นต้องเรียนทุกอย่างพร้อมกัน
          </Text>
          <View style={styles.focusPills}>
            {weaknesses.map((item) => <View key={item.name} style={styles.focusPill}><Text style={styles.focusPillText}>{item.name} · {item.score}/100</Text></View>)}
          </View>
        </Card>


        <Text style={[styles.sectionTitle, largeText && styles.largeText]}>🤖 AI แนะนำคอร์สที่เหมาะกับคุณ</Text>
        <Text style={[styles.sectionSub, largeText && styles.largeTextSmall]}>AI วิเคราะห์คะแนน จุดอ่อน และเนื้อหาของแต่ละคอร์ส เพื่ออธิบายว่าทำไมคอร์สนี้จึงเหมาะกับคุณ</Text>
        <Card style={styles.aiCourseCard}>
          <View style={styles.aiCourseHeader}>
            <View style={styles.aiCourseIcon}><Ionicons name="sparkles" size={19} color={colors.white} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiCourseTitle}>AI Learning Recommendation</Text>
              <Text style={styles.aiCourseSub}>อ้างอิงจากผลการเรียนล่าสุดของ {STUDENT.firstName}</Text>
            </View>
          </View>
          {aiCourseLoading ? (
            <View style={styles.aiCourseLoading}><ActivityIndicator size="small" color={colors.primary} /><Text style={styles.aiCourseLoadingText}>AI กำลังจับคู่จุดอ่อนกับเนื้อหาคอร์ส...</Text></View>
          ) : (
            aiCourseRecs.map((rec, index) => (
              <View key={rec.course.id} style={styles.aiRecommendation}>
                <View style={styles.aiRecommendationTop}>
                  <View style={styles.rankCircle}><Text style={styles.rankText}>{index + 1}</Text></View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.recommendationPackage}>{rec.course.packageName} · {rec.course.packagePrice} บาท/เดือน</Text>
                    <Text style={[styles.recommendationTitle, largeText && styles.largeText]}>{rec.course.title}</Text>
                  </View>
                  <View style={styles.matchBadge}><Text style={styles.matchText}>{rec.matchScore}% Match</Text></View>
                </View>
                <View style={styles.aiReasonBox}>
                  <Ionicons name="sparkles" size={14} color={colors.primary} />
                  <Text style={styles.aiReasonText}>{rec.reason}</Text>
                </View>
              </View>
            ))
          )}
          {aiCourseError && <Text style={styles.aiFallbackText}>ขณะนี้ใช้การจับคู่จากคะแนนเป็นสำรอง เนื่องจาก AI ไม่พร้อมใช้งาน</Text>}
        </Card>

        <Text style={[styles.sectionTitle, largeText && styles.largeText]}>🆓 E-Learning ฟรี</Text>
        <Text style={[styles.sectionSub, largeText && styles.largeTextSmall]}>คลิปสอนจริงจากแหล่งวิดีโอออนไลน์ เปิดดูได้ทันทีโดยไม่มีค่าใช้จ่าย</Text>
        {FREE_ELEARNING.map((video) => (
          <Card key={video.id} style={styles.videoCard}>
            <View style={styles.videoRow}>
              <View style={styles.playBox}><Ionicons name="play" size={20} color={colors.white} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.videoSubject}>{video.subject}</Text>
                <Text style={[styles.videoTitle, largeText && styles.largeText]}>{video.title}</Text>
                <Text style={styles.videoMeta}>{video.duration} · {video.level}</Text>
              </View>
            </View>
            <View style={styles.videoActions}>
              <TouchableOpacity style={styles.primaryButton} onPress={() => openFreeVideo(video.query)} activeOpacity={0.8}>
                <Ionicons name="logo-youtube" size={16} color={colors.white} />
                <Text style={styles.primaryButtonText}>ดูคลิปฟรี</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.downloadButton} onPress={() => toggleDownload(video.id)} activeOpacity={0.8}>
                <Ionicons name={downloaded[video.id] ? 'checkmark-circle' : 'download-outline'} size={17} color={downloaded[video.id] ? colors.success : colors.text} />
                <Text style={styles.downloadText}>{downloaded[video.id] ? 'บันทึกแล้ว' : 'เก็บไว้ออฟไลน์'}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}

        <View style={styles.premiumBanner}>
          <View style={styles.premiumIcon}><Ionicons name="diamond" size={20} color={colors.white} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.premiumTitle}>E-Learning Membership</Text>
            <Text style={styles.premiumText}>เลือก Package ที่เหมาะกับเป้าหมายการเรียนของคุณ แล้วเข้าถึงคอร์สตามสิทธิ์สมาชิก</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, largeText && styles.largeText]}>🎓 เลือก Package การเรียน</Text>
        <Text style={[styles.sectionSub, largeText && styles.largeTextSmall]}>สมัครสมาชิกรายเดือนเพื่อปลดล็อกคอร์ส E-Learning เพิ่มเติม</Text>

        {LEARNING_PACKAGES.map((pkg) => {
          const selected = selectedPackage === pkg.id;
          return (
            <TouchableOpacity
              key={pkg.id}
              style={[styles.packageCard, selected && styles.packageCardSelected]}
              onPress={() => setSelectedPackage(pkg.id)}
              activeOpacity={0.88}
            >
              <View style={styles.packageHeader}>
                <View style={[styles.packageIcon, { backgroundColor: pkg.id === 'premium' ? colors.primary : colors.secondaryDark }]}>
                  <Ionicons name={pkg.id === 'premium' ? 'diamond' : 'book'} size={20} color={colors.white} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.packageName, largeText && styles.largeText]}>{pkg.name}</Text>
                  <Text style={styles.packageSubtitle}>{pkg.subtitle}</Text>
                </View>
                <View style={styles.priceWrap}>
                  <Text style={styles.priceValue}>{pkg.price}</Text>
                  <Text style={styles.priceUnit}>บาท/เดือน</Text>
                </View>
              </View>
              <Text style={[styles.packageDescription, largeText && styles.largeTextSmall]}>{pkg.description}</Text>
              <View style={styles.packageFeatureRow}>
                <Ionicons name="checkmark-circle" size={16} color={colors.success} />
                <Text style={styles.packageFeature}>{pkg.courses.length} คอร์สตัวอย่างพร้อมให้เรียน</Text>
              </View>
              {selected && (
                <View style={styles.selectedBadge}>
                  <Ionicons name="checkmark" size={13} color={colors.white} />
                  <Text style={styles.selectedBadgeText}>Package ที่เลือก</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}

        <Text style={[styles.sectionTitle, largeText && styles.largeText]}>📚 คอร์สใน {LEARNING_PACKAGES.find((p) => p.id === selectedPackage)?.name}</Text>
        {LEARNING_PACKAGES.find((p) => p.id === selectedPackage)?.courses.map((course, index) => (
          <Card key={`${selectedPackage}-${index}`} style={styles.courseCard}>
            <View style={styles.courseTop}>
              <View style={styles.courseIcon}><Ionicons name="school-outline" size={21} color={colors.primary} /></View>
              <View style={{ flex: 1 }}>
                <Text style={styles.courseSubject}>{course.tutor}</Text>
                <Text style={[styles.courseTitle, largeText && styles.largeText]}>{course.title}</Text>
                <Text style={styles.courseMeta}>{course.lessons} · สมาชิก {LEARNING_PACKAGES.find((p) => p.id === selectedPackage)?.price} บาท/เดือน</Text>
              </View>
              {recommendationByCourseId[course.id] && <View style={styles.matchBadge}><Text style={styles.matchText}>{recommendationByCourseId[course.id].matchScore}% Match</Text></View>}
            </View>
            {recommendationByCourseId[course.id] && (
              <View style={styles.aiReasonBox}>
                <Ionicons name="sparkles" size={14} color={colors.primary} />
                <Text style={styles.aiReasonText}>{recommendationByCourseId[course.id].reason}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.premiumButton} onPress={() => setSelectedPackage(selectedPackage)} activeOpacity={0.8}>
              <Ionicons name="play-circle-outline" size={17} color={colors.white} />
              <Text style={styles.primaryButtonText}>ดูคอร์ส</Text>
            </TouchableOpacity>
          </Card>
        ))}

        <Text style={[styles.sectionTitle, largeText && styles.largeText]}>♿ การเรียนที่เหมาะกับคุณ</Text>
        <Card>
          <SettingRow icon="text-outline" title="ตัวอักษรขนาดใหญ่" subtitle="ช่วยให้อ่านเนื้อหาได้ง่ายขึ้น" value={largeText} onChange={setLargeText} />
          <SettingRow icon="language-outline" title="ภาษาที่เข้าใจง่าย" subtitle="ลดศัพท์ซับซ้อนและแบ่งเนื้อหาเป็นขั้นตอน" value={simpleLanguage} onChange={setSimpleLanguage} />
          <SettingRow icon="chatbox-ellipses-outline" title="คำบรรยายวิดีโอ" subtitle="แสดง caption สำหรับสื่อการเรียนรู้" value={captions} onChange={setCaptions} />
          <SettingRow icon="cloud-offline-outline" title="โหมดอินเทอร์เน็ตจำกัด" subtitle="ใช้บทเรียนที่บันทึกไว้เมื่อสัญญาณไม่เสถียร" value={offlineMode} onChange={setOfflineMode} last />
        </Card>

        <View style={styles.homeFooter}>
          <TouchableOpacity style={styles.homeFooterButton} onPress={goHome} activeOpacity={0.85}>
            <Ionicons name="home" size={18} color={colors.white} />
            <Text style={styles.homeFooterText}>กลับไปหน้า Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

function SkillRow({ name, score, tone }) {
  const isWeak = tone === 'weak';
  return (
    <View style={styles.skillRow}>
      <View style={{ flex: 1 }}>
        <Text style={styles.skillName}>{name}</Text>
        <ProgressBar value={score} height={6} fillColor={isWeak ? colors.danger : colors.success} />
      </View>
      <Text style={[styles.skillScore, { color: isWeak ? colors.danger : colors.success }]}>{score}</Text>
    </View>
  );
}

function SettingRow({ icon, title, subtitle, value, onChange, last }) {
  return (
    <View style={[styles.settingRow, last && { borderBottomWidth: 0 }]}>
      <View style={styles.settingIcon}><Ionicons name={icon} size={19} color={colors.primary} /></View>
      <View style={{ flex: 1 }}><Text style={styles.settingTitle}>{title}</Text><Text style={styles.settingSubtitle}>{subtitle}</Text></View>
      <Switch value={value} onValueChange={onChange} trackColor={{ false: colors.border, true: colors.primarySoft }} thumbColor={value ? colors.primary : '#fff'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  homeButton: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 8 },
  homeButtonText: { fontFamily: fonts.semiBold, fontSize: 11, color: colors.primary },
  hero: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: 18, marginBottom: 20 },
  heroIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  heroTitle: { fontFamily: fonts.bold, fontSize: 21, color: colors.white },
  heroText: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: 'rgba(255,255,255,0.9)', marginTop: 6 },
  largeText: { fontSize: 19 },
  largeTextSmall: { fontSize: 15, lineHeight: 22 },
  heroStats: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)' },
  heroStatValue: { fontFamily: fonts.bold, fontSize: 18, color: colors.white },
  heroStatLabel: { fontFamily: fonts.regular, fontSize: 10.5, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  sectionTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.text, marginBottom: 7, marginTop: 4 },
  sectionSub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginBottom: 10, lineHeight: 18 },
  skillGrid: { gap: 10 },
  skillCard: { padding: 14 },
  skillHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  skillIcon: { width: 34, height: 34, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  strengthIcon: { backgroundColor: colors.successSoft },
  weakIcon: { backgroundColor: colors.dangerSoft },
  skillLabel: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },
  skillRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  skillName: { fontFamily: fonts.medium, fontSize: 12, color: colors.text, marginBottom: 5 },
  skillScore: { width: 28, fontFamily: fonts.bold, fontSize: 14, textAlign: 'right' },
  skillHint: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 1 },
  focusCard: { marginTop: 10, marginBottom: 18, borderWidth: 1, borderColor: colors.primarySoft },
  reasonHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  reasonTitle: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },
  focusTitle: { fontFamily: fonts.bold, fontSize: 16, color: colors.primary, marginBottom: 7 },
  body: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 20, color: colors.textMuted },
  focusPills: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginTop: 12 },
  focusPill: { backgroundColor: colors.primarySoft, borderRadius: radius.pill, paddingHorizontal: 9, paddingVertical: 6 },
  focusPillText: { fontFamily: fonts.medium, fontSize: 10.5, color: colors.primary },
  aiCourseCard: { marginBottom: 16, borderWidth: 1, borderColor: colors.primarySoft },
  aiCourseHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  aiCourseIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  aiCourseTitle: { fontFamily: fonts.bold, fontSize: 14, color: colors.text },
  aiCourseSub: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 2 },
  aiCourseLoading: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8 },
  aiCourseLoadingText: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted },
  aiRecommendation: { paddingTop: 11, marginTop: 11, borderTopWidth: 1, borderTopColor: colors.border },
  aiRecommendationTop: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  rankCircle: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  rankText: { fontFamily: fonts.bold, fontSize: 11, color: colors.primary },
  recommendationPackage: { fontFamily: fonts.medium, fontSize: 9.5, color: colors.primary },
  recommendationTitle: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text, marginTop: 2 },
  matchBadge: { backgroundColor: colors.successSoft, borderRadius: radius.pill, paddingHorizontal: 7, paddingVertical: 5, alignSelf: 'flex-start' },
  matchText: { fontFamily: fonts.bold, fontSize: 9.5, color: colors.success },
  aiReasonBox: { flexDirection: 'row', gap: 7, backgroundColor: colors.primarySoft, borderRadius: 10, padding: 9, marginTop: 9 },
  aiReasonText: { flex: 1, fontFamily: fonts.regular, fontSize: 10.5, lineHeight: 16, color: colors.textMuted },
  aiFallbackText: { fontFamily: fonts.regular, fontSize: 9.5, lineHeight: 14, color: colors.textFaint, marginTop: 9 },
  videoCard: { marginTop: 8 },
  videoRow: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  playBox: { width: 48, height: 48, borderRadius: 14, backgroundColor: colors.danger, alignItems: 'center', justifyContent: 'center' },
  videoSubject: { fontFamily: fonts.medium, fontSize: 11, color: colors.primary },
  videoTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text, marginTop: 2 },
  videoMeta: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 3 },
  videoActions: { flexDirection: 'row', gap: 8, marginTop: 13 },
  primaryButton: { flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, paddingVertical: 10, borderRadius: radius.md },
  primaryButtonText: { fontFamily: fonts.semiBold, fontSize: 11.5, color: colors.white },
  downloadButton: { flex: 1, flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, paddingVertical: 10, borderRadius: radius.md },
  downloadText: { fontFamily: fonts.medium, fontSize: 11, color: colors.text },
  packageCard: {
    borderRadius: radius.lg,
    padding: 16,
    marginBottom: 12,
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  packageCardSelected: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  packageHeader: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  packageIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  packageName: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  packageSubtitle: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
  priceWrap: { alignItems: 'flex-end' },
  priceValue: { fontFamily: fonts.bold, fontSize: 24, color: colors.primary },
  priceUnit: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted },
  packageDescription: { fontFamily: fonts.regular, fontSize: 12.5, lineHeight: 18, color: colors.textMuted, marginTop: 13 },
  packageFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 10 },
  packageFeature: { fontFamily: fonts.medium, fontSize: 12, color: colors.text },
  selectedBadge: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: 5, backgroundColor: colors.primary, borderRadius: 20, paddingHorizontal: 9, paddingVertical: 5, marginTop: 10 },
  selectedBadgeText: { fontFamily: fonts.semiBold, fontSize: 10.5, color: colors.white },
  premiumBanner: { flexDirection: 'row', gap: 10, alignItems: 'center', backgroundColor: colors.secondaryDark, borderRadius: radius.lg, padding: 15, marginTop: 18, marginBottom: 16 },
  premiumIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  premiumTitle: { fontFamily: fonts.bold, fontSize: 15, color: colors.white },
  premiumText: { fontFamily: fonts.regular, fontSize: 11.5, lineHeight: 17, color: 'rgba(255,255,255,0.86)', marginTop: 3 },
  courseCard: { marginTop: 8 },
  courseTop: { flexDirection: 'row', alignItems: 'center', gap: 11, marginBottom: 13 },
  courseIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  courseSubject: { fontFamily: fonts.medium, fontSize: 11, color: colors.primary },
  courseTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text, marginTop: 2 },
  courseMeta: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 3 },
  premiumButton: { flexDirection: 'row', gap: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.secondaryDark, paddingVertical: 10, borderRadius: radius.md },
  settingRow: { flexDirection: 'row', alignItems: 'center', gap: 11, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  settingIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primarySoft, alignItems: 'center', justifyContent: 'center' },
  settingTitle: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.text },
  settingSubtitle: { fontFamily: fonts.regular, fontSize: 10.5, color: colors.textMuted, marginTop: 2, paddingRight: 5 },
  homeFooter: { marginTop: 18 },
  homeFooterButton: { flexDirection: 'row', gap: 8, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary, paddingVertical: 13, borderRadius: radius.md },
  homeFooterText: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.white },
});
