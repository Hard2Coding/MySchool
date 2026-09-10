# 🏫 MySchool — Next-Gen School Portal & AI Assistant

> **Comprehensive Student Information System & AI Assistant**  
> Built with **React Native (Expo SDK 54)** to seamlessly connect 4 key roles: **Students**, **Parents**, **Teachers**, and **School Administrators (Admin)**. Features realistic Mock Data simulation and **Google Gemini AI API** integration.

---

## 📌 Project Overview

**MySchool** is designed to elevate modern education and holistic student well-being based on 4 core pillars:

1. **MySkill (Personalized Learning Path)** — Analyzes individual strengths and weaknesses to provide personalized learning recommendations and career pathway exploration.
2. **AI Teacher Copilot & Early Warning** — Equips teachers with rapid attendance taking, grade recording, AI quiz generation, and student risk alerts (Health Warning).
3. **AI Family Advisor & Parent Portal** — Empowers parents to monitor attendance, track academic progress, review homework/tuition fees, and receive tailored parenting insights.
4. **Mental Wellness & Daily Check-in** — Daily student mood & stress check-ins with early warning triggers and privacy-first parental sharing controls (PDPA compliant).

---

## 🔑 Demo Login Credentials

The application includes built-in mock accounts ready for immediate testing:

| Role | Username | Password | Account Details & Permissions |
|---|---|---|---|
| **Student** | `12345` | `123` | Somying Jaidee (Grade 11/2) — Class Schedule, Grades, MySkill, AI Tutor, Digital Student Card |
| **Parent** | `12345` | `123` | Somchai Jaidee — Parent of Somying (Select Parent role at login) |
| **Teacher** | `teacher` | `123` | Somsak Sodsai — Teaching Schedule, Attendance, Gradebook, Health Warning, AI Quiz Generator |
| **Admin** | `admin` | `123` | ICT & Academic Affairs — School Analytics Dashboard, User Management, Audit Logs, System Settings |

> 💡 **Multi-Role Switching:** The `12345` account is linked to both Student and Parent roles. You can choose your role after logging in or instantly switch roles anytime from the **Profile** screen.

---

