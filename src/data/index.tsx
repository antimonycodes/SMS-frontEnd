import profilepics from "../assets/dpjpg.jpg";
export const generateRandomId = () => {
  return `SCH${Math.floor(Math.random() * 99999)}`;
};
export const studentsList = [
  {
    id: generateRandomId(),
    firstName: "Adebayo",
    lastName: "Olumide",
    class: "JSS 1A",
    feeStatus: "Fully paid",
    age: "15",
    gender: "Male",
    dateOfBirth: "2012-03-15",
    bloodGroup: "O+",
    address: "15 Allen Avenue, Ikeja, Lagos",
    phone: "08012345678",
    email: "olumide.adebayo@email.com",
    admissionDate: "2024-09-15",
    studentType: "Day Student",
    religion: "Christianity",
    stateOfOrigin: "Lagos",
    profileImage: profilepics,
    parent: {
      name: "Mr. Adebayo Tunde",
      relationship: "Father",
      phone: "08098765432",
      email: "tunde.adebayo@email.com",
      occupation: "Engineer",
      address: "15 Allen Avenue, Ikeja, Lagos",
    },
    fees: {
      total: 150000,
      paid: 100000,
      balance: 50000,
      lastPayment: "2024-01-15",
      paymentHistory: [
        {
          date: "2024-01-15",
          amount: 50000,
          term: "Second Term",
          method: "Bank Transfer",
        },
        {
          date: "2023-09-15",
          amount: 50000,
          term: "First Term",
          method: "Cash",
        },
      ],
    },
    grades: {
      Mathematics: { CA: 20, exam: 65, total: 85, grade: "A", position: 3 },
      "English Language": {
        CA: 18,
        exam: 62,
        total: 80,
        grade: "B+",
        position: 5,
      },
      "Basic Science": {
        CA: 19,
        exam: 71,
        total: 90,
        grade: "A+",
        position: 1,
      },
      "Social Studies": {
        CA: 16,
        exam: 59,
        total: 75,
        grade: "B",
        position: 8,
      },
      Hausa: { CA: 22, exam: 68, total: 90, grade: "A+", position: 2 },
      French: { CA: 15, exam: 55, total: 70, grade: "B-", position: 12 },
    },
    attendance: {
      total: 45,
      present: 42,
      absent: 2,
      late: 1,
      percentage: 93.3,
      recentRecord: [
        { date: "2024-02-15", status: "Present", timeIn: "7:45 AM" },
        { date: "2024-02-14", status: "Present", timeIn: "7:50 AM" },
        { date: "2024-02-13", status: "Late", timeIn: "8:15 AM" },
        { date: "2024-02-12", status: "Absent", timeIn: null },
        { date: "2024-02-11", status: "Present", timeIn: "7:40 AM" },
      ],
    },
    behavior: {
      conduct: "Excellent",
      punctuality: "Good",
      neatness: "Excellent",
      remarks:
        "Very attentive in class and shows great interest in Mathematics and Sciences.",
    },
    achievements: [
      { title: "Best in Mathematics", term: "First Term", year: "2024" },
      { title: "Perfect Attendance", term: "First Term", year: "2024" },
      { title: "Science Quiz Winner", term: "First Term", year: "2024" },
    ],
  },
  {
    id: generateRandomId(),
    dob: "2012",
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    feeStatus: "#80,000 Due",
    email: "lawalayodeji@student.com",
    age: "15",
    admissionDate: "2024-09-15",
    fees: { total: 150000, paid: 100000, balance: 50000 },
    grades: {
      Mathematics: { CA: 20, exam: 65, total: 85, grade: "A" },
      English: { CA: 18, exam: 62, total: 80, grade: "B+" },
      Science: { CA: 19, exam: 71, total: 90, grade: "A+" },
    },
  },
  {
    id: generateRandomId(),
    dob: "2012",
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    feeStatus: "Fully paid",
    email: "lawalayodeji@student.com",
    age: "15",
    parentName: "Mrs. Nwosu Ada",
    parentPhone: "08087654321",
    admissionDate: "2024-09-15",
    fees: { total: 150000, paid: 150000, balance: 0 },
    grades: {
      Mathematics: { CA: 22, exam: 68, total: 90, grade: "A+" },
      English: { CA: 20, exam: 65, total: 85, grade: "A" },
      Science: { CA: 18, exam: 67, total: 85, grade: "A" },
    },
  },
  {
    id: generateRandomId(),
    dob: "2012",
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    feeStatus: "#50,000 Due",
    email: "lawalayodeji@student.com",
    age: "15",
    admissionDate: "2024-09-15",
    fees: { total: 150000, paid: 100000, balance: 50000 },
    grades: {
      Mathematics: { CA: 20, exam: 65, total: 85, grade: "A" },
      English: { CA: 18, exam: 62, total: 80, grade: "B+" },
      Science: { CA: 19, exam: 71, total: 90, grade: "A+" },
    },
  },
  {
    id: generateRandomId(),
    dob: "2012",
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    feeStatus: "Fully paid",
    email: "lawalayodeji@student.com",
    age: "15",
    admissionDate: "2024-09-15",
    fees: { total: 150000, paid: 100000, balance: 50000 },
    grades: {
      Mathematics: { CA: 20, exam: 65, total: 85, grade: "A" },
      English: { CA: 18, exam: 62, total: 80, grade: "B+" },
      Science: { CA: 19, exam: 71, total: 90, grade: "A+" },
    },
  },
];

