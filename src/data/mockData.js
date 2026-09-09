// ------------------------------------------------------------------
// Mock data for MySchool demo app. In a real app this would come from
// the Student Information System / Student Portal API.
// ------------------------------------------------------------------

export const USERS = [
  {
    username: '12345',
    password: '123',
    roles: ['student', 'parent'],
    studentId: '12345',
  },
  {
    username: 'teacher',
    password: '123',
    roles: ['teacher'],
    teacherId: 'T-01',
  },
  {
    username: 'admin',
    password: '123',
    roles: ['admin'],
  },
];

export const STUDENT = {
  id: '0123456789',
  name: 'นางสาวสมหญิง ใจดี',
  nameEn: 'SOMYING JAIDEE',
  firstName: 'สมหญิง',
  grade: 'ม.5',
  room: 'ม.5/2',
  program: 'แผนการเรียนวิทย์-คณิต',
  advisor: 'ครูสมศักดิ์ สดใส',
  avatar: null,
  behaviorScore: 82,
  gpa: 3.45,
  rank: '15 / 40',
  attendanceRate: 96,
};

export const PARENT = {
  name: 'คุณสมชาย ใจดี',
  relation: 'บิดา',
  child: STUDENT,
};

export const TEACHER = {
  id: 'T-01',
  name: 'ครูสมศักดิ์ สดใส',
  subjectGroup: 'คณิตศาสตร์',
  isAdvisor: true,
  advisorRoom: 'ม.5/2',
};

export const ADMIN = {
  name: 'ผู้ดูแลระบบ',
  department: 'ฝ่าย ICT',
};

export const SCHEDULE_TODAY = [
  { time: '08:30', subject: 'คณิตศาสตร์เพิ่มเติม 1', room: 'ห้อง 431' },
  { time: '09:30', subject: 'วิทยาศาสตร์ 1', room: 'ห้อง 431' },
  { time: '10:30', subject: 'ภาษาอังกฤษ 1', room: 'ห้อง 431' },
  { time: '13:00', subject: 'สังคมศึกษา', room: 'ห้อง 431' },
];

export const NEWS = [
  { id: 'n1', title: 'แจ้งเลื่อนสอบกลางภาค', date: '10 มิ.ย. 2569', tag: 'ประกาศ' },
  { id: 'n2', title: 'กิจกรรมวันวิทยาศาสตร์แห่งชาติ', date: '8 มิ.ย. 2569', tag: 'กิจกรรม' },
  { id: 'n3', title: 'ปิดปรับปรุงระบบ e-Learning คืนวันเสาร์', date: '5 มิ.ย. 2569', tag: 'ระบบ' },
];

export const CLASSES = [
  { id: 'c1', name: 'คณิตศาสตร์เพิ่มเติม 1', teacher: 'ครูสมศักดิ์', progress: 75, icon: 'calculator' },
  { id: 'c2', name: 'วิทยาศาสตร์ 1', teacher: 'ครูสมหมาย', progress: 60, icon: 'flask' },
  { id: 'c3', name: 'ภาษาอังกฤษ 1', teacher: 'ครู Anny', progress: 90, icon: 'chatbubbles' },
  { id: 'c4', name: 'สังคมศึกษา ศาสนาฯ', teacher: 'ครูเบญจวรรณ', progress: 40, icon: 'globe' },
  { id: 'c5', name: 'ห้อง 5/2', teacher: 'ครูสมศักดิ์', progress: 100, icon: 'home' },
];

