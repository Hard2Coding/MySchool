import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import Chip from '../../components/Chip';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { USER_DIRECTORY } from '../../data/mockData';

export default function AdminResetPasswordScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const filtered = query.trim()
    ? USER_DIRECTORY.filter((u) => u.name.toLowerCase().includes(query.toLowerCase()))
    : USER_DIRECTORY;

  const handleReset = (user) => {
    Alert.alert('รีเซ็ตรหัสผ่านแล้ว', `ตั้งรหัสผ่านเริ่มต้นให้ ${user.name} เรียบร้อย (mockup)`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="รีเซ็ตรหัสผ่านผู้ใช้งาน" onBack={() => navigation.goBack()} showBell={false} />

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาชื่อผู้ใช้งาน..."
          placeholderTextColor={colors.textFaint}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => `${item.role}-${item.id}`}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 10 }}
        renderItem={({ item }) => (
          <Card style={styles.row}>
            <Avatar name={item.name} size={38} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>{item.sub}</Text>
            </View>
            <Chip label={item.role} tone="neutral" style={{ marginRight: 8 }} />
            <TouchableOpacity style={styles.resetBtn} onPress={() => handleReset(item)}>
              <Ionicons name="key-outline" size={15} color={colors.primary} />
            </TouchableOpacity>
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchWrap: {
    flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginBottom: 14,
    height: 42, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface, paddingHorizontal: 12,
  },
  searchInput: { flex: 1, fontFamily: fonts.regular, fontSize: 13.5, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  name: { fontFamily: fonts.medium, fontSize: 13, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  resetBtn: {
    width: 34, height: 34, borderRadius: 10, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
});
