import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import Card from '../../components/Card';
import Avatar from '../../components/Avatar';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { TEACHER_INBOX, TEACHER } from '../../data/mockData';

export default function TeacherInboxScreen({ navigation }) {
  const openChat = (item) => {
    const systemPrompt =
      item.role === 'นักเรียน'
        ? `คุณคือนักเรียนชื่อ ${item.name} ห้อง ${item.room} กำลังแชทคุยกับครูที่ปรึกษาชื่อ ${TEACHER.name} ทางแอปโรงเรียน ตอบสั้นๆ สุภาพ เหมือนนักเรียนมัธยมไทยคุยกับครู`
        : `คุณคือ ${item.name} ผู้ปกครองของนักเรียน กำลังแชทคุยกับครูที่ปรึกษาชื่อ ${TEACHER.name} ทางแอปโรงเรียน ตอบอย่างสุภาพ ห่วงใยบุตรหลาน`;

    navigation.navigate('SharedChat', {
      personaName: item.name,
      personaSubtitle: `${item.role} · ${item.room}`,
      systemPrompt,
      starterText: item.lastMessage,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScreenHeader title="ข้อความ" subtitle="จากนักเรียนและผู้ปกครอง" showBell={false} onBack={() => navigation.goBack()} />
      <FlatList
        data={TEACHER_INBOX}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.8} onPress={() => openChat(item)}>
            <Card style={styles.row}>
              <View>
                <Avatar name={item.name} size={44} />
                {item.unread && <View style={styles.unreadDot} />}
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.rowTop}>
                  <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.role}>{item.role}</Text>
                </View>
                <Text style={[styles.lastMsg, item.unread && styles.lastMsgUnread]} numberOfLines={1}>
                  {item.lastMessage}
                </Text>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  unreadDot: {
    position: 'absolute', top: -1, right: -1, width: 11, height: 11, borderRadius: 6,
    backgroundColor: colors.primary, borderWidth: 2, borderColor: colors.surface,
  },
  rowTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontFamily: fonts.medium, fontSize: 13.5, color: colors.text, flexShrink: 1 },
  role: { fontFamily: fonts.regular, fontSize: 11, color: colors.textFaint },
  lastMsg: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted, marginTop: 3 },
  lastMsgUnread: { fontFamily: fonts.medium, color: colors.text },
});
