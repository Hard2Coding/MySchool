import React from 'react';
import ProfileBase from '../../components/ProfileBase';
import { ADMIN } from '../../data/mockData';
import adminPhoto from '../../../assets/avatars/admin.png';

export default function AdminProfileScreen({ navigation }) {
  return (
    <ProfileBase
      name={ADMIN.name}
      roleLabel="ผู้ดูแลระบบ"
      imageSource={adminPhoto}
      meta={[
        { label: 'หน่วยงาน', value: ADMIN.department },
        { label: 'ระดับสิทธิ์', value: 'Super Admin' },
      ]}
      menu={[
        {
          icon: 'megaphone-outline',
          label: 'ส่งประกาศทั้งโรงเรียน',
          onPress: () => navigation.navigate('BroadcastAnnouncement'),
        },
        {
          icon: 'key-outline',
          label: 'รีเซ็ตรหัสผ่านผู้ใช้งาน',
          onPress: () => navigation.navigate('AdminResetPassword'),
        },
        {
          icon: 'settings-outline',
          label: 'ตั้งค่าระบบ',
          onPress: () => navigation.navigate('SystemSettings'),
        },
        {
          icon: 'create-outline',
          label: 'แก้ไขข้อมูลส่วนตัว',
          onPress: () => navigation.navigate('EditProfile', { name: ADMIN.name, photoSource: adminPhoto }),
        },
        {
          icon: 'key-outline',
          label: 'เปลี่ยนรหัสผ่านของฉัน',
          onPress: () => navigation.navigate('ChangePassword'),
        },
      ]}
    />
  );
}
