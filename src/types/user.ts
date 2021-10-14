export interface User {
  id: string;
  name: string;
  email: string;
  activities_finished_today: number;
  all_activities_finished: number;
  quantity_of_activities: number;
  created_at: Date;
  updated_at: Date;
  hasAnswered?: boolean;
  emergency_number?: string;
  photo?: string
}
export interface RefreshToken {
  id: string;
  user_id: string;
  expires_in: number;
}