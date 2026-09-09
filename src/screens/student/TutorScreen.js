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
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { askGemini, askGeminiOnce } from '../../services/gemini';

// ──────────────────────────────────────────────────────────
// Topics the student can choose from
// ──────────────────────────────────────────────────────────
const TOPICS = [
  { id: 't1', label: 'คณิตศาสตร์', icon: 'calculator-outline' },
  { id: 't2', label: 'วิทยาศาสตร์', icon: 'flask-outline' },
  { id: 't3', label: 'ฟิสิกส์', icon: 'planet-outline' },
  { id: 't4', label: 'เคมี', icon: 'beaker-outline' },
  { id: 't5', label: 'ชีววิทยา', icon: 'leaf-outline' },
  { id: 't6', label: 'ภาษาอังกฤษ', icon: 'chatbubbles-outline' },
  { id: 't7', label: 'ภาษาไทย', icon: 'book-outline' },
  { id: 't8', label: 'ประวัติศาสตร์', icon: 'time-outline' },
  { id: 't9', label: 'สังคมศึกษา', icon: 'globe-outline' },
];

// ──────────────────────────────────────────────────────────
// Initial suggested questions per topic — shown before AI responds
// ──────────────────────────────────────────────────────────
const INITIAL_SUGGESTIONS = {
  'คณิตศาสตร์': ['อธิบายอนุพันธ์ให้เข้าใจง่าย', 'เมทริกซ์คืออะไร?', 'ช่วยสอนเรื่องลิมิตหน่อย'],
  'วิทยาศาสตร์': ['กฎของนิวตันมีกี่ข้อ?', 'อธิบายโครงสร้างเซลล์', 'ธาตุและสารประกอบต่างกันยังไง?'],
  'ฟิสิกส์': ['แรงและการเคลื่อนที่คืออะไร?', 'คลื่นแม่เหล็กไฟฟ้าคืออะไร?', 'อธิบายพลังงานศักย์'],
  'เคมี': ['อธิบายตารางธาตุ', 'ปฏิกิริยาเคมีคืออะไร?', 'โมเลกุลและอะตอมต่างกันยังไง?'],
  'ชีววิทยา': ['DNA คืออะไร?', 'อธิบายการสังเคราะห์แสง', 'วิวัฒนาการทำงานยังไง?'],
  'ภาษาอังกฤษ': ['สอน Tense ที่สำคัญ', 'อธิบาย Present Perfect', 'วิธีเขียน Essay ภาษาอังกฤษ'],
  'ภาษาไทย': ['คำราชาศัพท์ใช้ยังไง?', 'อธิบายชนิดของคำ', 'วิธีเขียนเรียงความ'],
  'ประวัติศาสตร์': ['สุโขทัยก่อตั้งเมื่อไหร่?', 'อธิบายยุคอยุธยา', 'สงครามโลกครั้งที่ 2 เกิดขึ้นยังไง?'],
  'สังคมศึกษา': ['ระบบเศรษฐกิจแบบต่างๆ มีอะไรบ้าง?', 'ประชาธิปไตยคืออะไร?', 'อธิบายสิทธิมนุษยชน'],
};
const DEFAULT_SUGGESTIONS = ['ช่วยอธิบายหน่อยได้ไหม?', 'ยกตัวอย่างให้หน่อย', 'สรุปสั้นๆ ให้หน่อย'];

// ──────────────────────────────────────────────────────────
// System prompt — Thai tutor with 3 diagnostic questions
// ──────────────────────────────────────────────────────────
const buildSystemPrompt = (topic) =>
  `คุณคือ "EStudy AI" ติวเตอร์ AI ผู้เชี่ยวชาญด้าน "${topic}" สำหรับนักเรียนไทย
กฎ:
- ตอบเป็นภาษาไทยเสมอ กระชับ เข้าใจง่าย
- เริ่มการสนทนาครั้งแรกโดย ถามคำถามวินิจฉัย 3 ข้อ ดังนี้ (ถามในข้อความเดียว):
  1. อายุของคุณเท่าไหร่?
  2. คุณต้องการได้อะไรจากหัวข้อ "${topic}" นี้?
  3. ระดับความรู้ตอนนี้อยู่ระดับใด (ยังไม่เคยเรียน / พื้นฐาน / ปานกลาง / สูง)?
- หลังได้คำตอบแล้ว ให้ปรับระดับและสไตล์การสอนให้เหมาะกับผู้เรียน
- ใช้ตัวอย่างและการเปรียบเทียบที่เข้าใจง่าย
- ถ้าผู้เรียนถามนอกหัวข้อ ให้ค่อยๆ นำกลับมาที่ "${topic}"`;