export const CLASS_DETAIL = {
  c1: {
    announcements: [
      { id: 'a1', title: 'แจ้งเลื่อนสอบกลางภาค', body: 'เนื่องจากการปรับตารางเรียน สอบกลางภาคจะเป็นวันที่ 20 ก.ค. 2569', date: '10 มิ.ย. 2569' },
    ],
    files: [
      { id: 'f1', name: 'เอกสารประกอบการเรียน บทที่ 3.pdf', type: 'pdf' },
      { id: 'f2', name: 'สไลด์ บทที่ 3.pptx', type: 'pptx' },
      { id: 'f3', name: 'วิดีโอ การสอน บทที่ 3', type: 'video', duration: '20:15 นาที' },
    ],
    assignments: [
      { id: 'as1', title: 'แบบฝึกหัด บทที่ 3', due: '15 มิ.ย. 2569', status: 'ส่งแล้ว', score: '9/10' },
      { id: 'as2', title: 'การบ้าน อนุพันธ์', due: '18 มิ.ย. 2569', status: 'ยังไม่ส่ง', score: null },
    ],
    grades: { collected: 28, midterm: 30, final: null, total: 58, maxTotal: 100 },
  },
};

export const GRADES = {
  semester: 'ภาคเรียนที่ 1/2569',
  gpa: 3.45,
  subjects: [
    { id: 'g1', name: 'คณิตศาสตร์เพิ่มเติม 1', grade: 3.5, score: 88 },
    { id: 'g2', name: 'วิทยาศาสตร์ 1', grade: 4.0, score: 92 },
    { id: 'g3', name: 'ภาษาอังกฤษ 1', grade: 3.0, score: 78 },
    { id: 'g4', name: 'สังคมศึกษา', grade: 3.5, score: 85 },
    { id: 'g5', name: 'ภาษาไทย 1', grade: 4.0, score: 91 },
    { id: 'g6', name: 'สุขศึกษา', grade: 4.0, score: 95 },
    { id: 'g7', name: 'ศิลปะ', grade: 3.5, score: 84 },
  ],
};

export const ATTENDANCE_SUMMARY = {
  present: 20,
  absent: 0,
  late: 2,
  sickLeave: 0,
  personalLeave: 1,
  rate: 96,
};

// ---------------- Teacher-side data ----------------

export const TEACHER_TODAY = [
  { time: '08:30', room: 'ม.4/3', subject: 'คณิตศาสตร์เพิ่มเติม 1', location: 'ห้อง 431' },
  { time: '09:30', room: 'ม.4/3', subject: 'คณิตศาสตร์เพิ่มเติม 1', location: 'ห้อง 431' },
  { time: '13:00', room: 'ม.5/2', subject: 'คณิตศาสตร์เพิ่มเติม 2', location: 'ห้อง 521' },
];

export const TEACHER_STATS = {
  toGrade: 12,
  absentToday: 5,
  pendingRequests: 3,
};

export const TEACHER_CLASSES = [
  { id: 'tc1', name: 'คณิตศาสตร์เพิ่มเติม 1', room: 'ม.4/3', students: 38 },
  { id: 'tc2', name: 'คณิตศาสตร์เพิ่มเติม 2', room: 'ม.5/2', students: 40 },
  { id: 'tc3', name: 'ห้อง 2/5', room: 'ม.5/2', students: 36 },
];

export const AT_RISK_STUDENTS = [
  { id: 's1', name: 'ด.ช. ภานุวัฒน์ รักเรียน', room: 'ม.4/3', reason: 'ขาดเรียน 4 ครั้งในเดือนนี้' },
  { id: 's2', name: 'ด.ญ. กานดา มีสุข', room: 'ม.5/2', reason: 'คะแนนลดลงต่อเนื่อง 3 สัปดาห์' },
];

// ---------------- Admin-side data ----------------

export const SCHOOL_STATS = {
  students: 1245,
  teachers: 98,
  parents: 1102,
  activeToday: 856,
};

export const SCHOOL_ANALYTICS = {
  lowestSubject: { name: 'คณิตศาสตร์', level: 'ม.4', avg: 58 },
  highestAbsenceRoom: { name: 'ม.2/1', rate: 12 },
  atRiskCount: 23,
  attendanceByMonth: [
    { label: 'ม.ค.', value: 94 },
    { label: 'ก.พ.', value: 92 },
    { label: 'มี.ค.', value: 90 },
    { label: 'เม.ย.', value: 88 },
    { label: 'พ.ค.', value: 93 },
    { label: 'มิ.ย.', value: 92 },
  ],
  overallAttendanceRate: 92,
};