export const teachers = [
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],
    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
  {
    id: generateRandomId(),
    firstName: "Lawal",
    lastName: "Ayodeji",
    class: "JSS 1A",
    classes: ["SSS 1A", "SSS 1B", "SSS 2A", "SSS 2B", "SSS 3A"],

    email: "lawalayodeji@student.com",
    subjects: ["Math", "English", "Agric"],
  },
];

export const classrooms = [
  {
    category: "JSS 1",
    classroom: [
      {
        name: "JSS1 A",
        students: 30,
        teachers: 9,
        classTeacher: "Agboola Taiwo",
        classCaptain: "Adeoye John",
        feePaymentPercentage: "80%",
        studentsList: [
          {
            id: "SHS001",
            firstName: "John",
            lastName: "Doe",
            email: "johndoe@example.com",
            class: "JSS 1A",
            sec: "f",
          },
          {
            id: generateRandomId(),
            firstName: "Jane",
            lastName: "Smith",
            email: "janesmith@example.com",
            class: "JSS 1A",
          },
        ],
      },
      {
        name: "JSS1 B",
        students: 30,
        classCaptain: "Adeoye John",
        teachers: 9,
        classTeacher: "Agboola Taiwo",
        feePaymentPercentage: "80%",
        studentsList: [
          {
            id: "SHS003",
            firstName: "Michael",
            lastName: "Johnson",
            email: "michaeljohnson@example.com",
            class: "JSS 1B",
          },
          {
            id: "SHS004",
            firstName: "Emily",
            lastName: "Davis",
            email: "emilydavis@example.com",
            class: "JSS 1B",
          },
        ],
      },
      {
        name: "JSS1 C",
        students: 30,
        classCaptain: "Adeoye John",
        teachers: 9,
        classTeacher: "Agboola Taiwo",
        feePaymentPercentage: "80%",
        studentsList: [
          {
            id: "SHS005",
            firstName: "Alice",
            lastName: "Williams",
            email: "alicewilliams@example.com",
            class: "JSS 1C",
          },
          {
            id: "SHS006",
            firstName: "David",
            lastName: "Brown",
            email: "davidbrown@example.com",
            class: "JSS 1C",
          },
        ],
      },
    ],
    subjectsData: [
      {
        subject: "Mathematics",
        assignedTeacher: "taiwo James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
    ],
    count: 75,
  },
  {
    category: "JSS 2",
    classroom: [
      {
        name: "JSS2 A",
        students: 30,
        classCaptain: "Adeoye John",
        teachers: 9,
        classTeacher: "Agboola Taiwo",
        feePaymentPercentage: "80%",
        studentsList: [
          {
            id: "SHS007",
            firstName: "Sarah",
            lastName: "Wilson",
            email: "sarahwilson@example.com",
          },
        ],
      },
      {
        name: "JSS2 B",
        students: 30,
        classCaptain: "Adeoye John",
        teachers: 9,
        classTeacher: "Agboola Taiwo",
        feePaymentPercentage: "80%",
      },
      {
        name: "JSS2 C",
        students: 30,
        classCaptain: "Adeoye John",
        teachers: 9,
        classTeacher: "Agboola Taiwo",
        feePaymentPercentage: "80%",
      },
    ],
    subjectsData: [
      {
        subject: "Mathematics",
        assignedTeacher: "Kenny James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
    ],
    count: 75,
  },
  {
    category: "SS 1",
    classroom: [
      {
        name: "SS1 A",
        students: 30,
        teachers: 9,
        classCaptain: "Adeoye John",
        classTeacher: "Agboola Taiwo",
        feePaymentPercentage: "80%",
        studentsList: [
          {
            id: "SHS007",
            firstName: "Sarah",
            lastName: "Wilson",
            email: "sarahwilson@example.com",
            class: "SS1 A",
          },
        ],
      },
    ],
    subjectsData: [
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
      {
        subject: "Mathematics",
        assignedTeacher: "Popola James",
      },
    ],
    count: 75,
  },
];
export const studentsGrades = [
  {
    id: generateRandomId(),
    fullName: "Adeola Dodo",
    caScore: 25,
    examScore: 60,
    total: 85,
    grade: "A",
  },
  {
    id: generateRandomId(),
    fullName: "Adeola Dodo",
    caScore: 25,
    examScore: 60,
    total: 85,
    grade: "A",
  },
  {
    id: generateRandomId(),
    fullName: "Adeola Dodo",
    caScore: 25,
    examScore: 60,
    total: 85,
    grade: "A",
  },
  {
    id: generateRandomId(),
    fullName: "Adeola Dodo",
    caScore: 25,
    examScore: 60,
    total: 85,
    grade: "A",
  },
];

export const subjects = [
  {
    id: generateRandomId(),
    subjectName: "Mathematics",
    classes: ["JSS1", "JSS2", "JSS3", "SS1", "SS2", "SS3"],
    teachers: ["Mr Agboola", "Mr Karim"],
  },
];

export const announcements = [
  {
    id: generateRandomId(),
    title: "2024/2025 Inter house sport event",
    sub: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
        delectus adipisci eum sit iure! Deleniti enim quas aperiam, dignissimos
        eaque eveniet dolorum sed rem nemo quae! Ut, tenetur tempora hic,
      </p>
    ),
    createdBy: "Principal Agboola Kareem",
    createdAt: "20 May 2024",
  },
  {
    id: generateRandomId(),
    title: "2024/2025 Inter house sport event",
    sub: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
        delectus adipisci eum sit iure! Deleniti enim quas aperiam, dignissimos
        eaque eveniet dolorum sed rem nemo quae! Ut, tenetur tempora hic,
      </p>
    ),
    createdBy: "Principal Agboola Kareem",
    createdAt: "20 May 2024",
  },
  {
    id: generateRandomId(),
    title: "2024/2025 Inter house sport event",
    sub: (
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi
        delectus adipisci eum sit iure! Deleniti enim quas aperiam, dignissimos
        eaque eveniet dolorum sed rem nemo quae! Ut, tenetur tempora hic,
      </p>
    ),
    createdBy: "Principal Agboola Kareem",
    createdAt: "20 May 2024",
  },
];

