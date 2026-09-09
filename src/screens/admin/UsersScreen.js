import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';

const MENU = [
  { id: 'm1', label: 'จัดการบัญชีนักเรียน', icon: 'school-outline', count: 1245, nav: 'ManageUsers', params: { userType: 'student' } },
  { id: 'm2', label: 'จัดการบัญชีครู', icon: 'person-outline', count: 98, nav: 'ManageUsers', params: { userType: 'teacher' } },
  { id: 'm3', label: 'จัดการบัญชีผู้ปกครอง', icon: 'people-outline', count: 1102, nav: 'ManageUsers', params: { userType: 'parent' } },
  { id: 'm4', label: 'ปีการศึกษา / ภาคเรียน', icon: 'calendar-outline', nav: 'AcademicTerms' },
  { id: 'm5', label: 'ห้องเรียน / รายวิชา / ตารางเรียน', icon: 'grid-outline', nav: 'RoomsSubjects' },
  { id: 'm6', label: 'กำหนดสิทธิ์การเข้าถึง', icon: 'shield-checkmark-outline', nav: 'Permissions' },
  { id: 'm7', label: 'ตั้งค่า GPS สำหรับเช็กชื่อ', icon: 'locate-outline', nav: 'GPSSettings' },
  { id: 'm8', label: 'บันทึกการใช้งาน (Audit Log)', icon: 'time-outline', nav: 'AuditLog' },
];

export default function AdminUsersScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="จัดการระบบ" subtitle="ผู้ใช้งาน · ข้อมูลพื้นฐาน · ความปลอดภัย" />
      <FlatList
        data={MENU}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(item.nav, item.params)}>
            <Card style={styles.row}>
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon} size={19} color={colors.primary} />
              </View>
              <Text style={styles.label}>{item.label}</Text>
              {item.count != null && <Chip label={item.count.toLocaleString()} tone="secondary" />}
              <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  label: { flex: 1, fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
});