// ---------------- AI mock responses ----------------

export const AI_QUICK_PROMPTS = [
  'อธิบายอนุพันธ์ให้เข้าใจง่าย',
  'สรุปบทเรียนนี้เป็น Key Points',
  'ยกตัวอย่างโจทย์เพิ่มเติม',
  'สร้างแบบทดสอบจากบทเรียนนี้',
];

export const AI_STARTER_MESSAGES = [
  {
    id: 'ai1',
    from: 'ai',
    text: 'สวัสดีค่ะ! หนูเป็นผู้ช่วยการเรียนรู้ AI ประจำวิชาคณิตศาสตร์เพิ่มเติม 1 มีอะไรให้ช่วยอธิบายเกี่ยวกับบทเรียนนี้ไหมคะ?',
  },
];

export const PARENT_AI_SUMMARY =
  'สัปดาห์นี้ สมหญิง เข้าเรียนครบ 96% ส่งการบ้านครบทุกวิชา คะแนนวิชาวิทยาศาสตร์เพิ่มขึ้น 8% แต่ควรทบทวนวิชาคณิตศาสตร์เรื่องอนุพันธ์เพิ่มเติมก่อนสอบกลางภาค';

export const ADMIN_AI_SUMMARY =
  'ภาพรวมโรงเรียนสัปดาห์นี้ปกติดี อัตราการเข้าเรียนเฉลี่ย 92% วิชาคณิตศาสตร์ระดับ ม.4 มีคะแนนเฉลี่ยต่ำสุด (58%) ห้อง ม.2/1 มีอัตราขาดเรียนสูงสุด (12%) และมีนักเรียน 23 คนที่ AI ประเมินว่ามีความเสี่ยงด้านผลการเรียน';

// ---------------- Teacher: class rosters & live class feed ----------------
// (mutable in-memory "store" so screens can post/read within the same session)

export const STUDENT_ROSTERS = {
  tc1: [
    { id: 's101', name: 'ด.ช. ปวริศ คำแหง' },
    { id: 's102', name: 'ด.ญ. ณัฐธิดา ทองสุข' },
    { id: 's103', name: 'ด.ช. ภานุวัฒน์ รักเรียน' },
    { id: 's104', name: 'ด.ญ. กานดา มีสุข' },
    { id: 's105', name: 'ด.ช. กิตติพงษ์ ใจงาม' },
    { id: 's106', name: 'ด.ญ. ศศิธร ใจงาม' },
  ],
  tc2: [
    { id: 's201', name: 'นางสาวสมหญิง ใจดี' },
    { id: 's202', name: 'พิมพ์ชนก แสนสุข' },
    { id: 's203', name: 'ภูวนัย ศรีสุข' },
    { id: 's204', name: 'อารยา ทองมี' },
    { id: 's205', name: 'ณัฐวุฒิ ประเสริฐ' },
  ],
  tc3: [
    { id: 's301', name: 'ด.ช. อนุชา บุญมา' },
    { id: 's302', name: 'ด.ญ. เบญจมาศ พูลสวัสดิ์' },
    { id: 's303', name: 'ด.ช. วีรภัทร แก้วมณี' },
  ],
};

export const TEACHER_CLASS_FEED = {
  tc1: [
    { id: 'ta1', title: 'แจ้งเลื่อนสอบกลางภาค', body: 'สอบกลางภาคจะเลื่อนเป็นวันที่ 20 ก.ค. 2569 กรุณาเตรียมตัวให้พร้อม', date: '10 มิ.ย. 2569' },
    { id: 'ta2', title: 'มอบหมายแบบฝึกหัดบทที่ 3', body: 'ให้นักเรียนทำแบบฝึกหัดหน้า 45-47 ส่งภายในวันศุกร์นี้', date: '5 มิ.ย. 2569' },
  ],
  tc2: [
    { id: 'ta3', title: 'เตรียมตัวสอบย่อยสัปดาห์หน้า', body: 'เนื้อหาเรื่องอนุพันธ์และการประยุกต์ใช้ ทบทวนจากสไลด์บทที่ 3-4', date: '3 มิ.ย. 2569' },
  ],
  tc3: [],
};

