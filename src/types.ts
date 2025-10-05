export interface CollegeData {
  CETCode: string;
  College: string;
  Location: string;
  Branch: string;
  '1G': string;
  '1K': string;
  '1R': string;
  '2AG': string;
  '2AK': string;
  '2AR': string;
  '2BG': string;
  '2BK': string;
  '2BR': string;
  '3AG': string;
  '3AK': string;
  '3AR': string;
  '3BG': string;
  '3BK': string;
  '3BR': string;
  'GM': string;
  'GMK': string;
  'GMR': string;
  'SCG': string;
  'SCK': string;
  'SCR': string;
  'STG': string;
  'STK': string;
  'STR': string;
}

export interface UserInput {
  rank: number;
  locations: string[];
  category: string;
  branches: string[];
}
export interface SeatMatrix {
  college_code: string;
  course_code: string;
  seats: number;
}