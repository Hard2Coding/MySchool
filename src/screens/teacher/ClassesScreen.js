import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { TEACHER_CLASSES } from '../../data/mockData';

export default function TeacherClassesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="รายวิชาที่รับผิดชอบ" subtitle={`${TEACHER_CLASSES.length} รายวิชา`} />
      <FlatList
        data={TEACHER_CLASSES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('TeacherClassDetail', { classItem: item })}>
            <Card style={styles.row}>
              <View style={styles.iconWrap}>
                <Ionicons name="people" size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.sub}>{item.room} · นักเรียน {item.students} คน</Text>
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
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  iconWrap: {
    width: 44, height: 44, borderRadius: 14, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  name: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 2 },
});