// ---------------- Parent: grades / homework / payment ----------------

export const CHILD_ASSIGNMENTS = [
  { id: 'hw1', subject: 'คณิตศาสตร์เพิ่มเติม 1', title: 'แบบฝึกหัด บทที่ 3', due: '15 มิ.ย. 2569', status: 'ส่งแล้ว' },
  { id: 'hw2', subject: 'คณิตศาสตร์เพิ่มเติม 1', title: 'การบ้าน อนุพันธ์', due: '18 มิ.ย. 2569', status: 'ยังไม่ส่ง' },
  { id: 'hw3', subject: 'วิทยาศาสตร์ 1', title: 'รายงานผลการทดลอง', due: '20 มิ.ย. 2569', status: 'ส่งแล้ว' },
  { id: 'hw4', subject: 'ภาษาอังกฤษ 1', title: 'Writing Assignment', due: '22 มิ.ย. 2569', status: 'ส่งช้า' },
  { id: 'hw5', subject: 'สังคมศึกษา', title: 'ใบงานที่ 4', due: '25 มิ.ย. 2569', status: 'ยังไม่ส่ง' },
];

export const PAYMENT_SUMMARY = {
  term: 'ภาคเรียนที่ 1/2569',
  amountDue: 23500,
  dueDate: '15 มิ.ย. 2569',
  status: 'ค้างชำระ',
};

export const PAYMENT_HISTORY = [
  { id: 'p1', date: '5 พ.ค. 2569', description: 'ค่าเทอม ภาคเรียนที่ 1/2569 (งวดที่ 1)', amount: 25000, method: 'โอนผ่านธนาคาร', status: 'ชำระแล้ว' },
  { id: 'p2', date: '10 ม.ค. 2569', description: 'ค่าเทอม ภาคเรียนที่ 2/2568', amount: 28500, method: 'บัตรเครดิต', status: 'ชำระแล้ว' },
  { id: 'p3', date: '3 ส.ค. 2568', description: 'ค่าเทอม ภาคเรียนที่ 1/2568', amount: 28500, method: 'เงินสดที่โรงเรียน', status: 'ชำระแล้ว' },
];

// ---------------- Requests (ลาป่วย/ลากิจ/ขอเอกสาร) — student & parent ----------------

export const REQUEST_TYPES = ['ลาป่วย', 'ลากิจ', 'ขอใบรับรองนักเรียน', 'ขอเอกสารอื่นๆ'];

export const MY_REQUESTS = [
  { id: 'r1', type: 'ลาป่วย', date: '2 มิ.ย. 2569', detail: 'มีไข้ ไม่สบาย', status: 'อนุมัติแล้ว' },
  { id: 'r2', type: 'ขอใบรับรองนักเรียน', date: '20 พ.ค. 2569', detail: 'ใช้สมัครกิจกรรมภายนอก', status: 'อนุมัติแล้ว' },
];

// ---------------- Teacher inbox (mock conversations) ----------------

export const TEACHER_INBOX = [
  { id: 'i1', name: 'นางสาวสมหญิง ใจดี', role: 'นักเรียน', room: 'ม.5/2', lastMessage: 'ครูคะ พรุ่งนี้ต้องส่งการบ้านไหมคะ', unread: true },
  { id: 'i2', name: 'คุณสมชาย ใจดี', role: 'ผู้ปกครอง', room: 'ม.5/2 (ผปค.นางสาวสมหญิง ใจดี)', lastMessage: 'สวัสดีครับครู อยากสอบถามเรื่องคะแนนสอบกลางภาคครับ', unread: true },
  { id: 'i3', name: 'ภานุวัฒน์ รักเรียน', role: 'นักเรียน', room: 'ม.4/3', lastMessage: 'ขอโทษครับที่ขาดเรียนเมื่อวาน', unread: false },
  { id: 'i4', name: 'กานดา มีสุข', role: 'นักเรียน', room: 'ม.5/2', lastMessage: 'ขอบคุณครูค่ะ', unread: false },
];

