import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, shadow } from '../theme/colors';
import { fonts } from '../theme/typography';

export default function PdpaConsentModal({ visible, onAccept }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleAccept = () => {
    if (isChecked && onAccept) {
      onAccept();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerIconWrap}>
                <Ionicons name="shield-checkmark" size={26} color={colors.primary} />
              </View>
              <View style={styles.headerTextWrap}>
                <Text style={styles.headerTitle}>PDPA Consent</Text>
                <Text style={styles.headerSubtitle}>
                  หนังสือยินยอมให้เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคล
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Scrollable Privacy Details */}
            <ScrollView
              style={styles.scrollArea}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={true}
            >
              <Text style={styles.sectionMainTitle}>ข้อมูลส่วนบุคคลที่ MySchool จัดเก็บ</Text>
              <Text style={styles.introText}>
                MySchool ให้บริการระบบบริหารจัดการสถานศึกษา (Student Information System: SIS) ระบบห้องเรียนออนไลน์ และผู้ช่วย AI เพื่อสนับสนุนการเรียนการสอน โดยระบบอาจเก็บรวบรวมข้อมูลส่วนบุคคล ดังต่อไปนี้
              </Text>

              {/* Section 1 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>1</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลบัญชีผู้ใช้งาน</Text>
                </View>
                <Text style={styles.subTarget}>สำหรับนักเรียน ครู ผู้ปกครอง และผู้ดูแลระบบ</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ชื่อ - นามสกุล</Text>
                  <Text style={styles.bulletItem}>• เลขประจำตัวนักเรียน / รหัสบุคลากร</Text>
                  <Text style={styles.bulletItem}>• อีเมล</Text>
                  <Text style={styles.bulletItem}>• เบอร์โทรศัพท์</Text>
                  <Text style={styles.bulletItem}>• รูปโปรไฟล์</Text>
                  <Text style={styles.bulletItem}>• ชื่อผู้ใช้ (Username)</Text>
                  <Text style={styles.bulletItem}>• รหัสผ่าน (จัดเก็บในรูปแบบเข้ารหัส ไม่จัดเก็บรหัสผ่านจริง)</Text>
                </View>
                <Text style={styles.objectiveLabel}>วัตถุประสงค์</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ใช้สำหรับยืนยันตัวตน</Text>
                  <Text style={styles.bulletItem}>• ใช้เข้าสู่ระบบ</Text>
                  <Text style={styles.bulletItem}>• ใช้ติดต่อเกี่ยวกับการใช้งาน</Text>
                </View>
              </View>

              {/* Section 2 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>2</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลทางการศึกษา</Text>
                </View>
                <Text style={styles.subTarget}>เฉพาะนักเรียน</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ชั้นเรียน</Text>
                  <Text style={styles.bulletItem}>• ห้องเรียน</Text>
                  <Text style={styles.bulletItem}>• ภาคเรียน</Text>
                  <Text style={styles.bulletItem}>• ตารางเรียน</Text>
                  <Text style={styles.bulletItem}>• รายวิชา</Text>
                  <Text style={styles.bulletItem}>• ผลการเรียน</Text>
                  <Text style={styles.bulletItem}>• คะแนนสอบ</Text>
                  <Text style={styles.bulletItem}>• คะแนนเก็บ</Text>
                  <Text style={styles.bulletItem}>• ผลการประเมิน</Text>
                  <Text style={styles.bulletItem}>• ประวัติการเข้าเรียน</Text>
                  <Text style={styles.bulletItem}>• การส่งงาน</Text>
                  <Text style={styles.bulletItem}>• การบ้าน</Text>
                  <Text style={styles.bulletItem}>• ใบประกาศนียบัตรที่ได้รับ</Text>
                </View>
                <Text style={styles.objectiveLabel}>วัตถุประสงค์</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• จัดการเรียนการสอน</Text>
                  <Text style={styles.bulletItem}>• ติดตามผลการเรียน</Text>
                  <Text style={styles.bulletItem}>• แสดงผลการเรียนแก่ผู้เกี่ยวข้อง</Text>
                </View>
              </View>

              {/* Section 3 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>3</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลผู้ปกครอง</Text>
                </View>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ชื่อผู้ปกครอง</Text>
                  <Text style={styles.bulletItem}>• ความสัมพันธ์กับนักเรียน</Text>
                  <Text style={styles.bulletItem}>• เบอร์โทรศัพท์</Text>
                  <Text style={styles.bulletItem}>• อีเมล</Text>
                  <Text style={styles.bulletItem}>• ช่องทางติดต่อฉุกเฉิน</Text>
                </View>
                <Text style={styles.objectiveLabel}>วัตถุประสงค์</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ติดต่อกรณีจำเป็น</Text>
                  <Text style={styles.bulletItem}>• แจ้งผลการเรียน</Text>
                  <Text style={styles.bulletItem}>• แจ้งข่าวสารของโรงเรียน</Text>
                </View>
              </View>

              {/* Section 4 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>4</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลการใช้งานระบบ</Text>
                </View>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• วันและเวลาเข้าสู่ระบบ</Text>
                  <Text style={styles.bulletItem}>• ประวัติการใช้งาน</Text>
                  <Text style={styles.bulletItem}>• อุปกรณ์ที่ใช้</Text>
                  <Text style={styles.bulletItem}>• IP Address</Text>
                  <Text style={styles.bulletItem}>• Browser</Text>
                  <Text style={styles.bulletItem}>• ระบบปฏิบัติการ</Text>
                  <Text style={styles.bulletItem}>• Log การเข้าใช้งาน</Text>
                </View>
                <Text style={styles.objectiveLabel}>วัตถุประสงค์</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• รักษาความปลอดภัย</Text>
                  <Text style={styles.bulletItem}>• ตรวจสอบการใช้งาน</Text>
                  <Text style={styles.bulletItem}>• ป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต</Text>
                  <Text style={styles.bulletItem}>• ปรับปรุงประสิทธิภาพของระบบ</Text>
                </View>
              </View>

              {/* Section 5 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>5</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลการเรียนออนไลน์</Text>
                </View>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• วิดีโอที่รับชม</Text>
                  <Text style={styles.bulletItem}>• ระยะเวลาการเรียน</Text>
                  <Text style={styles.bulletItem}>• ความคืบหน้าของบทเรียน</Text>
                  <Text style={styles.bulletItem}>• การทำแบบทดสอบ</Text>
                  <Text style={styles.bulletItem}>• ผลคะแนน Quiz</Text>
                  <Text style={styles.bulletItem}>• การส่ง Assignment</Text>
                  <Text style={styles.bulletItem}>• การเข้าร่วมชั้นเรียนออนไลน์</Text>
                </View>
                <Text style={styles.objectiveLabel}>วัตถุประสงค์</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ติดตามการเรียน</Text>
                  <Text style={styles.bulletItem}>• ประเมินผลการเรียน</Text>
                  <Text style={styles.bulletItem}>• แสดงความคืบหน้าให้ครูและผู้ปกครอง</Text>
                </View>
              </View>

              {/* Section 6 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>6</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลการใช้งาน AI</Text>
                </View>
                <Text style={styles.subTarget}>หากผู้ใช้เลือกใช้บริการ AI</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• คำถามที่ส่งถึง AI</Text>
                  <Text style={styles.bulletItem}>• คำตอบของ AI</Text>
                  <Text style={styles.bulletItem}>• ประวัติการสนทนา</Text>
                  <Text style={styles.bulletItem}>• ผลการวิเคราะห์การเรียน</Text>
                  <Text style={styles.bulletItem}>• คำแนะนำที่ AI สร้างขึ้น</Text>
                </View>
                <Text style={styles.objectiveLabel}>วัตถุประสงค์</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ตอบคำถามทางการศึกษา</Text>
                  <Text style={styles.bulletItem}>• ช่วยอธิบายบทเรียน</Text>
                  <Text style={styles.bulletItem}>• วิเคราะห์ผลการเรียน</Text>
                  <Text style={styles.bulletItem}>• แนะนำแนวทางการพัฒนาการเรียนรู้</Text>
                </View>
                <View style={styles.noteBox}>
                  <Ionicons name="information-circle-outline" size={16} color={colors.primary} />
                  <Text style={styles.noteText}>
                    หมายเหตุ: ข้อมูลจะไม่นำไปใช้เพื่อการโฆษณาหรือจำหน่ายแก่บุคคลภายนอก
                  </Text>
                </View>
              </View>

              {/* Section 7 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>7</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลการแจ้งเตือน</Text>
                </View>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• การแจ้งเตือนการบ้าน</Text>
                  <Text style={styles.bulletItem}>• ข่าวสารโรงเรียน</Text>
                  <Text style={styles.bulletItem}>• ตารางสอบ</Text>
                  <Text style={styles.bulletItem}>• ตารางเรียน</Text>
                  <Text style={styles.bulletItem}>• กิจกรรมของโรงเรียน</Text>
                </View>
                <Text style={styles.objectiveLabel}>วัตถุประสงค์</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• แจ้งข้อมูลสำคัญแก่ผู้ใช้งาน</Text>
                </View>
              </View>

              {/* Section 8 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>8</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลเอกสาร</Text>
                </View>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ไฟล์งาน</Text>
                  <Text style={styles.bulletItem}>• เอกสารประกอบการเรียน</Text>
                  <Text style={styles.bulletItem}>• รายงาน</Text>
                  <Text style={styles.bulletItem}>• รูปภาพที่อัปโหลด</Text>
                  <Text style={styles.bulletItem}>• วิดีโอที่อัปโหลด</Text>
                </View>
                <Text style={styles.objectiveLabel}>วัตถุประสงค์</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ใช้ในการเรียนการสอน</Text>
                  <Text style={styles.bulletItem}>• จัดเก็บผลงานของนักเรียน</Text>
                </View>
              </View>

              {/* Section 9 */}
              <View style={styles.cardSection}>
                <View style={styles.sectionBadgeHeader}>
                  <Text style={styles.badgeNumber}>9</Text>
                  <Text style={styles.sectionTitle}>ข้อมูลที่มีความอ่อนไหว (Sensitive Personal Data)</Text>
                </View>
                <Text style={styles.bodyParagraph}>
                  ระบบจะจัดเก็บข้อมูลประเภทนี้ เฉพาะเมื่อมีความจำเป็นตามกฎหมายหรือได้รับความยินยอมโดยชัดแจ้ง (Explicit Consent) เช่น
                </Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ข้อมูลสุขภาพ (เช่น โรคประจำตัว หรือการแพ้อาหาร)</Text>
                  <Text style={styles.bulletItem}>• ข้อมูลชีวมิติ (เช่น การจดจำใบหน้าเพื่อเช็กชื่อเข้าเรียน หากโรงเรียนเลือกใช้)</Text>
                  <Text style={styles.bulletItem}>• ข้อมูลอื่นที่กฎหมายกำหนดให้เป็นข้อมูลส่วนบุคคลที่มีความอ่อนไหว</Text>
                </View>
                <Text style={styles.bodyParagraph}>
                  ข้อมูลดังกล่าวจะถูกใช้เฉพาะตามวัตถุประสงค์ที่แจ้งไว้ และได้รับการคุ้มครองด้วยมาตรการรักษาความมั่นคงปลอดภัยที่เหมาะสม
                </Text>
              </View>

              {/* Sharing & Protection */}
              <View style={styles.cardSection}>
                <Text style={styles.sectionTitleNoBadge}>การแบ่งปันข้อมูล</Text>
                <Text style={styles.bodyParagraph}>MySchool อาจเปิดเผยข้อมูลให้เฉพาะ</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• โรงเรียนต้นสังกัด</Text>
                  <Text style={styles.bulletItem}>• ครูผู้สอน</Text>
                  <Text style={styles.bulletItem}>• ผู้ปกครองของนักเรียน</Text>
                  <Text style={styles.bulletItem}>• หน่วยงานของรัฐที่มีอำนาจตามกฎหมาย</Text>
                  <Text style={styles.bulletItem}>• ผู้ให้บริการ Cloud และผู้ประมวลผลข้อมูลที่ได้รับการแต่งตั้งตามสัญญา</Text>
                </View>
                <Text style={styles.bodyParagraph}>
                  โดยจะไม่เปิดเผยหรือจำหน่ายข้อมูลส่วนบุคคลแก่บุคคลภายนอกเพื่อการโฆษณาหรือการตลาดโดยไม่ได้รับความยินยอมจากเจ้าของข้อมูล
                </Text>
              </View>

              {/* Retention */}
              <View style={styles.cardSection}>
                <Text style={styles.sectionTitleNoBadge}>ระยะเวลาการเก็บรักษาข้อมูล</Text>
                <Text style={styles.bodyParagraph}>
                  ข้อมูลส่วนบุคคลจะถูกเก็บรักษาเท่าที่จำเป็นต่อการให้บริการ ตามระยะเวลาที่กฎหมายหรือระเบียบของสถานศึกษากำหนด เมื่อพ้นระยะเวลาดังกล่าว ข้อมูลจะถูกลบ ทำลาย หรือทำให้ไม่สามารถระบุตัวตนได้อย่างปลอดภัย
                </Text>
              </View>

              {/* Rights */}
              <View style={styles.cardSection}>
                <Text style={styles.sectionTitleNoBadge}>สิทธิของเจ้าของข้อมูล</Text>
                <Text style={styles.bodyParagraph}>เจ้าของข้อมูลสามารถใช้สิทธิตาม PDPA ได้แก่</Text>
                <View style={styles.bulletList}>
                  <Text style={styles.bulletItem}>• ขอเข้าถึงข้อมูลส่วนบุคคล</Text>
                  <Text style={styles.bulletItem}>• ขอรับสำเนาข้อมูล</Text>
                  <Text style={styles.bulletItem}>• ขอแก้ไขข้อมูลให้ถูกต้อง</Text>
                  <Text style={styles.bulletItem}>• ขอให้ลบหรือทำลายข้อมูลเมื่อเข้าเงื่อนไขตามกฎหมาย</Text>
                  <Text style={styles.bulletItem}>• ขอจำกัดการประมวลผลข้อมูล</Text>
                  <Text style={styles.bulletItem}>• ถอนความยินยอม (สำหรับกรณีที่อาศัยฐานความยินยอม)</Text>
                  <Text style={styles.bulletItem}>• ร้องเรียนต่อสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.)</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.divider} />

            {/* Bottom Consent Action Area */}
            <View style={styles.footerContainer}>
              <TouchableOpacity
                style={styles.checkboxRow}
                activeOpacity={0.8}
                onPress={() => setIsChecked((prev) => !prev)}
              >
                <Ionicons
                  name={isChecked ? 'checkbox' : 'square-outline'}
                  size={24}
                  color={isChecked ? colors.primary : colors.textMuted}
                  style={styles.checkboxIcon}
                />
                <Text style={styles.checkboxText}>
                  ข้าพเจ้ายินยอมให้ MySchool เก็บรวบรวม ใช้ และเปิดเผยข้อมูลส่วนบุคคลของข้าพเจ้าตามนโยบายความเป็นส่วนตัว (Privacy Notice) และพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.continueBtn,
                  isChecked ? styles.continueBtnActive : styles.continueBtnDisabled,
                ]}
                activeOpacity={isChecked ? 0.85 : 1.0}
                disabled={!isChecked}
                onPress={handleAccept}
              >
                <Text
                  style={[
                    styles.continueBtnText,
                    isChecked ? styles.continueBtnTextActive : styles.continueBtnTextDisabled,
                  ]}
                >
                  ดำเนินการต่อ
                </Text>
                <Ionicons
                  name="arrow-forward"
                  size={18}
                  color={isChecked ? colors.white : colors.textFaint}
                />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  safeArea: {
    width: '100%',
    maxHeight: '92%',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: 'hidden',
    ...shadow.card,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
  },
  headerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.text,
  },
  headerSubtitle: {
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
  },
  scrollArea: {
    maxHeight: 380,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: 18,
  },
  sectionMainTitle: {
    fontFamily: fonts.bold,
    fontSize: 16,
    color: colors.primary,
    marginBottom: 8,
  },
  introText: {
    fontFamily: fonts.regular,
    fontSize: 13.5,
    color: colors.text,
    lineHeight: 20,
    marginBottom: 16,
  },
  cardSection: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionBadgeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  badgeNumber: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 22,
    marginRight: 8,
  },
  sectionTitle: {
    fontFamily: fonts.semiBold,
    fontSize: 14.5,
    color: colors.text,
    flex: 1,
  },
  sectionTitleNoBadge: {
    fontFamily: fonts.bold,
    fontSize: 14.5,
    color: colors.primaryDark,
    marginBottom: 6,
  },
  subTarget: {
    fontFamily: fonts.medium,
    fontSize: 12.5,
    color: colors.textMuted,
    marginBottom: 6,
    fontStyle: 'italic',
  },
  bulletList: {
    marginVertical: 4,
    paddingLeft: 4,
  },
  bulletItem: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
    marginBottom: 3,
  },
  objectiveLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 13,
    color: colors.primaryDark,
    marginTop: 8,
    marginBottom: 2,
  },
  noteBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    borderRadius: radius.sm,
    padding: 8,
    marginTop: 8,
    gap: 6,
  },
  noteText: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.primaryDark,
    flex: 1,
  },
  bodyParagraph: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
    marginBottom: 6,
  },
  footerContainer: {
    padding: 16,
    backgroundColor: colors.surface,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  checkboxIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  checkboxText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 12.5,
    color: colors.text,
    lineHeight: 18,
  },
  continueBtn: {
    height: 48,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  continueBtnActive: {
    backgroundColor: colors.primary,
  },
  continueBtnDisabled: {
    backgroundColor: '#EAEAEA',
  },
  continueBtnText: {
    fontFamily: fonts.semiBold,
    fontSize: 15,
  },
  continueBtnTextActive: {
    color: colors.white,
  },
  continueBtnTextDisabled: {
    color: colors.textFaint,
  },
});
