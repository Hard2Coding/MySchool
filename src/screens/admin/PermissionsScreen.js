import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { PERMISSION_ROLES } from '../../data/mockData';

export default function PermissionsScreen({ navigation }) {
  const [roles, setRoles] = useState(PERMISSION_ROLES);

  const toggle = (roleIdx, permKey) => {
    setRoles((prev) =>
      prev.map((r, i) =>
        i !== roleIdx ? r : { ...r, permissions: r.permissions.map((p) => (p.key === permKey ? { ...p, enabled: !p.enabled } : p)) }
      )
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="กำหนดสิทธิ์การเข้าถึง" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        {roles.map((role, i) => (
          <View key={role.role} style={{ marginBottom: 20 }}>
            <Text style={styles.roleTitle}>{role.role}</Text>
            <Card padded={false}>
              {role.permissions.map((p, j) => (
                <View key={p.key} style={[styles.permRow, j === role.permissions.length - 1 && { borderBottomWidth: 0 }]}>
                  <Text style={styles.permLabel}>{p.label}</Text>
                  <Switch
                    value={p.enabled}
                    onValueChange={() => toggle(i, p.key)}
                    trackColor={{ false: colors.border, true: colors.primarySoft }}
                    thumbColor={p.enabled ? colors.primary : '#fff'}
                  />
                </View>
              ))}
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  roleTitle: { fontFamily: fonts.semiBold, fontSize: 14.5, color: colors.text, marginBottom: 10 },
  permRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  permLabel: { flex: 1, fontFamily: fonts.regular, fontSize: 13.5, color: colors.text, marginRight: 10 },
});
