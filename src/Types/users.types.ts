export type Gender = "MALE" | "FEMALE";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

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

export interface AuthResponse {
  user: User;
  tokens: Tokens;
}
export interface UserCredintials {
  email: string;
  password: string;
}

export type SignUpUserPayload = Omit<User, "id" | "joinDate"> & {
  password: string;
};
export type EditUserPayload = Partial<
  Omit<User, "id" | "joinDate" | "profilePicture" | "isAdmin"> & {
    password: string;
  }
>;
