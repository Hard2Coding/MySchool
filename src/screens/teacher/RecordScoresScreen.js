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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { TEACHER_CLASSES, STUDENT_ROSTERS } from '../../data/mockData';

export default function RecordScoresScreen({ navigation }) {
  const [classId, setClassId] = useState(TEACHER_CLASSES[0].id);
  const roster = STUDENT_ROSTERS[classId] || [];
  const [scores, setScores] = useState({});
  const [savedIds, setSavedIds] = useState({});

  const selectClass = (id) => {
    setClassId(id);
    setScores({});
    setSavedIds({});
  };

  const setScore = (studentId, value) => {
    // digits only, max 3 chars (0-100)
    const cleaned = value.replace(/[^0-9]/g, '').slice(0, 3);
    setScores((prev) => ({ ...prev, [studentId]: cleaned }));
    setSavedIds((prev) => ({ ...prev, [studentId]: false }));
  };

  const saveScore = (studentId) => {
    if (!scores[studentId]) return;
    setSavedIds((prev) => ({ ...prev, [studentId]: true }));
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <ScreenHeader title="บันทึกคะแนน" subtitle="พิมพ์คะแนนแล้วกดปุ่มถูกเพื่อบันทึก" onBack={() => navigation.goBack()} showBell={false} />

      <View style={styles.classRow}>
        {TEACHER_CLASSES.map((c) => (
          <TouchableOpacity
            key={c.id}
            style={[styles.classChip, classId === c.id && styles.classChipActive]}
            onPress={() => selectClass(c.id)}
          >
            <Text style={[styles.classChipText, classId === c.id && { color: colors.white }]} numberOfLines={1}>
              {c.room}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Card padded={false}>
          {roster.map((s, i) => {
            const isSaved = savedIds[s.id];
            return (
              <View key={s.id} style={[styles.row, i === roster.length - 1 && { borderBottomWidth: 0 }]}>
                <Avatar name={s.name} size={36} />
                <Text style={styles.name} numberOfLines={1}>{s.name}</Text>
                <TextInput
                  style={[styles.scoreInput, isSaved && styles.scoreInputSaved]}
                  placeholder="0-100"
                  placeholderTextColor={colors.textFaint}
                  keyboardType="number-pad"
                  value={scores[s.id] || ''}
                  onChangeText={(v) => setScore(s.id, v)}
                />
                <TouchableOpacity
                  style={[styles.saveIconBtn, isSaved && styles.saveIconBtnSaved]}
                  onPress={() => saveScore(s.id)}
                  disabled={!scores[s.id]}
                >
                  <Ionicons name={isSaved ? 'checkmark' : 'save-outline'} size={16} color={isSaved ? colors.white : colors.primary} />
                </TouchableOpacity>
              </View>
            );
          })}
        </Card>

        <Text style={styles.hint}>
          บันทึกแล้ว {Object.values(savedIds).filter(Boolean).length}/{roster.length} คน
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  classRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 20, paddingBottom: 14 },
  classChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
  },
  classChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  classChipText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text },

  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  name: { flex: 1, fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  scoreInput: {
    width: 56, height: 36, borderRadius: 10, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.bg, textAlign: 'center', fontFamily: fonts.medium, fontSize: 13, color: colors.text,
  },
  scoreInputSaved: { borderColor: colors.success, backgroundColor: colors.successSoft },
  saveIconBtn: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  saveIconBtnSaved: { backgroundColor: colors.success },

  hint: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 14 },
});
