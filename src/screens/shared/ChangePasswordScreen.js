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
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';

export default function ChangePasswordScreen({ navigation }) {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!current || !next || !confirm) {
      setError('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    if (next.length < 4) {
      setError('รหัสผ่านใหม่ต้องมีอย่างน้อย 4 ตัวอักษร');
      return;
    }
    if (next !== confirm) {
      setError('รหัสผ่านใหม่และการยืนยันไม่ตรงกัน');
      return;
    }
    setError('');
    Alert.alert('เปลี่ยนรหัสผ่านสำเร็จ', 'กรุณาใช้รหัสผ่านใหม่ในการเข้าสู่ระบบครั้งถัดไป (mockup)', [
      { text: 'ตกลง', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader title="เปลี่ยนรหัสผ่าน" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Field label="รหัสผ่านปัจจุบัน" value={current} onChangeText={setCurrent} secureTextEntry />
        <Field label="รหัสผ่านใหม่" value={next} onChangeText={setNext} secureTextEntry />
        <Field label="ยืนยันรหัสผ่านใหม่" value={confirm} onChangeText={setConfirm} secureTextEntry />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>เปลี่ยนรหัสผ่าน</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function Field({ label, ...props }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Card padded={false}>
        <TextInput style={styles.input} placeholderTextColor={colors.textFaint} {...props} />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, marginBottom: 8, marginTop: 14 },
  input: { height: 48, paddingHorizontal: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  error: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.danger, marginTop: 12 },
  saveBtn: {
    height: 50, borderRadius: radius.md, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginTop: 22,
  },
  saveBtnText: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.white },
});
