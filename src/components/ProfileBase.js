import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from './ScreenHeader';
import Card from './Card';
import Avatar from './Avatar';
import Chip from './Chip';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/typography';
import { useAuth } from '../context/AuthContext';

export default function ProfileBase({ name, roleLabel, meta = [], menu = [], imageSource }) {
  const { user, logout, chooseRole } = useAuth();
  const canSwitchRole = user?.roles?.length > 1;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="โปรไฟล์" showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card style={styles.headCard}>
          <View style={styles.headRow}>
            <Avatar name={name} size={56} source={imageSource} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{name}</Text>
              <Chip label={roleLabel} tone="primary" style={{ marginTop: 6 }} />
            </View>
          </View>
        </Card>

        <Card style={styles.metaCard}>
          {meta.map((row, i) => (
            <View key={i} style={[styles.metaRow, i === meta.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.metaLabel}>{row.label}</Text>
              <Text style={styles.metaValue}>{row.value}</Text>
            </View>
          ))}
        </Card>

        {menu.length > 0 && (
          <Card style={styles.metaCard} padded={false}>
            {menu.map((item, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.menuRow, i === menu.length - 1 && { borderBottomWidth: 0 }]}
                activeOpacity={0.6}
                onPress={item.onPress}
              >
                <Ionicons name={item.icon} size={19} color={colors.textMuted} style={{ width: 26 }} />
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={17} color={colors.textFaint} />
              </TouchableOpacity>
            ))}
          </Card>
        )}

        {canSwitchRole && (
          <TouchableOpacity
            style={styles.switchBtn}
            onPress={() => chooseRole(null)}
            activeOpacity={0.8}
          >
            <Ionicons name="swap-horizontal-outline" size={18} color={colors.secondaryDark} />
            <Text style={styles.switchText}>สลับบทบาทผู้ใช้งาน</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutBtn} onPress={logout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={18} color={colors.danger} />
          <Text style={styles.logoutText}>ออกจากระบบ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 14,
  },
  headCard: {},
  headRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  name: {
    fontFamily: fonts.semiBold,
    fontSize: 17,
    color: colors.text,
  },
  metaCard: {},
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  metaLabel: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: colors.textMuted,
  },
  metaValue: {
    fontFamily: fonts.medium,
    fontSize: 13.5,
    color: colors.text,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: 4,
  },
  menuLabel: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.text,
  },
  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.secondarySoft,
  },
  switchText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.secondaryDark,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.dangerSoft,
  },
  logoutText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.danger,
  },
});
