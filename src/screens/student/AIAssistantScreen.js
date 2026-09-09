import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenHeader from '../../components/ScreenHeader';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { AI_QUICK_PROMPTS, AI_STARTER_MESSAGES } from '../../data/mockData';
import { askGemini } from '../../services/gemini';

export default function AIAssistantScreen({ route, navigation }) {
  const { classItem } = route.params;
  const [messages, setMessages] = useState(AI_STARTER_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // บอก Gemini ว่าให้เล่นบทบาทอะไร + จำกัดขอบเขตให้อยู่ในวิชานี้
  // (ของจริงควรแนบเนื้อหาบทเรียน/สไลด์ที่ครูอัปโหลดต่อท้ายตรงนี้ด้วย)
  const systemPrompt = `คุณคือ AI ผู้ช่วยการเรียนรู้ประจำวิชา "${classItem.name}" ของโรงเรียนไทย
ตอบเป็นภาษาไทย กระชับ เข้าใจง่าย เหมาะกับนักเรียนมัธยม
ถ้าเกี่ยวกับคณิตศาสตร์ให้แสดงสูตร/ขั้นตอนทำอย่างชัดเจน`;

  const send = async (text) => {
    const t = text?.trim();
    if (!t || loading) return;

    const userMsg = { id: `u-${Date.now()}`, from: 'user', text: t };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));

    try {
      const replyText = await askGemini(nextMessages, systemPrompt);
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, from: 'ai', text: replyText }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { id: `e-${Date.now()}`, from: 'ai', text: `⚠ ${err.message}` },
      ]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <ScreenHeader title="AI ผู้ช่วยการเรียนรู้" subtitle={classItem.name} onBack={() => navigation.goBack()} showBell={false} />

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 10, gap: 12 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.from === 'user' && styles.bubbleRowRight]}>
            {item.from === 'ai' && (
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={14} color={colors.white} />
              </View>
            )}
            <View style={[styles.bubble, item.from === 'user' ? styles.bubbleUser : styles.bubbleAi]}>
              <Text style={[styles.bubbleText, item.from === 'user' && { color: colors.white }]}>{item.text}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          loading ? (
            <View style={[styles.bubbleRow, { marginTop: 4 }]}>
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={14} color={colors.white} />
              </View>
              <View style={[styles.bubble, styles.bubbleAi]}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            </View>
          ) : null
        }
      />

      <View style={styles.quickRow}>
        <FlatList
          data={AI_QUICK_PROMPTS}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(p) => p}
          contentContainerStyle={{ paddingHorizontal: 20, gap: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.quickChip} onPress={() => send(item)} disabled={loading}>
              <Text style={styles.quickChipText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="พิมพ์คำถาม..."
          placeholderTextColor={colors.textFaint}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => send(input)}
          editable={!loading}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => send(input)} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Ionicons name="send" size={17} color={colors.white} />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, maxWidth: '92%' },
  bubbleRowRight: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  aiAvatar: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  bubble: { borderRadius: radius.lg, paddingHorizontal: 14, paddingVertical: 10, maxWidth: '100%' },
  bubbleAi: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderBottomLeftRadius: 4 },
  bubbleUser: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleText: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.text, lineHeight: 20 },

  quickRow: { paddingVertical: 8 },
  quickChip: {
    backgroundColor: colors.secondarySoft, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill,
  },
  quickChipText: { fontFamily: fonts.medium, fontSize: 12, color: colors.secondaryDark },

  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    paddingHorizontal: 20, paddingVertical: 12, paddingBottom: 20,
    borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.bg,
  },
  input: {
    flex: 1, height: 44, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface, paddingHorizontal: 14, fontFamily: fonts.regular, fontSize: 14, color: colors.text,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
});
