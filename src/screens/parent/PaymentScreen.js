import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Chip from '../../components/Chip';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { PAYMENT_SUMMARY, PAYMENT_HISTORY, STUDENT } from '../../data/mockData';

export default function ParentPaymentScreen({ navigation }) {
  const [paid, setPaid] = useState(PAYMENT_SUMMARY.status === 'ชำระแล้ว');

  const handlePay = () => {
    Alert.alert(
      'ยืนยันการชำระเงิน (Mockup)',
      `ชำระค่าเทอม ${PAYMENT_SUMMARY.amountDue.toLocaleString()} บาท สำหรับ${PAYMENT_SUMMARY.term}?`,
      [
        { text: 'ยกเลิก', style: 'cancel' },
        { text: 'ชำระเงิน', onPress: () => setPaid(true) },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ค่าธรรมเนียม" subtitle={STUDENT.name} onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.dueCard, paid && styles.dueCardPaid]}>
          <View style={styles.dueTop}>
            <Text style={styles.dueTerm}>{PAYMENT_SUMMARY.term}</Text>
            <Chip label={paid ? 'ชำระแล้ว' : 'ค้างชำระ'} tone={paid ? 'success' : 'warning'} />
          </View>
          <Text style={styles.dueAmount}>฿{PAYMENT_SUMMARY.amountDue.toLocaleString()}</Text>
          {!paid && <Text style={styles.dueDate}>กำหนดชำระภายใน {PAYMENT_SUMMARY.dueDate}</Text>}

          {!paid ? (
            <TouchableOpacity style={styles.payBtn} onPress={handlePay} activeOpacity={0.85}>
              <Ionicons name="card" size={17} color={colors.white} />
              <Text style={styles.payBtnText}>ชำระเงินตอนนี้</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.paidBanner}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.paidBannerText}>ชำระเงินเรียบร้อยแล้ว</Text>
            </View>
          )}
        </View>

        <Text style={styles.sectionTitle}>ประวัติการชำระเงินย้อนหลัง</Text>
        <Card padded={false}>
          {PAYMENT_HISTORY.map((p, i) => (
            <View key={p.id} style={[styles.historyRow, i === PAYMENT_HISTORY.length - 1 && { borderBottomWidth: 0 }]}>
              <View style={styles.historyIcon}>
                <Ionicons name="receipt-outline" size={18} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.historyDesc} numberOfLines={2}>{p.description}</Text>
                <Text style={styles.historyMeta}>{p.date} · {p.method}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.historyAmount}>฿{p.amount.toLocaleString()}</Text>
                <Chip label={p.status} tone="success" style={{ marginTop: 4 }} />
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 20, paddingBottom: 40 },
  dueCard: {
    backgroundColor: colors.primary, borderRadius: radius.lg, padding: 20, marginBottom: 8,
  },
  dueCardPaid: { backgroundColor: colors.success },
  dueTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dueTerm: { fontFamily: fonts.medium, fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  dueAmount: { fontFamily: fonts.bold, fontSize: 32, color: colors.white, marginTop: 10 },
  dueDate: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 4 },

  payBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 46, borderRadius: radius.md, backgroundColor: 'rgba(255,255,255,0.2)', marginTop: 16,
  },
  payBtnText: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.white },

  paidBanner: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16 },
  paidBannerText: { fontFamily: fonts.medium, fontSize: 13, color: colors.white },

  sectionTitle: { fontFamily: fonts.semiBold, fontSize: 15.5, color: colors.text, marginTop: 22, marginBottom: 10 },
  historyRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  historyIcon: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  historyDesc: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text, lineHeight: 17 },
  historyMeta: { fontFamily: fonts.regular, fontSize: 11, color: colors.textMuted, marginTop: 4 },
  historyAmount: { fontFamily: fonts.semiBold, fontSize: 13, color: colors.text },
});
