export type NavPath =
  | 'dashboard'
  | 'calendar'
  | 'ai-docs'
  | 'ai-chat'
  | 'resources'
  | 'analytics'
  | 'users'
  | 'settings'
  | 'login';

export type InstitutionCategory = 'main' | 'kinder' | 'childcare';

export interface Institution {
  id: string;
  name: string;
  type: '교육청' | '공립유치원' | '사립유치원' | '국공립어린이집' | '민간어린이집';
  code: string;
  director: string;
  phone: string;
  address: string;
  classesCount: number;
  childrenCount: number;
  staffCount: number;
  integrationStatus: '선도기관' | '시범운영' | '준비기관' | '완료';
  completionRate: number;
}

export type TaskCategory = 'education_office' | 'institution_unique' | 'deadline' | 'training';
export type TaskPriority = 'urgent' | 'high' | 'normal';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface AdminTask {
  id: string;
  title: string;
  institutionId: string;
  institutionName: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: string;
  dueDate: string; // YYYY-MM-DD
  time?: string;
  dDay: string;
  description: string;
  aiSuggestedAction?: string;
  complianceChecked?: boolean;
}

export type DocType =
  | '가정통신문'
  | '학부모 안내문'
  | '공문 초안'
  | '업무보고서'
  | '체험학습 계획서'
  | '맞춤형 기안서';

export interface GeneratedDocument {
  docType: DocType;
  docNumber: string;
  publicType: string;
  title: string;
  subtitle?: string;
  greeting: string;
  sections: {
    number: string;
    title: string;
    items: string[];
    highlightBox?: {
      type: 'warning' | 'success' | 'info';
      title: string;
      desc: string;
    };
  }[];
  date: string;
  issuerInstitution: string;
  issuerTitle: string;
  stampText: string;
  contactDepartment: string;
  contactTel: string;
  complianceNotes: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  referenceLaw?: string[];
}

export interface ResourceDocument {
  id: string;
  title: string;
  category: '규정·지침' | '공문서식' | '회계·정산' | '보건·안전' | '교육과정';
  targetOrg: '공통' | '유치원' | '어린이집';
  fileFormat: 'HWPX' | 'PDF' | 'DOCX' | 'XLSX';
  fileSize: string;
  uploadDate: string;
  downloads: number;
  aiSummary: string;
  isOfficial: boolean;
}
