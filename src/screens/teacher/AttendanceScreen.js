import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { TEACHER_CLASSES, STUDENT_ROSTERS } from '../../data/mockData';

const STATUS_CYCLE = ['present', 'late', 'absent'];
const STATUS_META = {
  present: { label: 'มาเรียน', color: colors.success, bg: colors.successSoft, icon: 'checkmark-circle' },
  late: { label: 'มาสาย', color: colors.warning, bg: colors.warningSoft, icon: 'time' },
  absent: { label: 'ขาดเรียน', color: colors.danger, bg: colors.dangerSoft, icon: 'close-circle' },
};

function initialStatuses(roster) {
  const map = {};
  roster.forEach((s) => { map[s.id] = 'present'; });
  return map;
}

export default function TeacherAttendanceScreen({ navigation }) {
  const [classId, setClassId] = useState(TEACHER_CLASSES[0].id);
  const roster = STUDENT_ROSTERS[classId] || [];
  const [statuses, setStatuses] = useState(() => initialStatuses(roster));

  const selectClass = (id) => {
    setClassId(id);
    setStatuses(initialStatuses(STUDENT_ROSTERS[id] || []));
  };

  const cycleStatus = (studentId) => {
    setStatuses((prev) => {
      const current = prev[studentId] || 'present';
      const nextIdx = (STATUS_CYCLE.indexOf(current) + 1) % STATUS_CYCLE.length;
      return { ...prev, [studentId]: STATUS_CYCLE[nextIdx] };
    });
  };

  const presentCount = Object.values(statuses).filter((s) => s === 'present').length;

  const handleSave = () => {
    Alert.alert('บันทึกการเช็กชื่อแล้ว', `มาเรียน ${presentCount}/${roster.length} คน`, [
      { text: 'ตกลง', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="เช็กชื่อเข้าเรียน" subtitle="แตะชื่อนักเรียนเพื่อเปลี่ยนสถานะ" onBack={() => navigation.goBack()} showBell={false} />

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

      <ScrollView contentContainerStyle={styles.scroll}>
        <Card padded={false}>
          {roster.map((s, i) => {
            const status = statuses[s.id] || 'present';
            const meta = STATUS_META[status];
            return (
              <TouchableOpacity
                key={s.id}
                style={[styles.row, i === roster.length - 1 && { borderBottomWidth: 0 }]}
                activeOpacity={0.6}
                onPress={() => cycleStatus(s.id)}
              >
                <Avatar name={s.name} size={36} />
                <Text style={styles.name} numberOfLines={1}>{s.name}</Text>
                <View style={[styles.statusPill, { backgroundColor: meta.bg }]}>
                  <Ionicons name={meta.icon} size={14} color={meta.color} />
                  <Text style={[styles.statusText, { color: meta.color }]}>{meta.label}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </Card>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Ionicons name="checkmark-done" size={17} color={colors.white} />
          <Text style={styles.saveBtnText}>บันทึกการเช็กชื่อ ({presentCount}/{roster.length})</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  classRow: {
    flexDirection: 'row', gap: 8, paddingHorizontal: 20, paddingBottom: 14,
  },
  classChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
  },
  classChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  classChipText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text },

  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  row: {
    flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  name: { flex: 1, fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  statusPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 10, paddingVertical: 6, borderRadius: radius.pill,
  },
  statusText: { fontFamily: fonts.medium, fontSize: 11.5 },

  saveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 50, borderRadius: radius.md, backgroundColor: colors.primary, marginTop: 16,
  },
  saveBtnText: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.white },
});
