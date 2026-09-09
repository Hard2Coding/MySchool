import React from 'react';
import ProfileBase from '../../components/ProfileBase';
import { STUDENT, TEACHER } from '../../data/mockData';
import studentPhoto from '../../../assets/avatars/student.png';

export default function StudentProfileScreen({ navigation }) {
  return (
    <ProfileBase
      name={STUDENT.name}
      roleLabel="นักเรียน"
      imageSource={studentPhoto}
      meta={[
        { label: 'รหัสนักเรียน', value: STUDENT.id },
        { label: 'ระดับชั้น / ห้อง', value: STUDENT.room },
        { label: 'ครูที่ปรึกษา', value: STUDENT.advisor },
        { label: 'อัตราการเข้าเรียน', value: `${STUDENT.attendanceRate}%` },
      ]}
      menu={[
        {
          icon: 'accessibility-outline',
          label: 'MySkill · ดูจุดแข็ง จุดอ่อน และวางแผนการเรียน',
          onPress: () => navigation.navigate('MySkill'),
        },
        {
          icon: 'document-text-outline',
          label: 'ยื่นคำร้องออนไลน์ (ลาป่วย / ลากิจ)',
          onPress: () => navigation.navigate('Request'),
        },
        {
          icon: 'chatbubble-ellipses-outline',
          label: 'ส่งข้อความหาครูที่ปรึกษา',
          onPress: () =>
            navigation.navigate('SharedChat', {
              personaName: TEACHER.name,
              personaSubtitle: `ครูที่ปรึกษา ${STUDENT.room}`,
              systemPrompt: `คุณคือครูที่ปรึกษาชื่อ ${TEACHER.name} กำลังแชทคุยกับนักเรียนชื่อ ${STUDENT.firstName} ทางแอปโรงเรียน ตอบเป็นกันเอง ให้คำแนะนำแบบครูที่ปรึกษาที่ดี ตอบสั้นกระชับเป็นภาษาไทย`,
              starterText: `สวัสดีจ้ะ${STUDENT.firstName} มีอะไรให้ครูช่วยไหมคะ?`,
            }),
        },
        {
          icon: 'create-outline',
          label: 'แก้ไขข้อมูลส่วนตัว',
          onPress: () => navigation.navigate('EditProfile', { name: STUDENT.name, photoSource: studentPhoto }),
        },
        {
          icon: 'key-outline',
          label: 'เปลี่ยนรหัสผ่าน',
          onPress: () => navigation.navigate('ChangePassword'),
        },
      ]}
    />
  );
}
