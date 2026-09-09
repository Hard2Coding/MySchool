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
import Chip from '../../components/Chip';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { REQUEST_TYPES, MY_REQUESTS, STUDENT } from '../../data/mockData';

const STATUS_TONE = { 'อนุมัติแล้ว': 'success', 'รออนุมัติ': 'warning', 'ไม่อนุมัติ': 'danger' };

export default function RequestScreen({ route, navigation }) {
  const asParent = route.params?.asParent;
  const [type, setType] = useState(REQUEST_TYPES[0]);
  const [detail, setDetail] = useState('');
  // Re-render trigger since MY_REQUESTS is mutated in place (module-level mock store)
  const [version, setVersion] = useState(0);

  const today = new Date();
  const thaiDate = `${today.getDate()} ${['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][today.getMonth()]} ${today.getFullYear() + 543}`;

  const canSubmit = detail.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    MY_REQUESTS.unshift({
      id: `r-${Date.now()}`,
      type,
      date: thaiDate,
      detail: detail.trim(),
      status: 'รออนุมัติ',
    });
    setDetail('');
    setVersion((v) => v + 1);
    Alert.alert('ส่งคำร้องแล้ว', 'คำร้องของคุณถูกส่งไปยังครูที่ปรึกษาเรียบร้อย รอการอนุมัติ');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader
        title="ยื่นคำร้องออนไลน์"
        subtitle={asParent ? `สำหรับ ${STUDENT.name}` : undefined}
        onBack={() => navigation.goBack()}
        showBell={false}
      />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>ประเภทคำร้อง</Text>
        <View style={styles.typeRow}>
          {REQUEST_TYPES.map((rt) => (
            <TouchableOpacity
              key={rt}
              style={[styles.typeChip, type === rt && styles.typeChipActive]}
              onPress={() => setType(rt)}
            >
              <Text style={[styles.typeChipText, type === rt && { color: colors.white }]}>{rt}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>รายละเอียด / เหตุผล</Text>
        <Card padded={false}>
          <TextInput
            style={styles.bodyInput}
            placeholder="พิมพ์รายละเอียดคำร้อง..."
            placeholderTextColor={colors.textFaint}
            value={detail}
            onChangeText={setDetail}
            multiline
            textAlignVertical="top"
          />
        </Card>

        <TouchableOpacity style={[styles.submitBtn, !canSubmit && styles.submitBtnDisabled]} disabled={!canSubmit} onPress={handleSubmit}>
          <Ionicons name="paper-plane-outline" size={16} color={colors.white} />
          <Text style={styles.submitBtnText}>ส่งคำร้อง</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>ประวัติคำร้อง</Text>
        <Card padded={false}>
          {MY_REQUESTS.map((r, i) => (
            <View key={r.id} style={[styles.reqRow, i === MY_REQUESTS.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.reqType}>{r.type}</Text>
                <Text style={styles.reqDetail} numberOfLines={2}>{r.detail}</Text>
                <Text style={styles.reqDate}>ยื่นเมื่อ {r.date}</Text>
              </View>
              <Chip label={r.status} tone={STATUS_TONE[r.status] || 'neutral'} />
            </View>
          ))}
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, marginBottom: 8 },
  typeRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  typeChip: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
  },
  typeChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeChipText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text },

  bodyInput: { height: 110, padding: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text },

  submitBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 48, borderRadius: radius.md, backgroundColor: colors.primary, marginTop: 20,
  },
  submitBtnDisabled: { opacity: 0.4 },
  submitBtnText: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.white },

  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.text, marginTop: 26, marginBottom: 10 },
  reqRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10, paddingHorizontal: 16, paddingVertical: 13,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  reqType: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  reqDetail: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 3 },
  reqDate: { fontFamily: fonts.regular, fontSize: 11, color: colors.textFaint, marginTop: 4 },
});