// ──────────────────────────────────────────────────────────
// Parse 3 follow-up suggestions from Gemini's raw text
// ──────────────────────────────────────────────────────────
function parseSuggestions(raw) {
  const lines = raw
    .split('\n')
    .map((l) => l.replace(/^[\d.\-–•*)\s]+/, '').replace(/\*\*/g, '').trim())
    .filter((l) => l.length > 5 && l.length < 80);
  return lines.slice(0, 3);
}

export default function TutorScreen() {
  const insets = useSafeAreaInsets();
  const listRef = useRef(null);

  // ── state ──
  const [phase, setPhase] = useState('pick'); // 'pick' | 'chat'
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [customTopic, setCustomTopic] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // suggestions shown in the strip above the input
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(false);

  // ──────────────────────────────────────────────────────────
  // Fetch follow-up suggestions after an AI reply
  // ──────────────────────────────────────────────────────────
  const fetchSuggestions = async (topic, history) => {
    setSuggestionsLoading(true);
    try {
      const lastAiMsg = [...history].reverse().find((m) => m.from === 'ai')?.text || '';
      const prompt = `จากการสนทนาเรื่อง "${topic}" ที่ AI เพิ่งตอบว่า:\n"${lastAiMsg.slice(0, 300)}"\n\nแนะนำคำถามต่อไปที่นักเรียนน่าจะถามได้เลย 3 ข้อ ภาษาไทย สั้นๆ (ไม่เกิน 12 คำต่อข้อ) ตอบเป็นรายการ 1. 2. 3. เท่านั้น`;
      const raw = await askGeminiOnce(prompt);
      const parsed = parseSuggestions(raw);
      if (parsed.length > 0) setSuggestions(parsed);
    } catch {
      // silently fail — suggestions are a bonus UX feature
    } finally {
      setSuggestionsLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────
  // Start a new tutoring session
  // ──────────────────────────────────────────────────────────
  const startSession = async (topic) => {
    setSelectedTopic(topic);
    setMessages([]);
    setPhase('chat');
    setLoading(true);
    setSuggestions(INITIAL_SUGGESTIONS[topic] || DEFAULT_SUGGESTIONS);

    try {
      const systemPrompt = buildSystemPrompt(topic);
      const replyText = await askGemini(
        [{ from: 'user', text: `ฉันอยากเรียนเรื่อง ${topic}` }],
        systemPrompt,
      );
      const firstMsg = { id: `a-${Date.now()}`, from: 'ai', text: replyText };
      setMessages([firstMsg]);
    } catch (err) {
      setMessages([{ id: `e-${Date.now()}`, from: 'ai', text: `⚠ ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  // ──────────────────────────────────────────────────────────
  // Send a message (typed or from suggestion chip)
  // ──────────────────────────────────────────────────────────
  const sendMessage = async (text) => {
    const t = text?.trim();
    if (!t || loading) return;

    setSuggestions([]); // hide suggestions while AI is thinking

    const userMsg = { id: `u-${Date.now()}`, from: 'user', text: t };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);
    requestAnimationFrame(() => listRef.current?.scrollToEnd({ animated: true }));

    try {
      const systemPrompt = buildSystemPrompt(selectedTopic);
      const replyText = await askGemini(nextMessages, systemPrompt);
      const aiMsg = { id: `a-${Date.now()}`, from: 'ai', text: replyText };
      const updatedMessages = [...nextMessages, aiMsg];
      setMessages(updatedMessages);

      // Fetch follow-up suggestions in background
      fetchSuggestions(selectedTopic, updatedMessages);
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

  const reset = () => {
    setPhase('pick');
    setSelectedTopic(null);
    setMessages([]);
    setInput('');
    setCustomTopic('');
    setSuggestions([]);
  };

  // ──────────────────────────────────────────────────────────
  // TOPIC PICKER
  // ──────────────────────────────────────────────────────────
  if (phase === 'pick') {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <View style={styles.pickHeader}>
          <View style={styles.aiLogoWrap}>
            <Ionicons name="sparkles" size={28} color={colors.white} />
          </View>
          <Text style={styles.pickTitle}>EStudy AI Tutor</Text>
          <Text style={styles.pickSub}>เลือกหัวข้อที่ต้องการเรียน AI จะเป็นติวเตอร์ส่วนตัวให้คุณ</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.pickScroll}>
          <Text style={styles.sectionLabel}>หัวข้อยอดนิยม</Text>
          <View style={styles.topicGrid}>
            {TOPICS.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={styles.topicCard}
                activeOpacity={0.8}
                onPress={() => startSession(t.label)}
              >
                <View style={styles.topicIconWrap}>
                  <Ionicons name={t.icon} size={22} color={colors.primary} />
                </View>
                <Text style={styles.topicLabel}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>หรือพิมพ์หัวข้อที่ต้องการ</Text>
          <View style={styles.customRow}>
            <TextInput
              style={styles.customInput}
              placeholder="เช่น แคลคูลัส, การเขียนโปรแกรม Python..."
              placeholderTextColor={colors.textFaint}
              value={customTopic}
              onChangeText={setCustomTopic}
              returnKeyType="go"
              onSubmitEditing={() => customTopic.trim() && startSession(customTopic.trim())}
            />
            <TouchableOpacity
              style={[styles.customBtn, !customTopic.trim() && { opacity: 0.4 }]}
              onPress={() => customTopic.trim() && startSession(customTopic.trim())}
              disabled={!customTopic.trim()}
            >
              <Ionicons name="arrow-forward" size={18} color={colors.white} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  // ──────────────────────────────────────────────────────────
  // CHAT SCREEN
  // ──────────────────────────────────────────────────────────
  const showSuggestionsStrip = suggestions.length > 0 || suggestionsLoading;

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={reset} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <View style={styles.chatHeaderCenter}>
          <View style={styles.aiLogoSmall}>
            <Ionicons name="sparkles" size={14} color={colors.white} />
          </View>
          <View>
            <Text style={styles.chatHeaderTitle}>EStudy AI Tutor</Text>
            <Text style={styles.chatHeaderSub}>{selectedTopic}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={reset} style={styles.resetBtn}>
          <Ionicons name="refresh" size={18} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(m) => m.id}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
        renderItem={({ item }) => (
          <View style={[styles.bubbleRow, item.from === 'user' && styles.bubbleRowRight]}>
            {item.from === 'ai' && (
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={12} color={colors.white} />
              </View>
            )}
            <View style={[styles.bubble, item.from === 'user' ? styles.bubbleUser : styles.bubbleAi]}>
              <Text style={[styles.bubbleText, item.from === 'user' && { color: colors.white }]}>
                {item.text}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          loading ? (
            <View style={[styles.bubbleRow, { marginTop: 4 }]}>
              <View style={styles.aiAvatar}>
                <Ionicons name="sparkles" size={12} color={colors.white} />
              </View>
              <View style={[styles.bubble, styles.bubbleAi, styles.typingBubble]}>
                <ActivityIndicator size="small" color={colors.primary} />
                <Text style={styles.typingText}>กำลังคิด...</Text>
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyChat}>
              <ActivityIndicator color={colors.primary} />
              <Text style={styles.emptyChatText}>กำลังเตรียมติวเตอร์...</Text>
            </View>
          ) : null
        }
      />

      {/* ── Suggested questions strip ── */}
      {showSuggestionsStrip && (
        <View style={styles.suggestionsWrap}>
          {suggestionsLoading && suggestions.length === 0 ? (
            <View style={styles.suggestionsLoading}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.suggestionsLoadingText}>กำลังสร้างคำถามแนะนำ...</Text>
            </View>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.suggestionsScroll}
              keyboardShouldPersistTaps="handled"
            >
              {suggestions.map((s, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.suggestionChip}
                  onPress={() => sendMessage(s)}
                  disabled={loading}
                  activeOpacity={0.75}
                >
                  <Ionicons name="chatbubble-ellipses-outline" size={12} color={colors.primary} />
                  <Text style={styles.suggestionChipText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      {/* Input row */}
      <View style={[styles.inputRow, { paddingBottom: insets.bottom + 12 }]}>
        <TextInput
          style={styles.input}
          placeholder="พิมพ์คำถามหรือคำตอบ..."
          placeholderTextColor={colors.textFaint}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => sendMessage(input)}
          editable={!loading}
          multiline
        />
        <TouchableOpacity
          style={[styles.sendBtn, loading && { opacity: 0.5 }]}
          onPress={() => sendMessage(input)}
          disabled={loading}
        >
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
  container: { flex: 1, backgroundColor: colors.bg },

  // ── TOPIC PICKER ──
  pickHeader: { alignItems: 'center', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 24 },
  aiLogoWrap: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 16, elevation: 8,
  },
  pickTitle: { fontFamily: fonts.bold, fontSize: 22, color: colors.text, marginBottom: 6 },
  pickSub: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted, textAlign: 'center', lineHeight: 20 },
  pickScroll: { paddingHorizontal: 20, paddingBottom: 40 },
  sectionLabel: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text, marginBottom: 12, marginTop: 4 },
  topicGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  topicCard: {
    width: '30%', flexGrow: 1,
    backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    paddingVertical: 16, paddingHorizontal: 12, alignItems: 'center', gap: 8,
  },
  topicIconWrap: {
    width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primarySoft,
    alignItems: 'center', justifyContent: 'center',
  },
  topicLabel: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.text, textAlign: 'center' },
  customRow: { flexDirection: 'row', gap: 10 },
  customInput: {
    flex: 1, height: 48, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface, paddingHorizontal: 14, fontFamily: fonts.regular, fontSize: 13.5, color: colors.text,
  },
  customBtn: {
    width: 48, height: 48, borderRadius: radius.md, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },

  // ── CHAT ──
  chatHeader: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16,
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface,
  },
  backBtn: { padding: 4 },
  chatHeaderCenter: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, marginLeft: 6 },
  aiLogoSmall: {
    width: 30, height: 30, borderRadius: 15, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  chatHeaderTitle: { fontFamily: fonts.semiBold, fontSize: 14, color: colors.text },
  chatHeaderSub: { fontFamily: fonts.regular, fontSize: 11.5, color: colors.textMuted },
  resetBtn: { padding: 6 },

  messageList: { padding: 16, paddingBottom: 12, gap: 12 },
  bubbleRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, maxWidth: '92%' },
  bubbleRowRight: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  aiAvatar: {
    width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  bubble: { borderRadius: radius.lg, paddingHorizontal: 14, paddingVertical: 10, maxWidth: '85%' },
  bubbleAi: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderBottomLeftRadius: 4 },
  bubbleUser: { backgroundColor: colors.primary, borderBottomRightRadius: 4 },
  bubbleText: { fontFamily: fonts.regular, fontSize: 13.5, color: colors.text, lineHeight: 21 },
  typingBubble: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  typingText: { fontFamily: fonts.regular, fontSize: 12.5, color: colors.textMuted },

  emptyChat: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60, gap: 12 },
  emptyChatText: { fontFamily: fonts.regular, fontSize: 13, color: colors.textMuted },

  // ── SUGGESTIONS STRIP ──
  suggestionsWrap: {
    borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.surface,
    paddingVertical: 10,
  },
  suggestionsLoading: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 16, paddingVertical: 4,
  },
  suggestionsLoadingText: { fontFamily: fonts.regular, fontSize: 12, color: colors.textMuted },
  suggestionsScroll: { paddingHorizontal: 14, gap: 8 },
  suggestionChip: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: '#f0c0be',
    borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8,
  },
  suggestionChipText: { fontFamily: fonts.medium, fontSize: 12.5, color: colors.primary },

  // ── INPUT ──
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    paddingHorizontal: 16, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.bg,
  },
  input: {
    flex: 1, minHeight: 44, maxHeight: 120, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border,
    backgroundColor: colors.surface, paddingHorizontal: 14, paddingVertical: 10,
    fontFamily: fonts.regular, fontSize: 14, color: colors.text,
  },
  sendBtn: {
    width: 44, height: 44, borderRadius: radius.md, backgroundColor: colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
});
