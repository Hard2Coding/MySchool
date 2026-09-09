import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Avatar from '../../components/Avatar';
import QRCode from '../../components/QRCode';
import Barcode from '../../components/Barcode';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { STUDENT } from '../../data/mockData';
import studentPhoto from '../../../assets/avatars/student.png';

export default function StudentCardScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" />

      <View style={[styles.dismissBar, { paddingTop: insets.top + 6 }]}>
        <View style={styles.grabber} />
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16} style={styles.dismissBtn}>
          <Ionicons name="chevron-down" size={22} color="rgba(255,255,255,0.7)" />
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        {/* decorative accents */}
        <View style={styles.accentLineTop} />
        <View style={styles.accentLineBottom} />

        <View style={styles.seal}>
          <Ionicons name="school" size={26} color={colors.white} />
        </View>

        <View style={styles.brandBlock}>
          <Text style={styles.brandTitle}>Butter School</Text>
          <Text style={styles.brandTagline}>WHERE WE USE BUTTER</Text>
        </View>

        <View style={styles.spacer} />

        <View style={styles.infoRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentId}>{STUDENT.id}</Text>
            <Text style={styles.nameTh}>{STUDENT.name}</Text>
            <Text style={styles.nameEn}>{STUDENT.nameEn}</Text>
            <Text style={styles.programLine}>{STUDENT.program}</Text>
            <Text style={styles.programLine}>ระดับชั้น {STUDENT.grade} · ห้อง {STUDENT.room}</Text>
          </View>
          <View style={styles.photoWrap}>
            <Avatar source={studentPhoto} size={92} />
          </View>
        </View>

        <View style={styles.qrRow}>
          <View style={styles.qrWrap}>
            <QRCode value={STUDENT.id} size={110} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Barcode value={STUDENT.id} height={46} barColor={colors.black} narrowWidth={1.5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0B0B0C' },

  dismissBar: { alignItems: 'center', paddingBottom: 8 },
  grabber: { width: 40, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.25)', marginBottom: 10 },
  dismissBtn: { padding: 4 },

  card: { flex: 1, paddingHorizontal: 26, paddingTop: 10, paddingBottom: 24 },

  accentLineTop: {
    position: 'absolute', top: 40, right: -20, width: 130, height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.15)', transform: [{ rotate: '35deg' }],
  },
  accentLineBottom: {
    position: 'absolute', bottom: 60, left: -10, width: 90, height: 1.5,
    backgroundColor: 'rgba(255,255,255,0.12)', transform: [{ rotate: '-20deg' }],
  },

  seal: {
    width: 56, height: 56, borderRadius: 28, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 22,
  },

  brandBlock: {},
  brandTitle: { fontFamily: fonts.bold, fontSize: 40, color: colors.primary, letterSpacing: 1 },
  brandTagline: { fontFamily: fonts.medium, fontSize: 13, color: colors.secondary, marginTop: 6, letterSpacing: 0.5 },

  spacer: { flex: 1, minHeight: 40 },

  infoRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  studentId: { fontFamily: fonts.semiBold, fontSize: 15, color: 'rgba(255,255,255,0.9)', letterSpacing: 1 },
  nameTh: { fontFamily: fonts.semiBold, fontSize: 20, color: colors.white, marginTop: 10 },
  nameEn: { fontFamily: fonts.regular, fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 3 },
  programLine: { fontFamily: fonts.regular, fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 8 },

  photoWrap: {
    borderRadius: 50, borderWidth: 2, borderColor: colors.primary, padding: 3, marginTop: 4,
  },

  qrRow: { alignItems: 'flex-start', marginTop: 16, marginBottom: 12 },
  qrWrap: { backgroundColor: colors.white, padding: 8, borderRadius: radius.sm },

  footer: { backgroundColor: colors.white, paddingVertical: 18, alignItems: 'center' },
  barcodeRow: { flexDirection: 'row', alignItems: 'center' },
});
