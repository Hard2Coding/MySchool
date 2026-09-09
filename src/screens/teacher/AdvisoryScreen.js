import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { TEACHER, STUDENT_ROSTERS, BEHAVIOR_SCORES } from '../../data/mockData';

// tc2 = ม.5/2, matches TEACHER.advisorRoom
const ADVISORY_CLASS_ID = 'tc2';

export default function AdvisoryScreen({ navigation }) {
  const roster = STUDENT_ROSTERS[ADVISORY_CLASS_ID] || [];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader
        title="นักเรียนในความดูแล"
        subtitle={`ครูที่ปรึกษา ${TEACHER.advisorRoom} · ${roster.length} คน`}
        onBack={() => navigation.goBack()}
        showBell={false}
      />
      <FlatList
        data={roster}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 10 }}
        renderItem={({ item }) => {
          const b = BEHAVIOR_SCORES[item.id] || { score: 100, history: [] };
          const tone = b.score < 80 ? colors.danger : colors.success;
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('AdjustBehaviorScore', { student: item })}
            >
              <Card style={styles.row}>
                <Avatar name={item.name} size={40} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.sub}>คะแนนคุณลักษณะ: <Text style={{ color: tone, fontFamily: fonts.semiBold }}>{b.score}/100</Text></Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textFaint} />
              </Card>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  name: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 3 },
});
