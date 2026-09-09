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
import Avatar from '../../components/Avatar';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { askGemini } from '../../services/gemini';

/**
 * Generic 1:1 chat screen. The "other side" of the conversation is played
 * by Gemini according to `systemPrompt`, so any teacher/student/parent
 * messaging flow in the app can reuse this one screen.
 *
 * route.params:
 *   personaName      display name of who you're chatting with
 *   personaSubtitle  small subtitle under the name (role/room)
 *   systemPrompt     instructions telling Gemini who to roleplay as
 *   starterText      optional first message shown from the persona
 */
export default function ChatScreen({ route, navigation }) {
  const { personaName, personaSubtitle, systemPrompt, starterText } = route.params;
  const [messages, setMessages] = useState(
    starterText ? [{ id: 'starter', from: 'them', text: starterText }] : []
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  const send = async (text) => {
    const t = text?.trim();
    if (!t || loading) return;

    const userMsg = { id: `u-${Date.now()}`, from: 'me', text: t };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));

    try {
      // askGemini expects {from: 'user'|'ai'} — map our me/them onto that
      const history = nextMessages.map((m) => ({ from: m.from === 'me' ? 'user' : 'ai', text: m.text }));
      const replyText = await askGemini(history, systemPrompt);
      setMessages((prev) => [...prev, { id: `t-${Date.now()}`, from: 'them', text: replyText }]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: `e-${Date.now()}`, from: 'them', text: `⚠ ${err.message}` }]);
    } finally {
      setLoading(false);
      requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={90}>
      <ScreenHeader title={personaName} subtitle={personaSubtitle} onBack={() => navigation.goBack()} showBell={false} />

      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{ padding: 20, paddingBottom: 10, gap: 12 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        ListEmptyComponent={
          <Text style={styles.emptyText}>เริ่มการสนทนากับ {personaName} ได้เลย</Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.from === 'me' && styles.bubbleRowRight]}>
            {item.from === 'them' && <Avatar name={personaName} size={26} />}
            <View style={[styles.bubble, item.from === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
              <Text style={[styles.bubbleText, item.from === 'me' && { color: colors.white }]}>{item.text}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          loading ? (
            <View style={[styles.bubbleRow, { marginTop: 4 }]}>
              <Avatar name={personaName} size={26} />
              <View style={[styles.bubble, styles.bubbleThem]}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            </View>
          ) : null
        }
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="พิมพ์ข้อความ..."
          placeholderTextColor={colors.textFaint}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => send(input)}
          editable={!loading}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={() => send(input)} disabled={loading}>
          {loading ? <ActivityIndicator size="small" color={colors.white} /> : <Ionicons name="send" size={17} color={colors.white} />}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  emptyText: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, textAlign: 'center', marginTop: 40 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, maxWidth: '92%' },
  bubbleRowRight: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  bubble: { borderRadius: radius.lg, paddingHorizontal: 14, paddingVertical: 10, maxWidth: '100%' },
  bubbleThem: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleText: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.text, lineHeight: 20 },

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
