import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

import HomeScreen from '../screens/student/HomeScreen';
import ClassesScreen from '../screens/student/ClassesScreen';
import TutorScreen from '../screens/student/TutorScreen';
import GradesScreen from '../screens/student/GradesScreen';
import ProfileScreen from '../screens/student/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function StudentTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarLabelStyle: { fontFamily: fonts.medium, fontSize: 11 },
        // Increase height so the floating centre button has space
        tabBarStyle: { borderTopColor: colors.border, height: 72, paddingTop: 6, paddingBottom: 10 },
        animation: 'shift',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'หน้าหลัก',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Classes"
        component={ClassesScreen}
        options={{
          title: 'วิชาเรียน',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'book' : 'book-outline'} size={22} color={color} />
          ),
        }}
      />

      {/* ── Center AI Tutor Tab – floating icon above the bar ── */}
      <Tab.Screen
        name="AiTutor"
        component={TutorScreen}
        options={{
          title: 'AI Tutor',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.centerTab, focused && styles.centerTabActive]}>
              <Ionicons name="sparkles" size={24} color={colors.white} />
            </View>
          ),
          // Render a custom label under the floating circle
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.tabLabel, focused && { color: colors.primary }]}>AI Tutor</Text>
          ),
        }}
      />

      <Tab.Screen
        name="Grades"
        component={GradesScreen}
        options={{
          title: 'คะแนน',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'school' : 'school-outline'} size={22} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'โปรไฟล์',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={22} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  // Floating centre button
  centerTab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    // Pull the circle up out of the tab bar
    marginBottom: 30,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 10,
  },
  centerTabActive: {
    backgroundColor: colors.primaryDark,
    transform: [{ scale: 1.07 }],
  },
  // Label that appears under the floating icon
  tabLabel: {
    fontFamily: fonts.semiBold,
    fontSize: 11,
    color: colors.textFaint,
    textAlign: 'center',
    marginTop: 6,
  },
});
