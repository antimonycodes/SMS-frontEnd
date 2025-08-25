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
    description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
    dueDate: "05 September 2025",
    status: "Active",
    submissionList: [
      {
        id: "01",
        studentName: "Akin Maleek",
        img: profilepics,
        status: "Submitted",
        submittedDate: "05 May 2025 6pm",
        subject: "Mathematics",
        classArm: "JSS 2B",
        description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
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
        description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
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
    description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
    dueDate: "05 May 2025",
    status: "Due",
    submissionList: [
      {
        studentName: "Akin Maleek",
        img: profilepics,
        status: "Pending",
        submittedDate: "",
        subject: "Mathematics",
        classArm: "JSS 2B",
        description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
        dueDate: "05 May 2025",
        title: " Algebra",
        teacherName: "Mr Adeola John",
      },
    ],
  },
  {
    id: "ass003",
    teacherName: "Mr Adeola John",
    subject: "Mathematics",
    classArm: "JSS 2B",
    title: "Title",
    description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
    dueDate: "05 May 2025",
    status: "Due",
    submissionList: [
      {
        studentName: "Akin Maleek",
        img: profilepics,
        status: "Submitted",
        submittedDate: "05 May 2025 6pm",
        subject: "Mathematics",
        classArm: "JSS 2B",
        description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
        title: " Algebra",
        teacherName: "Mr Adeola John",
        dueDate: "05 May 2025",
      },
    ],
  },
  {
    id: "ass004",
    teacherName: "Mr Adeola John",
    subject: "Mathematics",
    classArm: "JSS 2B",
    title: "Title",
    description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
    dueDate: "05 September 2025",
    status: "Active",
    submissionList: [
      {
        studentName: "Akin Maleek",
        img: profilepics,
        status: "Graded",
        description: "Calculate the deriviate of x2 > 5y = 3x(3>4) ",
        submittedDate: "",
        title: " Algebra",
        teacherName: "Mr Adeola John",
        dueDate: "05 May 2025",
      },
    ],
  },
];

