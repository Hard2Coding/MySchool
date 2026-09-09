import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { SYSTEM_SETTINGS } from '../../data/mockData';

export default function SystemSettingsScreen({ navigation }) {
  const [settings, setSettings] = useState(SYSTEM_SETTINGS);

  const toggle = (key) => {
    setSettings((prev) => prev.map((s) => (s.key === key ? { ...s, enabled: !s.enabled } : s)));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ตั้งค่าระบบ" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Card padded={false}>
          {settings.map((s, i) => (
            <View key={s.key} style={[styles.row, i === settings.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.label}>{s.label}</Text>
              <Switch
                value={s.enabled}
                onValueChange={() => toggle(s.key)}
                trackColor={{ false: colors.border, true: colors.primarySoft }}
                thumbColor={s.enabled ? colors.primary : '#fff'}
              />
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  row: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  label: { flex: 1, fontFamily: fonts.regular, fontSize: 13.5, color: colors.text, marginRight: 10 },
});
