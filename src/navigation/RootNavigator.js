import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import PdpaConsentModal from '../components/PdpaConsentModal';

import LoginScreen from '../screens/LoginScreen';
import RoleSelectScreen from '../screens/RoleSelectScreen';

// shared (reused across roles)
import ChatScreen from '../screens/shared/ChatScreen';
import EditProfileScreen from '../screens/shared/EditProfileScreen';
import ChangePasswordScreen from '../screens/shared/ChangePasswordScreen';
import RequestScreen from '../screens/shared/RequestScreen';

import StudentTabs from './StudentTabs';
import ClassDetailScreen from '../screens/student/ClassDetailScreen';
import AIAssistantScreen from '../screens/student/AIAssistantScreen';
import StudentCardScreen from '../screens/student/StudentCardScreen';
import MySkillScreen from '../screens/student/MySkillScreen';
import WellnessScreen from '../screens/student/WellnessScreen';

import TeacherTabs from './TeacherTabs';
import AIQuizScreen from '../screens/teacher/AIQuizScreen';
import TeacherClassDetailScreen from '../screens/teacher/ClassDetailScreen';
import CreateAnnouncementScreen from '../screens/teacher/CreateAnnouncementScreen';
import TeacherAttendanceScreen from '../screens/teacher/AttendanceScreen';
import RecordScoresScreen from '../screens/teacher/RecordScoresScreen';
import TeacherInboxScreen from '../screens/teacher/InboxScreen';
import AdvisoryScreen from '../screens/teacher/AdvisoryScreen';
import TeacherAIAssistantScreen from '../screens/teacher/TeacherAIAssistantScreen';
import HealthWarningScreen from '../screens/teacher/HealthWarningScreen';
import AdjustBehaviorScoreScreen from '../screens/teacher/AdjustBehaviorScoreScreen';

import ParentTabs from './ParentTabs';
import AttendanceScreen from '../screens/parent/AttendanceScreen';
import ParentGradesScreen from '../screens/parent/GradesScreen';
import ParentHomeworkScreen from '../screens/parent/HomeworkScreen';
import ParentPaymentScreen from '../screens/parent/PaymentScreen';
import AIFamilyAdvisorScreen from '../screens/parent/AIFamilyAdvisorScreen';
import ChildWellnessScreen from '../screens/parent/ChildWellnessScreen';

import AdminTabs from './AdminTabs';
import ManageUsersScreen from '../screens/admin/ManageUsersScreen';
import UserDetailScreen from '../screens/admin/UserDetailScreen';
import AcademicTermsScreen from '../screens/admin/AcademicTermsScreen';
import RoomsSubjectsScreen from '../screens/admin/RoomsSubjectsScreen';
import PermissionsScreen from '../screens/admin/PermissionsScreen';
import GPSSettingsScreen from '../screens/admin/GPSSettingsScreen';
import AuditLogScreen from '../screens/admin/AuditLogScreen';
import BroadcastAnnouncementScreen from '../screens/admin/BroadcastAnnouncementScreen';
import AdminResetPasswordScreen from '../screens/admin/AdminResetPasswordScreen';
import SystemSettingsScreen from '../screens/admin/SystemSettingsScreen';

const Stack = createNativeStackNavigator();

// Default: smooth native slide-from-right push (explicit so it's identical
// on iOS + Android, and so the 300ms native-driven timing feels consistent).
const screenOpts = { headerShown: false, animation: 'slide_from_right' };

// Quick single-purpose forms/tools opened from a button feel more natural
// sliding up like a sheet, and closing the same way on save/cancel.
const modalOpts = { headerShown: false, presentation: 'modal', animation: 'slide_from_bottom' };

function StudentStack() {
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen name="StudentTabs" component={StudentTabs} />
      <Stack.Screen name="ClassDetail" component={ClassDetailScreen} />
      <Stack.Screen name="AIAssistant" component={AIAssistantScreen} />
      <Stack.Screen name="StudentCard" component={StudentCardScreen} options={modalOpts} />
      <Stack.Screen name="MySkill" component={MySkillScreen} />
      <Stack.Screen name="Wellness" component={WellnessScreen} />
      <Stack.Screen name="SharedChat" component={ChatScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={modalOpts} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={modalOpts} />
      <Stack.Screen name="Request" component={RequestScreen} options={modalOpts} />
    </Stack.Navigator>
  );
}

