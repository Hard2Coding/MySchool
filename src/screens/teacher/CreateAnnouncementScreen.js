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
import { TEACHER_CLASSES, TEACHER_CLASS_FEED } from '../../data/mockData';

export default function CreateAnnouncementScreen({ route, navigation }) {
  const preselected = route.params?.classItem;
  const [classId, setClassId] = useState(preselected?.id || TEACHER_CLASSES[0].id);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const today = new Date();
  const thaiDate = `${today.getDate()} ${['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][today.getMonth()]} ${today.getFullYear() + 543}`;

  const canPost = title.trim().length > 0 && body.trim().length > 0;

  const handlePost = () => {
    if (!canPost) return;
    const newAnnouncement = {
      id: `ta-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      date: thaiDate,
    };
    // mockup "backend": push straight into the in-memory store
    if (!TEACHER_CLASS_FEED[classId]) TEACHER_CLASS_FEED[classId] = [];
    TEACHER_CLASS_FEED[classId].unshift(newAnnouncement);

    Alert.alert('โพสต์ประกาศแล้ว', 'นักเรียนในวิชานี้จะเห็นประกาศนี้ในหน้าคลาส', [
      { text: 'ตกลง', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScreenHeader title="สร้างประกาศ" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>เลือกรายวิชา</Text>
        <View style={styles.classRow}>
          {TEACHER_CLASSES.map((c) => (
            <TouchableOpacity
              key={c.id}
              style={[styles.classChip, classId === c.id && styles.classChipActive]}
              onPress={() => setClassId(c.id)}
            >
              <Text style={[styles.classChipText, classId === c.id && { color: colors.white }]} numberOfLines={1}>
                {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>หัวข้อประกาศ</Text>
        <Card padded={false}>
          <TextInput
            style={styles.titleInput}
            placeholder="เช่น แจ้งเลื่อนสอบกลางภาค"
            placeholderTextColor={colors.textFaint}
            value={title}
            onChangeText={setTitle}
          />
        </Card>

        <Text style={styles.label}>รายละเอียด</Text>
        <Card padded={false}>
          <TextInput
            style={styles.bodyInput}
            placeholder="พิมพ์เนื้อหาประกาศ..."
            placeholderTextColor={colors.textFaint}
            value={body}
            onChangeText={setBody}
            multiline
            textAlignVertical="top"
          />
        </Card>

        <TouchableOpacity style={[styles.postBtn, !canPost && styles.postBtnDisabled]} disabled={!canPost} onPress={handlePost}>
          <Ionicons name="megaphone" size={17} color={colors.white} />
          <Text style={styles.postBtnText}>โพสต์ประกาศ</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, marginBottom: 8, marginTop: 16 },
  classRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  classChip: {
    paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill,
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, maxWidth: '100%',
  },
  classChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  classChipText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text },

  titleInput: {
    height: 48, paddingHorizontal: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text,
  },
  bodyInput: {
    height: 140, padding: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text,
  },

  postBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 50, borderRadius: radius.md, backgroundColor: colors.primary, marginTop: 24,
  },
  postBtnDisabled: { opacity: 0.4 },
  postBtnText: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.white },
});