export const assignmentList = [
  {
    id: "ass001",
    teacherName: "Mr Adeola John",
    subject: "Mathematics",
    classArm: "JSS 2B",
    title: "Government Assignment",
    description: "lorem1ghjkohgfghjk",
    dueDate: "05 May 2025",
    submissionList: [
      {
        id: "01",
        studentName: "Akin Maleek",
        img: profilepics,
        status: "Submitted",
        submittedDate: "05 May 2025 6pm",
        subject: "Mathematics",
        classArm: "JSS 2B",
        description: "lorem1ghjkohgfghjk",
        dueDate: "05 May 2025",
        title: " Algebra",
        teacherName: "Mr Adeola John",
      },
      {
        id: "02",
        studentName: "Ara Boluwatife",
        img: profilepics,
        status: "Pending",
        submittedDate: "",
        subject: "Biology",
        classArm: "JSS 2B",
        description: "lorem1ghjkohgfghjk",
        dueDate: "05 May 2025",
        title: "Cells Assignment",
      },
    ],
  },
  {
    id: "ass002",
    teacherName: "Mr Adeola John",
    subject: "Mathematics",
    classArm: "JSS 2B",
    title: "Title",
    description: "lorem1ghjkohgfghjk",
    dueDate: "05 May 2025",
    submissionList: [
      {
        studentName: "Akin Maleek",
        img: profilepics,
        status: "Pending",
        submittedDate: "",
        subject: "Mathematics",
        classArm: "JSS 2B",
        description: "lorem1ghjkohgfghjk",
        dueDate: "05 May 2025",
        title: " Algebra",
        teacherName: "Mr Adeola John",
      },
    ],
  },
  {
    id: "ass001",
    teacherName: "Mr Adeola John",
    subject: "Mathematics",
    classArm: "JSS 2B",
    title: "Title",
    description: "lorem1ghjkohgfghjk",
    dueDate: "05 May 2025",
    submissionList: [
      {
        studentName: "Akin Maleek",
        img: profilepics,
        status: "Submitted",
        submittedDate: "05 May 2025 6pm",
        subject: "Mathematics",
        classArm: "JSS 2B",
        title: " Algebra",
        teacherName: "Mr Adeola John",
        dueDate: "05 May 2025",
      },
    ],
  },
  {
    id: "ass001",
    teacherName: "Mr Adeola John",
    subject: "Mathematics",
    classArm: "JSS 2B",
    title: "Title",
    description: "lorem1ghjkohgfghjk",
    dueDate: "05 May 2025",
    submissionList: [
      {
        studentName: "Akin Maleek",
        img: profilepics,
        status: "Graded",
        submittedDate: "",
        title: " Algebra",
        teacherName: "Mr Adeola John",

        dueDate: "05 May 2025",
      },
    ],
  },
];
