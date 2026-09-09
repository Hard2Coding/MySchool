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
import Avatar from '../../components/Avatar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';

export default function EditProfileScreen({ route, navigation }) {
  const initial = route.params || {};
  const [name, setName] = useState(initial.name || '');
  const [phone, setPhone] = useState(initial.phone || '08X-XXX-XXXX');
  const [email, setEmail] = useState(initial.email || '');

  const handleSave = () => {
    Alert.alert('บันทึกข้อมูลแล้ว', 'อัปเดตข้อมูลส่วนตัวเรียบร้อย (mockup — ยังไม่ได้เชื่อมฐานข้อมูลจริง)', [
      { text: 'ตกลง', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader title="แก้ไขข้อมูลส่วนตัว" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarWrap}>
          <Avatar name={name} size={80} source={initial.photoSource} />
          <TouchableOpacity style={styles.changePhotoBtn}>
            <Ionicons name="camera-outline" size={14} color={colors.primary} />
            <Text style={styles.changePhotoText}>เปลี่ยนรูปโปรไฟล์</Text>
          </TouchableOpacity>
        </View>

        <Field label="ชื่อ-นามสกุล" value={name} onChangeText={setName} />
        <Field label="เบอร์โทรศัพท์" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
        <Field label="อีเมล" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Text style={styles.saveBtnText}>บันทึกการเปลี่ยนแปลง</Text>
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
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          {...props}
        />
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  avatarWrap: { alignItems: 'center', marginBottom: 22, gap: 10 },
  changePhotoBtn: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  changePhotoText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.primary },
  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, marginBottom: 8, marginTop: 14 },
  input: { height: 48, paddingHorizontal: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  saveBtn: {
    height: 50, borderRadius: radius.md, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginTop: 26,
  },
  saveBtnText: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.white },
});
