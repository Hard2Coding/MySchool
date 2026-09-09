import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import ProgressBar from '../../components/ProgressBar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { CLASSES } from '../../data/mockData';

export default function ClassesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="วิชาเรียนของฉัน" subtitle={`${CLASSES.length} รายวิชา · ภาคเรียนที่ 1/2569`} />
      <FlatList
        data={CLASSES}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 12 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ClassDetail', { classItem: item })}
          >
            <Card style={styles.row}>
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon} size={22} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.teacher} numberOfLines={1}>{item.teacher}</Text>
                <View style={styles.progressRow}>
                  <ProgressBar value={item.progress} height={6} />
                  <Text style={styles.progressText}>{item.progress}%</Text>
                </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { fontFamily: fonts.medium, fontSize: 14.5, color: colors.text },
  teacher: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 1, marginBottom: 8 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  progressText: { fontFamily: fonts.medium, fontSize: 11, color: colors.textMuted, width: 32 },
});