function TeacherStack() {
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen name="TeacherTabs" component={TeacherTabs} />
      <Stack.Screen name="AIQuiz" component={AIQuizScreen} />
      <Stack.Screen name="TeacherClassDetail" component={TeacherClassDetailScreen} />
      <Stack.Screen name="CreateAnnouncement" component={CreateAnnouncementScreen} options={modalOpts} />
      <Stack.Screen name="TeacherAttendance" component={TeacherAttendanceScreen} options={modalOpts} />
      <Stack.Screen name="RecordScores" component={RecordScoresScreen} options={modalOpts} />
      <Stack.Screen name="TeacherInbox" component={TeacherInboxScreen} />
      <Stack.Screen name="Advisory" component={AdvisoryScreen} />
      <Stack.Screen name="TeacherAI" component={TeacherAIAssistantScreen} />
      <Stack.Screen name="HealthWarning" component={HealthWarningScreen} />
      <Stack.Screen name="AdjustBehaviorScore" component={AdjustBehaviorScoreScreen} options={modalOpts} />
      <Stack.Screen name="SharedChat" component={ChatScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={modalOpts} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={modalOpts} />
    </Stack.Navigator>
  );
}

function ParentStack() {
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen name="ParentTabs" component={ParentTabs} />
      <Stack.Screen name="Attendance" component={AttendanceScreen} />
      <Stack.Screen name="ParentGrades" component={ParentGradesScreen} />
      <Stack.Screen name="ParentHomework" component={ParentHomeworkScreen} />
      <Stack.Screen name="ParentPayment" component={ParentPaymentScreen} />
      <Stack.Screen name="AIFamilyAdvisor" component={AIFamilyAdvisorScreen} />
      <Stack.Screen name="ChildWellness" component={ChildWellnessScreen} />
      <Stack.Screen name="SharedChat" component={ChatScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={modalOpts} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={modalOpts} />
      <Stack.Screen name="Request" component={RequestScreen} options={modalOpts} />
    </Stack.Navigator>
  );
}

function AdminStack() {
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen name="AdminTabs" component={AdminTabs} />
      <Stack.Screen name="ManageUsers" component={ManageUsersScreen} />
      <Stack.Screen name="AdminUserDetail" component={UserDetailScreen} />
      <Stack.Screen name="AcademicTerms" component={AcademicTermsScreen} />
      <Stack.Screen name="RoomsSubjects" component={RoomsSubjectsScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="GPSSettings" component={GPSSettingsScreen} options={modalOpts} />
      <Stack.Screen name="AuditLog" component={AuditLogScreen} />
      <Stack.Screen name="BroadcastAnnouncement" component={BroadcastAnnouncementScreen} options={modalOpts} />
      <Stack.Screen name="AdminResetPassword" component={AdminResetPasswordScreen} />
      <Stack.Screen name="SystemSettings" component={SystemSettingsScreen} options={modalOpts} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options={modalOpts} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={modalOpts} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, activeRole, hasAcceptedPdpa, acceptPdpa } = useAuth();

  let content;
  if (!user) {
    content = <LoginScreen />;
  } else if (!activeRole) {
    content = <RoleSelectScreen />;
  } else if (activeRole === 'student') {
    content = <StudentStack />;
  } else if (activeRole === 'teacher') {
    content = <TeacherStack />;
  } else if (activeRole === 'parent') {
    content = <ParentStack />;
  } else if (activeRole === 'admin') {
    content = <AdminStack />;
  } else {
    content = <LoginScreen />;
  }

  return (
    <NavigationContainer>
      {content}
      {user ? (
        <PdpaConsentModal
          visible={!hasAcceptedPdpa}
          onAccept={acceptPdpa}
        />
      ) : null}
    </NavigationContainer>
  );
}
