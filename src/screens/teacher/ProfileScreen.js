import React from 'react';
import ProfileBase from '../../components/ProfileBase';
import { TEACHER } from '../../data/mockData';
import teacherPhoto from '../../../assets/avatars/teacher.png';

export default function TeacherProfileScreen({ navigation }) {
  return (
    <ProfileBase
      name={TEACHER.name}
      roleLabel="ครูผู้สอน"
      imageSource={teacherPhoto}
      meta={[
        { label: 'กลุ่มสาระการเรียนรู้', value: TEACHER.subjectGroup },
        { label: 'ครูที่ปรึกษา', value: TEACHER.isAdvisor ? `ใช่ (${TEACHER.advisorRoom})` : 'ไม่ใช่' },
      ]}
      menu={[
        {
          icon: 'people-outline',
          label: 'นักเรียนในความดูแล (ครูที่ปรึกษา)',
          onPress: () => navigation.navigate('Advisory'),
        },
        {
          icon: 'megaphone-outline',
          label: 'ส่งประกาศถึงนักเรียน',
          onPress: () => navigation.navigate('CreateAnnouncement'),
        },
        {
          icon: 'chatbubble-ellipses-outline',
          label: 'ข้อความจากนักเรียน/ผู้ปกครอง',
          onPress: () => navigation.navigate('TeacherInbox'),
        },
        {
          icon: 'create-outline',
          label: 'แก้ไขข้อมูลส่วนตัว',
          onPress: () => navigation.navigate('EditProfile', { name: TEACHER.name, photoSource: teacherPhoto }),
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
