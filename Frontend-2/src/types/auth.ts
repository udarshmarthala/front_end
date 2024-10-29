export interface User {
  username: string;
  passwordHash: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}