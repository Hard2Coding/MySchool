import React from 'react';
import ProfileBase from '../../components/ProfileBase';
import { PARENT, STUDENT, TEACHER } from '../../data/mockData';
import parentPhoto from '../../../assets/avatars/parent.png';

export default function ParentProfileScreen({ navigation }) {
  return (
    <ProfileBase
      name={PARENT.name}
      roleLabel="ผู้ปกครอง"
      imageSource={parentPhoto}
      meta={[
        { label: 'ความสัมพันธ์กับนักเรียน', value: PARENT.relation },
        { label: 'บุตรหลาน', value: `${STUDENT.name} (${STUDENT.room})` },
      ]}
      menu={[
        {
          icon: 'chatbubble-ellipses-outline',
          label: 'ติดต่อครูที่ปรึกษา',
          onPress: () =>
            navigation.navigate('SharedChat', {
              personaName: TEACHER.name,
              personaSubtitle: `ครูที่ปรึกษา ${STUDENT.room}`,
              systemPrompt: `คุณคือครูที่ปรึกษาชื่อ ${TEACHER.name} กำลังแชทคุยกับผู้ปกครองของนักเรียนชื่อ ${STUDENT.firstName} ทางแอปโรงเรียน ตอบอย่างสุภาพ เป็นทางการพอประมาณ เป็นภาษาไทย`,
              starterText: `สวัสดีค่ะ ผู้ปกครองของ${STUDENT.firstName} มีอะไรให้ช่วยไหมคะ?`,
            }),
        },
        {
          icon: 'document-text-outline',
          label: 'ยื่นคำร้อง / ขอเอกสาร',
          onPress: () => navigation.navigate('Request', { asParent: true }),
        },
        {
          icon: 'card-outline',
          label: 'ชำระค่าเทอม / ค่าธรรมเนียม',
          onPress: () => navigation.navigate('ParentPayment'),
        },
        {
          icon: 'create-outline',
          label: 'แก้ไขข้อมูลส่วนตัว',
          onPress: () => navigation.navigate('EditProfile', { name: PARENT.name, photoSource: parentPhoto }),
        },
      ]}
    />
  );
}
