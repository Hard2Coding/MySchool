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
import { NEWS } from '../../data/mockData';

export default function BroadcastAnnouncementScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const today = new Date();
  const thaiDate = `${today.getDate()} ${['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][today.getMonth()]} ${today.getFullYear() + 543}`;

  const canPost = title.trim().length > 0;

  const handleBroadcast = () => {
    if (!canPost) return;
    NEWS.unshift({
      id: `news-${Date.now()}`,
      title: title.trim(),
      date: thaiDate,
      tag: 'ประกาศ',
    });
    Alert.alert('ส่งประกาศทั้งโรงเรียนแล้ว', 'นักเรียน ครู และผู้ปกครองทุกคนจะเห็นประกาศนี้ในหน้าข่าวสาร', [
      { text: 'ตกลง', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader title="ส่งประกาศทั้งโรงเรียน" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.notice}>
          <Ionicons name="megaphone" size={16} color={colors.secondaryDark} />
          <Text style={styles.noticeText}>ประกาศนี้จะแสดงถึงผู้ใช้งานทุกคนในระบบ</Text>
        </View>

        <Text style={styles.label}>หัวข้อประกาศ</Text>
        <Card padded={false}>
          <TextInput
            style={styles.titleInput}
            placeholder="เช่น แจ้งปิดปรับปรุงระบบวันเสาร์นี้"
            placeholderTextColor={colors.textFaint}
            value={title}
            onChangeText={setTitle}
          />
        </Card>

        <Text style={styles.label}>รายละเอียด (ถ้ามี)</Text>
        <Card padded={false}>
          <TextInput
            style={styles.bodyInput}
            placeholder="พิมพ์รายละเอียดเพิ่มเติม..."
            placeholderTextColor={colors.textFaint}
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
          />
        </Card>

        <TouchableOpacity style={[styles.postBtn, !canPost && styles.postBtnDisabled]} disabled={!canPost} onPress={handleBroadcast}>
          <Ionicons name="megaphone" size={17} color={colors.white} />
          <Text style={styles.postBtnText}>ส่งประกาศทั้งโรงเรียน</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  notice: {
    flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.secondarySoft,
    borderRadius: radius.md, padding: 12, marginBottom: 6,
  },
  noticeText: { fontFamily: fonts.regular, fontSize: 12, color: colors.secondaryDark, flex: 1 },
  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, marginBottom: 8, marginTop: 16 },
  titleInput: { height: 48, paddingHorizontal: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  bodyInput: { height: 120, padding: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  postBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 50, borderRadius: radius.md, backgroundColor: colors.primary, marginTop: 24,
  },
  postBtnDisabled: { opacity: 0.4 },
  postBtnText: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.white },
});