## 🚀 Installation & Getting Started

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (LTS version recommended, Node 18 or newer)
* **Expo Go** mobile app installed on your device ([iOS App Store](https://apps.apple.com/app/expo-go/id982107779) or [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent))

### 2. Install Dependencies
Open your terminal in the project root directory and run:
```bash
npm install
```

### 3. Configure Gemini AI API Key
1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Create your `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and add your API key:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY="AIzaSy...your-actual-api-key"
   ```

### 4. Start the Application
```bash
npx expo start
```
* **iOS Simulator:** Press `i` in the terminal
* **Android Emulator:** Press `a` in the terminal
* **Web Browser:** Press `w` in the terminal
* **Physical Device:** Open **Expo Go** on your phone and scan the QR code displayed in the terminal (ensure your phone and computer are on the same Wi-Fi network).
  * *If network discovery fails, use Tunnel mode:* `npx expo start --tunnel`

---

## ⚙️ System Architecture & Workflow

```
                       ┌─────────────────────────────────┐
                       │          App.js (Root)          │
                       │  • Custom Fonts (Kanit)         │
                       │  • AuthProvider (Context)       │
                       └────────────────┬────────────────┘
                                        │
                       ┌────────────────▼────────────────┐
                       │      RootNavigator (Stack)      │
                       │  • Login / Role Selection       │
                       │  • Dynamic Role Tab Routing     │
                       │  • Modal & Slide Transitions    │
                       └────────────────┬────────────────┘
                                        │
       ┌──────────────────┬──────────────┴─────┬──────────────────┐
       │                  │                    │                  │
 ┌─────▼──────┐    ┌──────▼─────┐       ┌──────▼─────┐     ┌──────▼─────┐
 │  Student   │    │   Parent   │       │  Teacher   │     │   Admin    │
 │    Tabs    │    │    Tabs    │       │    Tabs    │     │    Tabs    │
 └─────┬──────┘    └──────┬─────┘       └──────┬─────┘     └──────┬─────┘
       │                  │                    │                  │
       └──────────────────┴──────────────┬─────┴──────────────────┘
                                        │
          ┌──────────────────────────────┼──────────────────────────────┐
          │                              │                              │
 ┌────────▼──────────┐         ┌─────────▼─────────┐          ┌─────────▼─────────┐
 │   Mock Database   │         │   AI Integration  │          │   Design System   │
 │ (src/data/mock.js)│         │ (Gemini API Call) │          │(colors/typography)│
 └───────────────────┘         └───────────────────┘          └───────────────────┘
```

### 1. State & Authentication Management
* Managed via **React Context API** (`src/context/AuthContext.js`).
* Supports **Multi-Role Switching**: Seamlessly switch between active roles without logging out.

### 2. Navigation Flow
* Controlled by `src/navigation/RootNavigator.js`.
* Each role features an independent Bottom Tab Navigator:
  * **StudentTabs:** Home, Classes, Grades, Profile
  * **ParentTabs:** Dashboard, Attendance, Child Wellness, Profile
  * **TeacherTabs:** Dashboard, Classes & Teaching, Inbox/Announcements, Profile
  * **AdminTabs:** Analytics Dashboard, System Management & Users, Profile
* Modals, forms, and detail views are presented with smooth native slide/fade transitions.

### 3. Google Gemini AI Integration
* Lightweight HTTP client in `src/services/gemini.js` invoking Google Gemini endpoints.
* **AI Student Tutor & Assistant:** Context-aware subject study helper with pre-built quick prompts.
* **AI Family Advisor:** Provides actionable parenting advice based on student academic trends.
* **AI Teacher Copilot & Quiz Generator:** Generates structured multiple-choice quiz questions and teaching recommendations.

---

## ✨ Features by User Role

### 👨‍🎓 1. Student Portal
* **Digital Student ID:** Fullscreen interactive ID card with scannable QR Code and Barcode.
* **MySkill (Personalized Learning Path):** Diagnostic skill assessment, course recommendations, and offline course simulation.
* **AI Learning Assistant & Tutor:** Interactive chat per subject with predefined question prompts.
* **Mental Wellness Daily Check-in:** Daily mood and stress tracking with optional parent sharing settings.
* **Grades & Academic Transcript:** GPA tracking, semester grade breakdowns, and credit summaries.
* **Class Schedule & Course Details:** Daily timetable, room numbers, teacher info, and syllabus.
* **Online Leave Request:** Submit sick/personal leave requests and track approval statuses in real-time.

### 👨‍👩‍👧 2. Parent Portal
* **Child Academic Overview:** Track real-time attendance percentage, exam grades, and pending homework assignments.
* **Child Wellness Monitor:** View wellness check-in summaries shared by the student with personalized parenting guidance.
* **Online Tuition & Fee Payment:** Review fee breakdowns, payment receipts, and payment status history.
* **Teacher Advisory Chat:** Direct messaging channel with the homeroom teacher.

### 👩‍🏫 3. Teacher Portal
* **Attendance Management:** Fast roll-call interface (Present, Late, Absent, Leave) with instant summary stats.
* **Gradebook & Score Recording:** Record mid-term, final, and assignment scores per subject and student.
* **Health Warning & Risk Alert System:** Automated flags for academic drop-offs, high absenteeism, or chronic stress.
* **AI Quiz Generator:** Prompt-based automated quiz question generator.
* **Announcements & Inbox:** Send broadcast class announcements and communicate directly with parents and students.
* **Behavior Score Adjustment:** Award merits and log demerit infractions with reasons.

### 🛠️ 4. Administrator Portal
* **School Analytics Dashboard:** High-level metrics for student enrollment, teacher headcounts, overall attendance, and GPA trends.
* **User & Permissions Management:** Search users, create/edit accounts, reset passwords, and manage role permissions.
* **System Settings & Audit Log:** Comprehensive system audit logs and GPS geofence configuration for campus check-ins.
* **Broadcast Announcements:** School-wide urgent notices and bulletin broadcasts.

---

## 📁 Project Directory Structure

```
CopyEstudy/
├── App.js                     # Root Entry Point (Font Loading & AuthProvider)
├── app.json                   # Expo Application Configuration
├── .env.example               # Template for Environment Variables
├── .gitignore                 # Git ignore rules
├── assets/                    # Static Assets (Images, Icons, Avatars)
│   └── avatars/               # Default profile avatars (student, teacher, parent, admin)
└── src/
    ├── components/            # Reusable UI Components (Card, Button, Avatar, Chip, etc.)
    ├── context/               # React Contexts (AuthContext & Role State)
    ├── data/                  # Mock Dataset (mockData.js)
    ├── navigation/            # Navigation Containers (RootNavigator, Role Tabs)
    ├── screens/               # Screen Views grouped by user role
    │   ├── student/           # Student Screens (HomeScreen, MySkill, Wellness, StudentCard, etc.)
    │   ├── teacher/           # Teacher Screens (HealthWarning, AIQuiz, Attendance, RecordScores, etc.)
    │   ├── parent/            # Parent Screens (ChildWellness, Payment, Attendance, Homework, etc.)
    │   ├── admin/             # Admin Screens (Dashboard, Users, AuditLog, GPSSettings, etc.)
    │   └── shared/            # Common Screens (EditProfile, ChangePassword, SharedChat)
    ├── services/              # External Integrations (gemini.js)
    └── theme/                 # Design System Tokens (colors, radius, typography)
```

---

## 🎨 Customization Guide

* **Update Mock Data:** Edit `src/data/mockData.js` to modify sample students, courses, grades, announcements, or notifications.
* **Change Profile Avatars:** Replace image files in `assets/avatars/` maintaining their filenames (`student.png`, `teacher.png`, `parent.png`, `admin.png`).
* **Modify Theme Colors & Typography:** Adjust design tokens in `src/theme/colors.js` and `src/theme/typography.js`.

---

## 📄 License

This project is licensed under the **[MIT License](LICENSE)**.  
Copyright (c) 2026 **Thanakorn Morasilp** & **Butter C.U.P Team Members**.
