import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Chip from '../../components/Chip';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';

const TYPE_LABEL = { student: 'นักเรียน', teacher: 'ครู', parent: 'ผู้ปกครอง' };

export default function UserDetailScreen({ route, navigation }) {
  const { user, userType } = route.params;
  const [active, setActive] = useState(true);

  const handleResetPassword = () => {
    Alert.alert('รีเซ็ตรหัสผ่านแล้ว', `รหัสผ่านของ ${user.name} ถูกตั้งเป็นค่าเริ่มต้นเรียบร้อย (mockup)`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ข้อมูลผู้ใช้งาน" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.headCard}>
          <View style={styles.headRow}>
            <Avatar name={user.name} size={56} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{user.name}</Text>
              <Chip label={TYPE_LABEL[userType]} tone="primary" style={{ marginTop: 6 }} />
            </View>
          </View>
        </Card>

        <Card style={{ marginTop: 14 }}>
          <Row label="รหัสผู้ใช้ (ID)" value={user.id} />
          {user.room && <Row label="ห้อง" value={user.room} />}
          {user.subject && <Row label="กลุ่มสาระ" value={user.subject} />}
          {user.child && <Row label="บุตรหลาน" value={user.child} last />}
        </Card>

        <Card style={styles.toggleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.toggleLabel}>สถานะบัญชี</Text>
            <Text style={styles.toggleSub}>{active ? 'ใช้งานได้ปกติ' : 'ถูกระงับการใช้งาน'}</Text>
          </View>
          <Switch
            value={active}
            onValueChange={setActive}
            trackColor={{ false: colors.border, true: colors.primarySoft }}
            thumbColor={active ? colors.primary : '#fff'}
          />
        </Card>

        <TouchableOpacity style={styles.resetBtn} onPress={handleResetPassword} activeOpacity={0.85}>
          <Ionicons name="key-outline" size={17} color={colors.white} />
          <Text style={styles.resetBtnText}>รีเซ็ตรหัสผ่านเป็นค่าเริ่มต้น</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function Row({ label, value, last }) {
  return (
    <View style={[styles.metaRow, last && { borderBottomWidth: 0 }]}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  headCard: {},
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  name: { fontFamily: fonts.semiBold, fontSize: 17, color: colors.text },
  metaRow: {
    flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 11,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  metaLabel: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.textMuted },
  metaValue: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },

  toggleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 14 },
  toggleLabel: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  toggleSub: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },

  resetBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 48, borderRadius: radius.md, backgroundColor: colors.primary, marginTop: 20,
  },
  resetBtnText: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.white },
});
