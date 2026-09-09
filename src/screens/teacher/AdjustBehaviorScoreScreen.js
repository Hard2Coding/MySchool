import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { BEHAVIOR_SCORES } from '../../data/mockData';

export default function AdjustBehaviorScoreScreen({ route, navigation }) {
  const { student } = route.params;
  const [delta, setDelta] = useState(0);
  const [reason, setReason] = useState('');
  const [, setVersion] = useState(0); // force re-render after mutating the store

  const record = BEHAVIOR_SCORES[student.id] || { score: 100, history: [] };

  const canSubmit = delta !== 0 && reason.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    record.score = Math.max(0, Math.min(100, record.score + delta));
    record.history.unshift({
      id: `bh-${Date.now()}`,
      delta,
      reason: reason.trim(),
      date: 'วันนี้',
    });
    BEHAVIOR_SCORES[student.id] = record;
    setVersion((v) => v + 1);
    setDelta(0);
    setReason('');
    Alert.alert('บันทึกแล้ว', `ปรับคะแนนคุณลักษณะของ ${student.name} เรียบร้อย`);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader title={student.name} subtitle="ปรับคะแนนคุณลักษณะ" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>คะแนนคุณลักษณะปัจจุบัน</Text>
          <Text style={styles.scoreValue}>{record.score} / 100</Text>
        </View>

        <Text style={styles.label}>ปรับคะแนน</Text>
        <View style={styles.deltaRow}>
          {[-10, -5, -1, +1, +5, +10].map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.deltaChip, delta === d && (d > 0 ? styles.deltaChipPlus : styles.deltaChipMinus)]}
              onPress={() => setDelta(d)}
            >
              <Text style={[styles.deltaChipText, delta === d && { color: colors.white }]}>{d > 0 ? `+${d}` : d}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>เหตุผลประกอบ (จำเป็น)</Text>
        <Card padded={false}>
          <TextInput
            style={styles.reasonInput}
            placeholder="เช่น มาสายเกิน 3 ครั้ง / ช่วยเหลือกิจกรรมโรงเรียน"
            placeholderTextColor={colors.textFaint}
            value={reason}
            onChangeText={setReason}
            multiline
            textAlignVertical="top"
          />
        </Card>

        <TouchableOpacity style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]} disabled={!canSubmit} onPress={handleSubmit}>
          <Ionicons name="checkmark-done" size={17} color={colors.white} />
          <Text style={styles.submitBtnText}>บันทึกการปรับคะแนน</Text>
        </TouchableOpacity>

        {record.history.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>ประวัติการปรับคะแนน</Text>
            <Card padded={false}>
              {record.history.map((h, i) => (
                <View key={h.id} style={[styles.histRow, i === record.history.length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={[styles.histDelta, { color: h.delta > 0 ? colors.success : colors.danger }]}>
                    {h.delta > 0 ? `+${h.delta}` : h.delta}
                  </Text>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.histReason}>{h.reason}</Text>
                    <Text style={styles.histDate}>{h.date}</Text>
                  </View>
                </View>
              ))}
            </Card>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  scoreCard: {
    backgroundColor: colors.primary, borderRadius: radius.lg, padding: 20, alignItems: 'center', marginBottom: 8,
  },
  scoreLabel: { fontFamily: fonts.regular, fontSize: 12.5, color: 'rgba(255,255,255,0.85)' },
  scoreValue: { fontFamily: fonts.bold, fontSize: 30, color: colors.white, marginTop: 6 },

  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, marginBottom: 8, marginTop: 18 },
  deltaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  deltaChip: {
    paddingHorizontal: 16, paddingVertical: 10, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
  },
  deltaChipPlus: { backgroundColor: colors.success, borderColor: colors.success },
  deltaChipMinus: { backgroundColor: colors.danger, borderColor: colors.danger },
  deltaChipText: { fontFamily: fonts.semiBold, fontSize: 13.5, color: colors.text },

  reasonInput: { height: 90, padding: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text },

  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 48, borderRadius: radius.md, backgroundColor: colors.primary, marginTop: 22,
  },
  submitBtnDisabled: { opacity: 0.4 },
  submitBtnText: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.white },

  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text, marginTop: 26, marginBottom: 10 },
  histRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  histDelta: { fontFamily: fonts.bold, fontSize: 14, width: 34 },
  histReason: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.text },
  histDate: { fontFamily: fonts.regular, fontSize: 11, color: colors.textFaint, marginTop: 2 },
});
