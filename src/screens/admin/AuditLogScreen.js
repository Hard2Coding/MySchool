import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { AUDIT_LOG } from '../../data/mockData';

export default function AuditLogScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="บันทึกการใช้งาน" subtitle="Audit Log" onBack={() => navigation.goBack()} showBell={false} />
      <FlatList
        data={AUDIT_LOG}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <View style={styles.timeline}>
              <View style={styles.dot} />
              {index !== AUDIT_LOG.length - 1 && <View style={styles.line} />}
            </View>
            <Card style={{ flex: 1, marginBottom: 14 }}>
              <Text style={styles.action}>{item.action}</Text>
              <View style={styles.metaRow}>
                <Ionicons name="person-outline" size={12} color={colors.textMuted} />
                <Text style={styles.meta}>{item.user}</Text>
                <Ionicons name="time-outline" size={12} color={colors.textMuted} style={{ marginLeft: 8 }} />
                <Text style={styles.meta}>{item.time}</Text>
              </View>
            </Card>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12 },
  timeline: { alignItems: 'center', width: 12 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: colors.primary, marginTop: 16 },
  line: { flex: 1, width: 1.5, backgroundColor: colors.border, marginTop: 4 },
  action: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  meta: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, marginLeft: 3 },
});