// ---------------- Advisory (homeroom) — behavior score adjustments ----------------

export const BEHAVIOR_SCORES = {
  s201: { score: 82, history: [{ id: 'b1', delta: -3, reason: 'มาสาย 3 ครั้งในเดือนนี้', date: '1 มิ.ย. 2569' }] },
  s202: { score: 95, history: [] },
  s203: { score: 78, history: [{ id: 'b2', delta: -5, reason: 'ไม่ส่งการบ้าน 2 ครั้งติดต่อกัน', date: '28 พ.ค. 2569' }] },
  s204: { score: 90, history: [] },
  s205: { score: 88, history: [] },
};

// ---------------- Admin: manage users / school configuration ----------------

export const MOCK_TEACHERS = [
  { id: 't1', name: 'ครูสมศักดิ์ สดใส', subject: 'คณิตศาสตร์', room: 'ม.5/2 (ที่ปรึกษา)' },
  { id: 't2', name: 'ครูสมหมาย ศรีวิไล', subject: 'วิทยาศาสตร์', room: 'ม.4/3' },
  { id: 't3', name: 'ครู Anny Wilson', subject: 'ภาษาอังกฤษ', room: 'ม.5/1' },
  { id: 't4', name: 'ครูเบญจวรรณ ทองดี', subject: 'สังคมศึกษา', room: 'ม.4/1' },
  { id: 't5', name: 'ครูบุหงา แสงเดือน', subject: 'ภาษาไทย', room: 'ม.3/2' },
];

export const MOCK_PARENTS = [
  { id: 'p1', name: 'คุณสมชาย ใจดี', child: 'นางสาวสมหญิง ใจดี (ม.5/2)' },
  { id: 'p2', name: 'คุณวิภา คำแหง', child: 'ปวริศ คำแหง (ม.4/3)' },
  { id: 'p3', name: 'คุณประยุทธ มีสุข', child: 'กานดา มีสุข (ม.5/2)' },
  { id: 'p4', name: 'คุณมาลี ทองสุข', child: 'ณัฐธิดา ทองสุข (ม.4/3)' },
];

export const MOCK_STUDENTS_DIRECTORY = [
  { id: 's201', name: 'นางสาวสมหญิง ใจดี', room: 'ม.5/2' },
  { id: 's202', name: 'พิมพ์ชนก แสนสุข', room: 'ม.5/2' },
  { id: 's101', name: 'ปวริศ คำแหง', room: 'ม.4/3' },
  { id: 's103', name: 'ภานุวัฒน์ รักเรียน', room: 'ม.4/3' },
  { id: 's104', name: 'กานดา มีสุข', room: 'ม.5/2' },
  { id: 's301', name: 'อนุชา บุญมา', room: 'ม.3/1' },
];

// Flat combined directory used for the admin "reset password" search screen.
export const USER_DIRECTORY = [
  ...MOCK_STUDENTS_DIRECTORY.map((s) => ({ id: s.id, name: s.name, role: 'นักเรียน', sub: s.room })),
  ...MOCK_TEACHERS.map((t) => ({ id: t.id, name: t.name, role: 'ครู', sub: t.subject })),
  ...MOCK_PARENTS.map((p) => ({ id: p.id, name: p.name, role: 'ผู้ปกครอง', sub: p.child })),
  { id: 'admin1', name: 'ผู้ดูแลระบบ', role: 'ผู้ดูแลระบบ', sub: 'ฝ่าย ICT' },
];

export const ACADEMIC_TERMS = [
  { id: 'term1', label: 'ภาคเรียนที่ 1/2569', active: true },
  { id: 'term2', label: 'ภาคเรียนที่ 2/2568', active: false },
  { id: 'term3', label: 'ภาคเรียนที่ 1/2568', active: false },
];

