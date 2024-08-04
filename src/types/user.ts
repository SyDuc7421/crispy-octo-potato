export type IUser = {
  id: string;
  name: string;
  email: string;
  photo?: string;
  enable?: boolean;
  verify?: boolean;
  subcribe?: boolean;
  role?: "user" | "admin";
  created_at: string;
  updated_at: string;
};