export const blogs = [
  {
    id: 1,
    img: profilepics,
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
    heading:
      "OYO2027: Makinde's PDP is Defeatable if….— APC Chieftain, Akeem Agbaje Reveals",
    paragraph:
      "A chieftain of the All Progressives’ Congress (APC) in Oyo State, Barr. Akeem Agbaje has revealed the strategy the leading opposition party in the state can employ to oust Gov. Seyi Makinde's PDP in 2027.Agbaje on a popular radio program in Ibadan, the Oyo State capital explained that the present government in the pacesetter state under the leadership of Gov. Makinde's PDP is defeatable at the polls if APC can be united in 2027.Agbaje elucidated further that the event of 2023 should be put behind, and the party could only get it better ahead of 2027 if all stakeholders resolved to stop the blame game over the last electoral loss. “Majority of the aspirants then had the agenda of hijacking the system in their respective favor but only the smartest one won at the end. I do not see why Sen. Folarin should be castigated for emerging as the guber candidate of our party in 2023.If we are going to be honest with ourselves, we need a united APC to take over from the present PDP in the state. There should be strict adherence to party discipline through respect to the leadership of the party in the state. Our state working committee and relevant stakeholders should continue meeting to resolve whatever issues causing division within the party. I trust the capacities of our state Chairman, Alhaji Olayide Abass and other officers of the party at state and other levels. APC is our party, and we are all going to work together.",
  },
  {
    id: 2,
    img: profilepics,
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
    heading:
      "Governance is more than Window Dressing - APC Chieftain Carpets Makinde",
    paragraph: `Chieftain of the All Progressives’ Congress in Oyo State, Barrister Akeem Agbaje has carpeted the incumbent government of Gov. Seyi Makinde in Oyo State. The seasoned lawyer cum politician berated the government for engaging in surface scratching instead of thorough infrastructural development that could transform the fortunes of the state for the better. Agbaje made the assertion while featuring on a radio programme in Ibadan. Agbaje noted that, government is like a system and a cycle that must be completed. “You cannot jump one aspect and expect results on the other. They are intertwined. According to him, the upgrading of Ibadan Airport to international standard seems a misguided priority. "While it is good to have had the upgrade even before now, it is important to note that, Ibadan does not have the business hub that could fetch the required international passengers’ traffic yet. Government should have addressed that before embarking on the upgrade. That is one of the undoings of Gov. Makinde."“Governance is more than surface scratching as is being experienced in Oyo state under Gov. Makinde. Infrastructural development is key to economic prosperity. Under these infrastructural drives, there are also some priority areas. It is like a sequence, one after the other. This is failing under the present governor of the state. The derelict state of secondary schools across the state are not encouraging, ditto for our healthcare system and others that should be subject to critical analysis.”Agbaje believes that Oyo state can have it better than the present state of things if capable hands are given the opportunity to run the economically prosperous state.`,
  },
  {
    id: 3,
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
    img: profilepics,
    heading:
      "Chief Bisi Akande, A Pillar Of Progressivism, Agbaje Congratulates Chief Bisi Akande On His 86th Birthday",
    paragraph: `
        Barr. Akeem Agbaje, a chieftain of the All Progressives Congress (APC) in Oyo State, has extended warm congratulations to Chief Bisi Akande, the national leader, first National Chairman of the APC and former Governor of Osun State, on the occasion of his 86th birthday. In a statement issued by his media office, Agbaje described Chief Bisi Akande as a courageous and principled leader whose life and career have been dedicated to the service of the nation and the promotion of progressive ideals.“Baba Akande is a pillar of the progressive movement in Nigeria and an exemplary statesman whose unwavering commitment to good governance, true federalism, and public service has left an indelible mark on our nation’s history.“On behalf of ALLAH, I congratulate Baba Akande on his 86th birthday. I pray that Almighty continues to bless him with good health, strength, and peace so that his invaluable knowledge and example can keep guiding us toward the Nigeria of our dreams.”`,
  },
  {
    id: 4,
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
    img: profilepics,
    heading:
      "Agbaje Urges Better Education And Healthcare For Children, Lauds Tinubu’s Government For Student Loan Scheme",
    paragraph: `
      A chieftain of the All Progressives Congress in Oyo State, Barrister Akeem Agbaje has urged government at all levels to take the education and healthcare of children as top priority. He gave the admonition in his message to commemorate the Children’s Day. “It is yet another Children’s Day celebration. While it is a time to celebrate our children, it is also time for us to reflect on how to make conscious effort to improve on things that matter to their development. The theme for this year’s children’s day makes the status of children clear. In our parlance, we call them the leaders of tomorrow and the only way we can ensure they are ready when tomorrow comes is by adequately preparing them. The investments we put in our future arw the ones we put in our children and I urge governments at all levels to prioritize the issues of education and health for children. We cannot desire a greater future and raise uneducated and unhealthy children. I laud the government of His Excellency, President Bola Ahmed Tinubu GCFR for the student loan scheme, it is one initiative that would go a long way in ensuring the younger generation enjoys quality education.”  `,
  },
  {
    id: 5,
    img: profilepics,
    heading: "Our Democracy Is Growing Not Perfect – Agbaje",
    paragraph:
      " A chieftain of the All Progressives Congress in Oyo State, Barrister Akeem Agbaje has congratulated the country on the occasion of yet another Democracy Day commemoration. He thanked former President Muhammadu Buhari for according the day the honor it truly deserves.“I want to congratulate President Bola Ahmed Tinubu GCFR and all Nigerians on the occasion of the Democracy Day celebration. Indeed it is worth commemorating and it is noteworthy to applaud our former President Muhammadu Buhari GCFR for giving the day the honour it truly deserves. The democracy we enjoy today is just an effect and an offshoot of the event of 31 years ago. The significance of this day in our polity, politics and national life cannot be overemphasized. For the struggle, many lost their lives including Chief M.K.O. Abiola who remains the biggest hero; many got displaced, suffered unjust incarceration and went into exile. Through concerted efforts and a dogged spirit, today we have the civilian rule we all craved for.”The APC chieftain urged Nigerians to see light at the end of the tunnel instead of gloom and doom in the face of current challenges. “I want to urge Nigerians not to give up on the nation or our nascent democracy. I know it is sounds a bit awkward to describe a democracy that has lasted for 25 years as young but the reality is that it is still nascent. Our democracy is still very young when compared with countries like America, France even South Africa. The good thing is we are growing and evolving, and would soon outgrow our baby steps and start making giant strides. Our democracy might not be perfect but it is growing and thriving with each electoral cycle. My advice to Nigerians is to embrace this democracy as there is no government like one that allows everyone a freedom of choice and we must not allow our differences and desperacy for power to forment trouble. We have only one task and it is to grow our democracy ",
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
  },
  {
    id: 6,
    img: profilepics,
    heading:
      "We Owe Them An Eternal Debt Of Gratitude, Agbaje Hails Armed Forces",
    paragraph:
      "Chieftain of the All Progressives Congress in Oyo State, Barrister Akeem Agbaje has hailed the indefatigable impact of the members of the Nigerian Armed Forces on the peace and unity of the country. He made this known as part of his message to commemorate the 2025 Armed Forces’ Remembrance Day. “Today, we remember and celebrate the yeoman’s efforts of our Armed Forces in ensuring the continued peace and unity of the country. In the face of daunting security challenges that have bedevilled Nigeria, our armed forces have remained gallant, courageous, resilient and determined in ensuring the country stays peaceful and united. In the war against terrorism, they have been unrelenting, decimating the terror ranks. The fight to defend Nigeria has not been a walk in the park as it has come at a huge cost with some of our gallant soldiers paying the supreme price. Today, we celebrate them all. We remember our fallen heroes, our arms of comfort around our wounded soldiers and our salutes to our gallant men that have ensured our flag as a nation is still standing and as a people, we can enjoy peace, progress and pursue prosperity.As the saying goes, “if you see a soldier, greet a soldier”, I want to urge us all to celebrate our gallant men and honor their memory. To our gallant men, you are our heroes, we commend your resilient aggression against terrorism and insecurity in the country. As a people, we support and cheer you on even as you match towards total victory which would make Nigeria a peaceful and secured territory for all.”",
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
  },
  {
    id: 7,
    img: profilepics,
    heading:
      "Teachers’ Day 2024: Agbaje Hails Teachers, Labels Them Builders Of The Future",
    paragraph:
      " Chieftain of the All Progressives Congress in Oyo State, Barrister Akeem Agbaje has congratulated teachers in the state on the commemoration of the Teachers’ Day. In his message to teachers released by his media office, he described teachers as architects and builders of the future.“I congratulate teachers across the state on the commemoration of the teachers’ day. It is a day to appreciate and celebrate the contributions of teachers to nation building. They are not just the hands that rock the cradle, they are also the hands that build the future by shaping the minds of children that are the leaders of tomorrow . The All Progressives Congress chieftain urged that the voices, opinions and suggestions of teachers should be valued and critically considered. “In line with the theme of this year’s celebration, “Valuing teachers’ voices: towards a new social contract for education”, I want to urge that the yearnings of teachers be listened to, because it paves way for a better life, living conditions and reward system for teachers which in turn would create a better working and learning environment for teachers and children.”",
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
  },
  {
    id: 8,
    img: profilepics,
    heading:
      "Abiola Ajimobi Technical University, A Fitting Honor Of Ajimobi’s Enduring Legacy – Agbaje",
    paragraph:
      "Chieftain of the All Progressives Congress in Oyo State, Barrister Akeem Agbaje has hailed the renaming of the First Technical University, Ibadan to Abiola Ajimobi Technical University. In a statement released by his media office, Barrister Agbaje described the decision taken by the Oyo State government as laudable and well thought out. “I must applaud the Governor Seyi Makinde-led government of Oyo State for the laudable move of honoring the memory and educational legacy of late two term governor of Oyo State, Sen. Abiola Ajimobi, with the renaming of the First Technical University, Ibadan. The school which is the not only the very first in Nigeria but also in Africa is the novel idea of Sen. Abiola Ajimobi. It was in his quest to ensure youths were properly rooted in technical education and some unconventional courses that were not even available in Nigerian universities.It was his dream to halt capital flight to other countries by bringing high quality technical education to the doorstep of Nigerians and Ibadan people. Today, his dream is a beautiful reality for us all to savor. Sen. Abiola Ajimobi’s legacy in education continues to shine and the signing into law of the name change of the Technical University is a testament to that enduring legacy.”",
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
  },
  {
    id: 9,
    img: profilepics,
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
    heading: "Ash Wednesday: Agbaje Urges Prayer, Interfaith Unity",
    paragraph: `
      Barr. Akeem Agbaje, a chieftain of the All Progressives Congress (APC) in Oyo State, has extended his goodwill to the Christian community as they begin the sacred season of Lent today, Ash Wednesday.\nIn a statement issued on Wednesday, Agbaje emphasized the significance of the Lenten period as a time for reflection, sacrifice, and spiritual renewal. He urged Christians to use the season to pray for Oyo State and Nigeria, especially as Lent coincides with the Islamic holy month of Ramadan this year.“This year’s observance of Lent and Ramadan presents a unique opportunity for deeper interfaith understanding and unity. As Christians embark on this sacred journey of fasting, prayer, and almsgiving, I encourage all faithful to also pray for the peace, progress, and prosperity of our state and nation,” Agbaje said.\n He further called on both Christians and Muslims to use this period of devotion to promote harmony, mutual respect, and acts of kindness within their communities.“Faith should serve as a bridge that unites us, fostering a society built on love, compassion, and collective responsibility,” he added.`,
  },

  {
    id: 10,
    img: profilepics,
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
    heading:
      "Int’l Women’s Day: Agbaje Advocates for Empowerment and Rights’ Protection for Women ",
    paragraph:
      "Chieftain of the All Progressives’ Congress in Oyo State, Barrister Akeem Agbaje has advocated the rights of women in a bid to ensure their empowerment and continued growth. In the statement by his media aide in celebration of the International Women’s Day, barr Agbaje described women as a vital part of the society while recognizing the crucial role they play in nation building.\n\n “Today, I join in the celebration of the International Women’s Day. Women play a crucial role in building the nation and it is our duty to ensure their empowerment and protection of their rights. It is heartwarming to see women rise like a phoenix through the ashes and shattering the glass ceiling. As a people, we must ensure the rights of women are protected and this starts from the rights of the girl child. We should abolish genital mutilation, abuse and discourage early child marriage. In building a strong and virile nation, empowered women with protected rights and access to equal opportunities have a significant role to play.”",
  },
  {
    id: 11,
    img: profilepics,
    createdAt: "10 Oct 2024, 3:45pm",
    createdBy: "Ade John",
    classArm: "JSS 2B",
    category: ["Tech, Education"],
    heading:
      "APC chieftain Commiserates with Aleshinloye Market Traders over Inferno",
    paragraph: `
      Chieftain of the All Progressives’ Congress in Oyo State, Barrister Akeem Agbaje has commiserated with Alesinloye market traders over the fire incident that engulfed sections of the market yesterday. In the message released by his media aide, the APC chieftain lamented the loss of merchandize and properties worth millions of Naira. 

“I am deeply saddened by the fire inferno that gutted the Aleshinloye market. It is indeed unfortunate to see properties worth hundreds of millions of Naira destroyed. I urge the government to look into the remote and immediate causes of the fire incident and put in place structures to prevent a recurrence. It is pertinent to ensure fire fighting trucks are available at major markets across the state to forestall such unsavory incidents. 

In the wake of the incident, barr Agbaje urged the government to provide immediate relief support to the affected traders. 

“At this trying time, I want to urge the government to reach out to the affected traders by providing succor to them through financial assistance and  speedy reconstruction of the destroyed section of the market so that economical activities would not be stifled. In the spirit of the holy month, I pray Almighty Allah would console the affected traders and restore all that was lost.”`,
  },
];
