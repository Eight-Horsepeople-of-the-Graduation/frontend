export type Gender = "MALE" | "FEMALE";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  country: string;
  gender: Gender;
  birthDate: string;
  joinDate: string;
  profilePicture?: string;
  isAdmin: boolean;
}

export interface UserCredintials {
  email: string;
  password: string;
}

export interface SignUpUser {
  user: Omit<User, "id" | "joinDate">;
  password: string;
}
