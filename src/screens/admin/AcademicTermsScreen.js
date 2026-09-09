import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { ACADEMIC_TERMS } from '../../data/mockData';

export default function AcademicTermsScreen({ navigation }) {
  const [terms, setTerms] = useState(ACADEMIC_TERMS);

  const setActiveTerm = (id) => {
    setTerms((prev) => prev.map((t) => ({ ...t, active: t.id === id })));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ปีการศึกษา / ภาคเรียน" onBack={() => navigation.goBack()} showBell={false} />
      <FlatList
        data={terms}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 10 }}
        ListHeaderComponent={
          <TouchableOpacity style={styles.addBtn}>
            <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
            <Text style={styles.addBtnText}>เพิ่มภาคเรียนใหม่</Text>
          </TouchableOpacity>
        }
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={() => setActiveTerm(item.id)}>
            <Card style={styles.row}>
              <Ionicons
                name={item.active ? 'radio-button-on' : 'radio-button-off'}
                size={20}
                color={item.active ? colors.primary : colors.textFaint}
              />
              <Text style={styles.label}>{item.label}</Text>
              {item.active && <Chip label="กำลังใช้งาน" tone="success" />}
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 46, borderRadius: radius.md, borderWidth: 1, borderColor: colors.primary,
    borderStyle: 'dashed', marginBottom: 4,
  },
  addBtnText: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.primary },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  label: { flex: 1, fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
});
