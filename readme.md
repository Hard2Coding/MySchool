# 🏫 MySchool — Next-Gen School Portal & AI Assistant

> **ระบบพอร์ทัลโรงเรียนและผู้ช่วยอัจฉริยะแบบครบวงจร (Student Information System & AI Assistant)**  
> พัฒนาด้วย **React Native (Expo SDK 54)** เพื่อเชื่อมโยง 4 บทบาทสำคัญ: **นักเรียน**, **ผู้ปกครอง**, **ครูผู้สอน**, และ **ผู้ดูแลระบบ (Admin)** พร้อมระบบจำลองข้อมูล (Mock Data) และการเชื่อมต่อ AI (Google Gemini API)

---

## 📌 ภาพรวมของแอปพลิเคชัน (About The App)

**MySchool** ถูกออกแบบมาเพื่อยกระดับการศึกษาและการดูแลผู้เรียนอย่างรอบด้าน ภายใต้แนวคิด 4 เสาหลัก:
1. **MySkill (Personalized Learning Path)** — ช่วยนักเรียนวิเคราะห์จุดแข็ง-จุดอ่อน และจัดแผนการเรียนรู้เฉพาะบุคคล
2. **AI Teacher Copilot** — เครื่องมือช่วยครูผู้สอน เช็กชื่อ, บันทึกคะแนน, สร้างแบบทดสอบ และระบบ Health Warning แจ้งเตือนนักเรียนที่ควรติดตาม
3. **AI Family Advisor** — ช่วยให้ผู้ปกครองติดตามผลการเรียน การเข้าเรียน การบ้าน ค่าเทอม และเข้าใจพฤติกรรมของบุตรหลาน
4. **Mental Wellness & Early Warning** — ระบบเช็กอินสุขภาพใจรายวัน (Daily Check-in) คัดกรองสัญญาณเตือนเพื่อดูแลสุขภาพจิตและกายของนักเรียนตั้งแต่เนิ่นๆ โดยยึดหลักความเป็นส่วนตัว (PDPA)

---

## 🔑 บัญชีทดลองใช้งานสำหรับเข้าสู่ระบบ (Demo Login Credentials)

ระบบมีข้อมูล Mock Account พร้อมให้ทดสอบเข้าใช้งานได้ทันที:

| บทบาท (Role) | รหัสผู้ใช้ (Username) | รหัสผ่าน (Password) | รายละเอียด / สิทธิ์การใช้งาน |
|---|---|---|---|
| **นักเรียน (Student)** | `12345` | `123` | สมหญิง ใจดี (ม.5/2) — ตารางเรียน, คะแนน, MySkill, แชท AI, บัตรนักเรียนดิจิทัล |
| **ผู้ปกครอง (Parent)** | `12345` | `123` | คุณสมชาย ใจดี — ผปค. ของสมหญิง (เลือกเข้าสู่ระบบในบทบาทผู้ปกครอง) |
| **ครูผู้สอน (Teacher)** | `teacher` | `123` | ครูสมศักดิ์ สดใส — ตารางสอน, เช็กชื่อ, บันทึกคะแนน, Health Warning, AI สร้างข้อสอบ |
| **ผู้ดูแลระบบ (Admin)** | `admin` | `123` | ฝ่าย ICT — Dashboard สถิติโรงเรียน, จัดการบัญชี, ตั้งค่าระบบ และ Audit Log |

> 💡 **หมายเหตุ:** บัญชี `12345` สามารถเข้าได้ทั้งในฐานะนักเรียนและผู้ปกครอง โดยระบบจะแสดงหน้าจอเลือกบทบาทหลังจากล็อกอิน และสามารถกด **"สลับบทบาทผู้ใช้งาน"** ได้ตลอดเวลาในหน้าโปรไฟล์

---

## 🚀 วิธีติดตั้งและเริ่มต้นใช้งาน (Installation & Setup)

