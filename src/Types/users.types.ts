export interface User {
  name: string;
  username: string;
  email: string;
  image: string;
  role: string;
  id: number;
}

export interface UserCredintials {
  email: string;
  password: string;
}

export interface SignUpUser {
  user: Omit<User, "id" | "image" | "role">;
  password: string;
}
