export interface ClassLevel {
  id: string;
  school_id: number;
  name: string;
  created_at: Date;
}

export interface CreateClassArm {
  message: string;
  classLevelId: string;
  armName: string;
}

export interface ClassArm {
  id: string;
  school_id: number;
  class_level_id: string;
  name: string;
  createdAt: Date;
}

export interface SchoolTerm {
  id: number;
  school_id: number;
  name: string;
  is_current: boolean;
}

export interface Session {
  id: number;
  school_id: number;
  session_name: string;
}

export interface StudentFormData {
  admission_number: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  address: string;
  state_of_origin: string;
  lga: string;
  nationality: string;
  religion: string;
  guardian_name: string;
  guardian_phone: string;
  guardian_email: string;
  guardian_address: string;
  guardian_relationship: string;
  admission_date: string;
  passport_url: string;
  is_active: boolean;
  class_arm_id: string;
}
