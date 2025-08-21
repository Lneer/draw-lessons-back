export type IUser = {
  user_id?: string;
  user_name?: string;
  user_email: string;
  user_password: string;
  user_role?: string;
  is_active?: string;
  created_at?: Date;
  changed_at?: Date;
};