export const ROOMS = [
  { id: 'room1', level: 'ม.4', name: 'ม.4/1', homeroom: 'ครูเบญจวรรณ ทองดี', students: 36 },
  { id: 'room2', level: 'ม.4', name: 'ม.4/3', homeroom: 'ครูสมหมาย ศรีวิไล', students: 38 },
  { id: 'room3', level: 'ม.5', name: 'ม.5/2', homeroom: 'ครูสมศักดิ์ สดใส', students: 40 },
  { id: 'room4', level: 'ม.5', name: 'ม.5/1', homeroom: 'ครู Anny Wilson', students: 37 },
];

export const PERMISSION_ROLES = [
  {
    role: 'นักเรียน',
    permissions: [
      { key: 'view_grades', label: 'ดูผลการเรียนตนเอง', enabled: true },
      { key: 'submit_request', label: 'ยื่นคำร้องออนไลน์', enabled: true },
      { key: 'chat_teacher', label: 'ส่งข้อความหาครู', enabled: true },
    ],
  },
  {
    role: 'ครู',
    permissions: [
      { key: 'edit_grades', label: 'แก้ไขคะแนนนักเรียน', enabled: true },
      { key: 'take_attendance', label: 'เช็กชื่อเข้าเรียน', enabled: true },
      { key: 'ai_tools', label: 'ใช้เครื่องมือ AI ช่วยครู', enabled: true },
      { key: 'edit_other_room', label: 'แก้คะแนนนักเรียนห้องอื่น', enabled: false },
    ],
  },
  {
    role: 'ผู้ปกครอง',
    permissions: [
      { key: 'view_child', label: 'ดูข้อมูลบุตรหลาน', enabled: true },
      { key: 'pay_fee', label: 'ชำระค่าธรรมเนียมออนไลน์', enabled: true },
    ],
  },
];

export const AUDIT_LOG = [
  { id: 'log1', time: '4 ส.ค. 2569 08:12', user: 'admin', action: 'รีเซ็ตรหัสผ่านให้ผู้ใช้ teacher' },
  { id: 'log2', time: '3 ส.ค. 2569 21:40', user: 'ครูสมศักดิ์', action: 'บันทึกคะแนนสอบกลางภาค วิชาคณิตศาสตร์เพิ่มเติม 2' },
  { id: 'log3', time: '3 ส.ค. 2569 14:05', user: 'admin', action: 'สร้างประกาศทั้งโรงเรียน: แจ้งปิดปรับปรุงระบบ' },
  { id: 'log4', time: '2 ส.ค. 2569 09:30', user: '12345', action: 'เข้าสู่ระบบ (นักเรียน)' },
  { id: 'log5', time: '1 ส.ค. 2569 16:50', user: 'admin', action: 'แก้ไขค่า GPS สำหรับเช็กชื่อ' },
];

export const GPS_SETTINGS = {
  latitude: '13.7563',
  longitude: '100.5018',
  radiusMeters: '200',
};

export const SYSTEM_SETTINGS = [
  { key: 'elearning', label: 'เปิดใช้งานระบบ e-Learning', enabled: true },
  { key: 'ai_warning', label: 'เปิดใช้งาน AI Early Warning', enabled: true },
  { key: 'force_pw_change', label: 'บังคับเปลี่ยนรหัสผ่านทุก 90 วัน', enabled: false },
  { key: 'gps_checkin', label: 'บังคับเช็กชื่อผ่าน GPS เท่านั้น', enabled: true },
];

// ---------------- Mental Wellness (daily check-in) ----------------
// Design intent: quick, low-pressure daily check-in — NOT a clinical
// screening questionnaire. All summaries use non-diagnostic language
// ("ควรติดตาม / ควรพูดคุย"), never "มีอาการ..." or a diagnosis.

export const MOOD_SCALE = [
  { value: 1, emoji: '😣', label: 'แย่มาก' },
  { value: 2, emoji: '😕', label: 'ไม่ค่อยดี' },
  { value: 3, emoji: '😐', label: 'เฉยๆ' },
  { value: 4, emoji: '🙂', label: 'ดี' },
  { value: 5, emoji: '😄', label: 'ดีมาก' },
];

