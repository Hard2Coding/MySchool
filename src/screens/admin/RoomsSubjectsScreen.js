import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { ROOMS } from '../../data/mockData';

export default function RoomsSubjectsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ห้องเรียน / ตารางเรียน" subtitle={`${ROOMS.length} ห้องเรียน`} onBack={() => navigation.goBack()} showBell={false} />
      <FlatList
        data={ROOMS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 10 }}
        renderItem={({ item }) => (
          <Card style={styles.row}>
            <View style={styles.iconWrap}>
              <Ionicons name="grid-outline" size={19} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.sub}>ครูที่ปรึกษา {item.homeroom} · นักเรียน {item.students} คน</Text>
            </View>
          </Card>
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
  name: { fontFamily: fonts.medium, fontSize: 14, color: colors.text },
  sub: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 3 },
});
