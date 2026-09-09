import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { MOCK_STUDENTS_DIRECTORY, MOCK_TEACHERS, MOCK_PARENTS } from '../../data/mockData';

const CONFIG = {
  student: { title: 'จัดการบัญชีนักเรียน', data: MOCK_STUDENTS_DIRECTORY, sub: (d) => d.room, icon: 'school-outline' },
  teacher: { title: 'จัดการบัญชีครู', data: MOCK_TEACHERS, sub: (d) => `${d.subject} · ${d.room}`, icon: 'person-outline' },
  parent: { title: 'จัดการบัญชีผู้ปกครอง', data: MOCK_PARENTS, sub: (d) => d.child, icon: 'people-outline' },
};

export default function ManageUsersScreen({ route, navigation }) {
  const userType = route.params?.userType || 'student';
  const config = CONFIG[userType];
  const [query, setQuery] = useState('');

  const filtered = config.data.filter((d) => d.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title={config.title} subtitle={`${config.data.length} บัญชี`} onBack={() => navigation.goBack()} showBell={false} />

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="ค้นหาชื่อ..."
          placeholderTextColor={colors.textFaint}
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('AdminUserDetail', { user: item, userType })}
          >
            <Card style={styles.row}>
              <Avatar name={item.name} size={40} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{config.sub(item)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
            </Card>
          </TouchableOpacity>
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
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  name: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