### 1. ความต้องการเบื้องต้น (Prerequisites)
* ติดตั้ง [Node.js](https://nodejs.org/) (เวอร์ชัน LTS แนะนำ Node 18 หรือใหม่กว่า)
* ติดตั้งแอปพลิเคชัน **Expo Go** บนมือถือของคุณ (iOS App Store หรือ Android Play Store)

### 2. ติดตั้ง Dependencies
เปิด Terminal ในโฟลเดอร์โปรเจกต์ แล้วรันคำสั่ง:
```bash
npm install
```

### 3. ตั้งค่า Gemini API Key (สำหรับฟีเจอร์ AI Assistant)
1. ขอรับ Gemini API Key ฟรีได้ที่ [Google AI Studio](https://aistudio.google.com/apikey)
2. สร้างไฟล์ `.env` โดยคัดลอกจาก `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. เปิดไฟล์ `.env` แล้วระบุ API Key ของคุณ:
   ```env
   EXPO_PUBLIC_GEMINI_API_KEY="AIzaSy...your-actual-api-key"
   ```

### 4. รันโปรเจกต์ (Start the App)
```bash
npx expo start
```
* **iOS (เปิดใน Simulator):** กดปุ่ม `i` ใน terminal
* **Android (เปิดใน Emulator):** กดปุ่ม `a` ใน terminal
* **Web (เปิดบนเบราว์เซอร์):** กดปุ่ม `w` ใน terminal
* **เปิดบนอุปกรณ์จริง:** เปิดแอป **Expo Go** แล้วสแกน QR Code (โทรศัพท์และคอมพิวเตอร์ต้องอยู่ในเครือข่าย Wi-Fi เดียวกัน)
  * *หากสแกนแล้วต่อไม่ติด ให้ใช้โหมด Tunnel:* `npx expo start --tunnel`

---

## ⚙️ หลักการทำงานและสถาปัตยกรรมระบบ (System Architecture)

```
                       ┌─────────────────────────────────┐
                       │          App.js (Root)          │
                       │  • Kanit Font Loader            │
                       │  • AuthProvider (Context)       │
                       └────────────────┬────────────────┘
                                        │
                       ┌────────────────▼────────────────┐
                       │      RootNavigator (Stack)      │
                       │  • Login / Role Selection       │
                       │  • Dynamic Role Tabs Routing    │
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

### 1. การจัดการสถานะและการเข้าสู่ระบบ (Authentication & Role Management)
* ใช้ **React Context API** ([src/context/AuthContext.js](file:///Users/thanakornm/Desktop/CopyEstudy/src/context/AuthContext.js)) จัดการ State การล็อกอิน
* รองรับ **Multi-Role Switching**: ผู้ใช้คนเดียวที่มีหลายสิทธิ์ (เช่น นักเรียน + ผู้ปกครอง) สามารถสลับสิทธิ์การทำงานได้ทันทีโดยไม่ต้องล็อกเอาต์

### 2. การนำทาง (Navigation Structure)
* ควบคุมโดย [src/navigation/RootNavigator.js](file:///Users/thanakornm/Desktop/CopyEstudy/src/navigation/RootNavigator.js)
* หน้าหลักของแต่ละ Role เป็น Bottom Tab Navigation แยกอิสระ:
  * **StudentTabs:** หน้าหลัก, รายวิชา, คะแนน, โปรไฟล์
  * **ParentTabs:** หน้าหลัก, การเข้าเรียน, สุขภาวะ, โปรไฟล์
  * **TeacherTabs:** ภาพรวม, จัดการเรียนการสอน, ประกาศ/แชท, โปรไฟล์
  * **AdminTabs:** ภาพรวมสถิติ, จัดการระบบและสิทธิ์, โปรไฟล์
* หน้าคำร้อง ฟอร์มแก้ไข และเครื่องมือต่างๆ เปิดแบบ Native Modals พร้อม Transition Animation ที่ลื่นไหล

### 3. การเชื่อมต่อ AI (Google Gemini API)
* ฟังก์ชันเรียก API อยู่ที่ [src/services/gemini.js](file:///Users/thanakornm/Desktop/CopyEstudy/src/services/gemini.js) (ใช้ HTTP `fetch` แบบ lightweight)
* **AI ผู้ช่วยการเรียนรู้ (Student):** ปรับ System Prompt ตามบริบทของแต่ละรายวิชา
* **AI Chat ครูที่ปรึกษา:** ให้คำปรึกษาและตอบคำถามนักเรียน/ผู้ปกครองตาม Persona
* **AI Quiz Generator (Teacher):** แนวคิดการช่วยครูร่างข้อสอบอัตโนมัติ

---

## ✨ ฟีเจอร์เด่นตามบทบาทผู้ใช้งาน (Features by Role)

### 👨‍🎓 1. นักเรียน (Student)
* **Digital Student ID:** บัตรนักเรียนเสมือนจริงแบบเต็มจอ พร้อม QR Code และ Barcode ที่สแกนได้จริง
* **AI Learning Assistant:** แชทถาม-ตอบบทเรียนในแต่ละวิชาพร้อม Quick Prompts
* **MySkill:** วางแผนการเรียนรายบุคคลตามจุดแข็ง-จุดอ่อน และโหมดจำลองการดาวน์โหลดบทเรียนออฟไลน์
* **Mental Wellness Daily Check-in:** บันทึกอารมณ์/ความเครียดรายวัน พร้อมสิทธิ์เลือกแชร์ข้อมูลให้ผู้ปกครอง (PDPA)
* **ผลการเรียน & ตารางเรียน:** ดูผลการเรียนสะสม เกรดรายวิชา และตารางเรียนประจำวัน
* **ยื่นคำร้องออนไลน์:** ส่งคำร้องลาป่วย/ลากิจ และติดตามสถานะการอนุมัติ

### 👨‍👩‍👧 2. ผู้ปกครอง (Parent)
* **ภาพรวมการเรียนของบุตร:** ดูเวลาเข้าเรียน อัตราการมาเรียน และการบ้านที่ค้างส่ง
* **Child Wellness Overview:** ติดตามสุขภาวะของบุตรหลาน (เฉพาะข้อมูลที่นักเรียนอนุญาตให้แชร์) พร้อมคำแนะนำสำหรับพ่อแม่
* **ชำระค่าธรรมเนียมออนไลน์:** ดูยอดค่าเทอม ประวัติการชำระ และใบเสร็จรับเงิน
* **ติดต่อครูที่ปรึกษา:** ส่งข้อความปรึกษาครูประจำชั้นผ่านระบบแชท

### 👩‍🏫 3. ครูผู้สอน (Teacher)
* **ระบบเช็กชื่อเข้าเรียน (Attendance):** บันทึกการ มา/สาย/ขาด/ลา ได้สะดวกรวดเร็ว
* **บันทึกคะแนนเก็บและคะแนนสอบ:** กรอกคะแนนนักเรียนรายวิชา
* **Health Warning (ระบบเตือนความเสี่ยง):** วิเคราะห์สัญญาณความเครียด การขาดเรียน และผลการเรียนตก เพื่อเข้าช่วยเหลือนักเรียนได้ทันท่วงที
* **ระบบประกาศรายวิชา & อินบ็อกซ์ข้อความ:** สื่อสารกับนักเรียนและผู้ปกครองในความดูแล

### 🛠️ 4. ผู้ดูแลระบบ (Admin)
* **School Analytics:** แดชบอร์ดสรุปสถิติจำนวนนักเรียน ครู อัตราการเข้าเรียน และตัวชี้วัดโรงเรียน
* **User & Role Management:** จัดการรายชื่อ รีเซ็ตรหัสผ่าน และกำหนดสิทธิ์การเข้าถึง (Permissions)
* **System Settings & Audit Log:** บันทึกประวัติการทำงานในระบบ และตั้งค่าพิกัด GPS สำหรับการเช็กชื่อ

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
CopyEstudy/
├── App.js                     # จุดเริ่มต้นแอป (Font Loading & Providers)
├── app.json                   # การตั้งค่า Expo / App Configuration
├── .env.example               # ตัวอย่างไฟล์ Environment Variables
├── .gitignore                 # กำหนดไฟล์ที่ไม่ต้องนำขึ้น Git
├── assets/                    # รูปภาพ, ไอคอน, และ Avatars
│   └── avatars/               # ภาพโปรไฟล์เริ่มต้น (student, teacher, parent, admin)
└── src/
    ├── components/            # UI Components ส่วนกลาง (Card, Button, Avatar, Chip ฯลฯ)
    ├── context/               # React Context (AuthContext & Role State)
    ├── data/                  # ข้อมูลจำลองทั้งหมด (mockData.js)
    ├── navigation/            # ตัวจัดการเส้นทางและ Bottom Tabs (RootNavigator, Tabs)
    ├── screens/               # หน้าจอทั้งหมดแยกตามบทบาท
    │   ├── student/           # หน้าจอฝั่งนักเรียน (MySkill, Wellness, StudentCard ฯลฯ)
    │   ├── teacher/           # หน้าจอฝั่งครู (HealthWarning, AIQuiz, Advisory ฯลฯ)
    │   ├── parent/            # หน้าจอฝั่งผู้ปกครอง (ChildWellness, Payment ฯลฯ)
    │   ├── admin/             # หน้าจอฝั่งแอดมิน (Analytics, UserManagement ฯลฯ)
    │   └── shared/            # หน้าจอส่วนกลาง (EditProfile, ChangePassword, SharedChat)
    ├── services/              # การเชื่อมต่อภายนอก (gemini.js)
    └── theme/                 # Design System (colors, radius, typography)
```

---

## 🎨 การปรับแต่งดีไซน์และข้อมูล (Customization)

* **เปลี่ยนข้อมูล Mockup:** แก้ไขข้อมูลใน [src/data/mockData.js](file:///Users/thanakornm/Desktop/CopyEstudy/src/data/mockData.js)
* **เปลี่ยนรูปโปรไฟล์:** นำรูปภาพใหม่มาวางทับใน [assets/avatars/](file:///Users/thanakornm/Desktop/CopyEstudy/assets/avatars) โดยใช้ชื่อเดิม (`student.png`, `teacher.png`, `parent.png`, `admin.png`)
* **ปรับเปลี่ยนธีมและสี:** แก้ไขที่ [src/theme/colors.js](file:///Users/thanakornm/Desktop/CopyEstudy/src/theme/colors.js) และ [src/theme/typography.js](file:///Users/thanakornm/Desktop/CopyEstudy/src/theme/typography.js)

---

## 📄 ลิขสิทธิ์ (License)

โปรเจกต์นี้เผยแพร่ภายใต้สัญญาอนุญาต **[MIT License](LICENSE)**  
Copyright (c) 2026 **Thanakorn Morasilp** & **สมาชิกทีม Butter C.U.P**
