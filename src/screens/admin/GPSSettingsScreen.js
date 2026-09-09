import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { GPS_SETTINGS } from '../../data/mockData';

export default function GPSSettingsScreen({ navigation }) {
  const [lat, setLat] = useState(GPS_SETTINGS.latitude);
  const [lng, setLng] = useState(GPS_SETTINGS.longitude);
  const [radius, setRadiusM] = useState(GPS_SETTINGS.radiusMeters);

  const handleSave = () => {
    Alert.alert('บันทึกการตั้งค่า GPS แล้ว', `พิกัดโรงเรียน: ${lat}, ${lng}\nรัศมีที่อนุญาตให้เช็กชื่อ: ${radius} เมตร`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ตั้งค่า GPS เช็กชื่อ" onBack={() => navigation.goBack()} showBell={false} />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.mapPreview}>
          <Ionicons name="location" size={28} color={colors.primary} />
          <Text style={styles.mapHint}>ตำแหน่งโรงเรียนอ้างอิง</Text>
        </View>

        <Text style={styles.label}>ละติจูด (Latitude)</Text>
        <Card padded={false}><TextInput style={styles.input} value={lat} onChangeText={setLat} keyboardType="numbers-and-punctuation" /></Card>

        <Text style={styles.label}>ลองจิจูด (Longitude)</Text>
        <Card padded={false}><TextInput style={styles.input} value={lng} onChangeText={setLng} keyboardType="numbers-and-punctuation" /></Card>

        <Text style={styles.label}>รัศมีที่อนุญาต (เมตร)</Text>
        <Card padded={false}><TextInput style={styles.input} value={radius} onChangeText={setRadiusM} keyboardType="number-pad" /></Card>

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Ionicons name="save-outline" size={16} color={colors.white} />
          <Text style={styles.saveBtnText}>บันทึกการตั้งค่า</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingBottom: 40 },
  mapPreview: {
    height: 120, borderRadius: radius.lg, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 8,
  },
  mapHint: { fontFamily: fonts.regular, fontSize: 12, color: colors.primaryDark },
  label: { fontFamily: fonts.medium, fontSize: 13, color: colors.text, marginBottom: 8, marginTop: 16 },
  input: { height: 48, paddingHorizontal: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text },
  saveBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    height: 50, borderRadius: radius.md, backgroundColor: colors.primary, marginTop: 24,
  },
  saveBtnText: { fontFamily: fonts.semiBold, fontSize: 15, color: colors.white },
});
