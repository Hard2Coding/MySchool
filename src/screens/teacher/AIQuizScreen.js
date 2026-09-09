import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';

const TYPES = ['ปรนัย', 'อัตนัย', 'ถูก-ผิด'];
const LEVELS = ['ง่าย', 'ปานกลาง', 'ยาก'];
const COUNTS = [10, 15, 20, 25];

function Checkbox({ label, checked, onPress }) {
  return (
    <TouchableOpacity style={styles.checkRow} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Ionicons name="checkmark" size={13} color={colors.white} />}
      </View>
      <Text style={styles.checkLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function AIQuizScreen({ navigation }) {
  const [types, setTypes] = useState(['ปรนัย']);
  const [levels, setLevels] = useState(['ปานกลาง']);
  const [count, setCount] = useState(20);
  const [generated, setGenerated] = useState(false);

  const toggle = (arr, setArr, val) =>
    setArr(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="AI สร้างข้อสอบ" subtitle="สร้างแบบทดสอบจากเอกสาร/สไลด์" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Step number="1" title="เลือกแหล่งข้อมูล" />
        <Card style={styles.sourceCard}>
          <Ionicons name="document-attach-outline" size={18} color={colors.primary} />
          <Text style={styles.sourceText}>บทที่ 3 อนุพันธ์.pdf</Text>
          <Ionicons name="chevron-down" size={16} color={colors.textMuted} />
        </Card>

        <Step number="2" title="ประเภทข้อสอบ" />
        <Card style={styles.rowWrap}>
          {TYPES.map((t) => (
            <Checkbox key={t} label={t} checked={types.includes(t)} onPress={() => toggle(types, setTypes, t)} />
          ))}
        </Card>

        <Step number="3" title="ระดับความยาก" />
        <Card style={styles.rowWrap}>
          {LEVELS.map((l) => (
            <Checkbox key={l} label={l} checked={levels.includes(l)} onPress={() => toggle(levels, setLevels, l)} />
          ))}
        </Card>

        <Step number="4" title="จำนวนข้อ" />
        <Card style={styles.rowWrap}>
          {COUNTS.map((c) => (
            <TouchableOpacity key={c} style={[styles.countChip, count === c && styles.countChipActive]} onPress={() => setCount(c)}>
              <Text style={[styles.countChipText, count === c && { color: colors.white }]}>{c} ข้อ</Text>
            </TouchableOpacity>
          ))}
        </Card>

        <TouchableOpacity style={styles.generateBtn} activeOpacity={0.85} onPress={() => setGenerated(true)}>
          <Ionicons name="sparkles" size={17} color={colors.white} />
          <Text style={styles.generateText}>สร้างข้อสอบ</Text>
        </TouchableOpacity>

        {generated && (
          <Card style={{ marginTop: 16 }}>
            <Text style={styles.previewTitle}>ตัวอย่างข้อสอบที่สร้าง ({count} ข้อ)</Text>
            <View style={styles.previewItem}>
              <Text style={styles.previewQ}>1. กำหนด f(x) = x³ − 3x จงหา f′(x)</Text>
              <Text style={styles.previewA}>ก) 3x² − 3   ข) 3x²   ค) x² − 3   ง) 3x − 3</Text>
              <Text style={styles.previewAns}>เฉลย: ก) พร้อมคำอธิบาย</Text>
            </View>
            <View style={styles.previewItem}>
              <Text style={styles.previewQ}>2. อนุพันธ์ของฟังก์ชันคงที่มีค่าเท่าใด</Text>
              <Text style={styles.previewA}>ก) 1   ข) 0   ค) x   ง) ไม่นิยาม</Text>
              <Text style={styles.previewAns}>เฉลย: ข) พร้อมคำอธิบาย</Text>
            </View>
            <Text style={styles.previewMore}>และอีก {count - 2} ข้อ...</Text>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

function Step({ number, title }) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepBadge}><Text style={styles.stepNumber}>{number}</Text></View>
      <Text style={styles.stepTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 18, marginBottom: 8 },
  stepBadge: { width: 20, height: 20, borderRadius: 10, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
  stepNumber: { fontFamily: fonts.semiBold, fontSize: 11, color: colors.white },
  stepTitle: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },

  sourceCard: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sourceText: { flex: 1, fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },

  rowWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  checkbox: {
    width: 20, height: 20, borderRadius: 6, borderWidth: 1.5, borderColor: colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkLabel: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.text },

  countChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border },
  countChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  countChipText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text },

  generateBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 22, height: 50, borderRadius: radius.md, backgroundColor: colors.primary,
  },
  generateText: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.white },

  previewTitle: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text, marginBottom: 10 },
  previewItem: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  previewQ: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  previewA: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 4 },
  previewAns: { fontFamily: fonts.medium, fontSize: 12, color: colors.success, marginTop: 4 },
  previewMore: { fontFamily: fonts.regular, fontSize: 12, color: colors.textFaint, textAlign: 'center' },
});
