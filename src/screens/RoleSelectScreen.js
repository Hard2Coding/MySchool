import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/typography';
import { useAuth } from '../context/AuthContext';
import { STUDENT } from '../data/mockData';

const ROLE_META = {
  student: { label: 'นักเรียน', desc: `เข้าสู่ระบบในฐานะ ${STUDENT.firstName}`, icon: 'person-outline', tone: colors.primary },
  parent: { label: 'ผู้ปกครอง', desc: `ติดตามข้อมูลของ ${STUDENT.firstName}`, icon: 'people-outline', tone: colors.secondaryDark },
};

export default function RoleSelectScreen() {
  const { user, chooseRole, logout } = useAuth();

  return (
    <View style={styles.wrap}>
      <TouchableOpacity style={styles.backBtn} onPress={logout} hitSlop={10}>
        <Ionicons name="chevron-back" size={22} color={colors.text} />
        <Text style={styles.backText}>ออกจากระบบ</Text>
      </TouchableOpacity>

      <Text style={styles.title}>เข้าสู่ระบบในฐานะใคร?</Text>
      <Text style={styles.subtitle}>บัญชี {user?.username} สามารถใช้งานได้มากกว่า 1 บทบาท</Text>

      <View style={styles.list}>
        {user?.roles.map((role) => {
          const meta = ROLE_META[role];
          if (!meta) return null;
          return (
            <TouchableOpacity
              key={role}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() => chooseRole(role)}
            >
              <View style={[styles.iconWrap, { backgroundColor: meta.tone }]}>
                <Ionicons name={meta.icon} size={24} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{meta.label}</Text>
                <Text style={styles.cardDesc}>{meta.desc}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textFaint} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 28,
  },
  backText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.text,
    marginLeft: 2,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: colors.textMuted,
    marginTop: 6,
    marginBottom: 28,
  },
  list: {
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 14,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    color: colors.text,
  },
  cardDesc: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 2,
  },
});
