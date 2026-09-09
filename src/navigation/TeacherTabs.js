import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

import DashboardScreen from '../screens/teacher/DashboardScreen';
import ClassesScreen from '../screens/teacher/ClassesScreen';
import ProfileScreen from '../screens/teacher/ProfileScreen';

const Tab = createBottomTabNavigator();

const ICONS = { Dashboard: 'grid', Classes: 'people', Profile: 'person' };

export default function TeacherTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        tabBarStyle: { borderTopColor: colors.border, height: 62, paddingTop: 6, paddingBottom: 8 },
        animation: 'shift',
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons name={`${ICONS[route.name]}${focused ? '' : '-outline'}`} size={size - 2} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'หน้าหลัก' }} />
      <Tab.Screen name="Classes" component={ClassesScreen} options={{ title: 'รายวิชา' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'โปรไฟล์' }} />
    </Tab.Navigator>
  );
}
