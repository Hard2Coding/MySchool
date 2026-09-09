import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { CHILD_ASSIGNMENTS, STUDENT } from '../../data/mockData';

const STATUS_TONE = { 'ส่งแล้ว': 'success', 'ยังไม่ส่ง': 'warning', 'ส่งช้า': 'danger' };
const STATUS_ICON = { 'ส่งแล้ว': 'checkmark-circle-outline', 'ยังไม่ส่ง': 'ellipse-outline', 'ส่งช้า': 'alert-circle-outline' };

export default function ParentHomeworkScreen({ navigation }) {
  const submitted = CHILD_ASSIGNMENTS.filter((a) => a.status === 'ส่งแล้ว').length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="งาน / การบ้าน" subtitle={STUDENT.name} onBack={() => navigation.goBack()} showBell={false} />
      <FlatList
        data={CHILD_ASSIGNMENTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 12 }}
        ListHeaderComponent={
          <Card style={{ marginBottom: 12 }}>
            <Text style={styles.summaryText}>
              ส่งงานแล้ว <Text style={styles.summaryBold}>{submitted}</Text> / {CHILD_ASSIGNMENTS.length} ชิ้น
            </Text>
          </Card>
        }
        renderItem={({ item }) => (
          <Card style={styles.row}>
            <Ionicons name={STATUS_ICON[item.status]} size={20} color={colors.textMuted} />
            <View style={{ flex: 1 }}>
              <Text style={styles.subject}>{item.subject}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.due}>กำหนดส่ง {item.due}</Text>
            </View>
            <Chip label={item.status} tone={STATUS_TONE[item.status]} />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  summaryText: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.text },
  summaryBold: { fontFamily: fonts.bold, color: colors.primary, fontSize: 15 },
  row: { flexDirection: 'row', alignItems: 'flex-start', gap: 12 },
  subject: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted },
  title: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text, marginTop: 2 },
  due: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 4 },
});