// Last 7 days for the logged-in student. Today (last entry) starts
// unanswered — the student fills it in on the check-in screen.
export const WELLNESS_HISTORY = [
  { day: 'จ.', mood: 4, stress: 2 },
  { day: 'อ.', mood: 4, stress: 2 },
  { day: 'พ.', mood: 3, stress: 3 },
  { day: 'พฤ.', mood: 4, stress: 2 },
  { day: 'ศ.', mood: 3, stress: 3 },
  { day: 'ส.', mood: 4, stress: 2 },
  { day: 'อา.', mood: null, stress: null },
];

// The student's own choice of whether parents can see the wellness
// summary — respected everywhere the data is shown (PDPA-friendly).
export const WELLNESS_SETTINGS = {
  shareWithParent: true,
};

export const WELLNESS_DISCLAIMER =
  'นี่เป็นภาพรวมเพื่อช่วยให้สังเกตตัวเอง ไม่ใช่การวินิจฉัยสุขภาพจิต หากวันไหนรู้สึกไม่ไหว สามารถขอความช่วยเหลือได้เสมอ';

export const PARENT_WELLNESS_DISCLAIMER =
  'ข้อมูลนี้มาจากการเช็กอินความรู้สึกของบุตรหลานเอง เป็นภาพรวมเพื่อให้สังเกตอารมณ์เบื้องต้นเท่านั้น ไม่ใช่การวินิจฉัยหรือข้อสรุปทางการแพทย์';

export const HEALTH_WARNING_DISCLAIMER =
  'สัญญาณเหล่านี้มาจากการรวมข้อมูลเช็กอิน การเข้าเรียน คะแนน และการส่งงาน เพื่อช่วยให้ครูสังเกตนักเรียนที่ควรดูแลเพิ่มเติม ไม่ใช่การวินิจฉัย ครูเป็นผู้ตัดสินใจขั้นสุดท้ายว่าจะติดตามอย่างไร';

export const MENTAL_HEALTH_HOTLINE = {
  name: 'สายด่วนสุขภาพจิต กรมสุขภาพจิต',
  phone: '1323',
  note: 'โทรฟรี มีนักจิตวิทยาให้คำปรึกษา ตลอด 24 ชั่วโมง',
};

// ---------------- Teacher: Health Warning ----------------
// Combines daily check-in + attendance + grade trend + assignment
// signals into "signals to watch", never a diagnosis (see disclaimer
// above). category: 'mental' | 'physical'. severity: 'high' | 'medium'.

export const HEALTH_WARNINGS = [
  {
    id: 'hw1',
    studentId: 's103',
    name: 'ณัฐพล ใจดี',
    room: 'ม.4/3',
    category: 'mental',
    severity: 'high',
    signals: ['คะแนนลดลงต่อเนื่อง 3 สัปดาห์', 'Daily Check-in พบความเครียดสูงขึ้นต่อเนื่อง 4 วัน'],
    suggestion: 'ควรติดตามใกล้ชิด',
  },
  {
    id: 'hw2',
    studentId: 's202',
    name: 'พิมพ์ชนก แสงทอง',
    room: 'ม.4/2',
    category: 'physical',
    severity: 'medium',
    signals: ['พลังงาน/อารมณ์ต่ำหลายวันติดกัน', 'ขาดเรียนเพิ่มขึ้นจากปกติ'],
    suggestion: 'ควรพูดคุย',
  },
  {
    id: 'hw3',
    studentId: 's103b',
    name: 'ภานุวัฒน์ รักเรียน',
    room: 'ม.4/3',
    category: 'mental',
    severity: 'medium',
    signals: ['ขาดเรียน 4 ครั้งในเดือนนี้', 'ไม่ค่อยเข้าร่วมกิจกรรมในห้องเหมือนก่อน'],
    suggestion: 'ควรพูดคุย',
  },
];
