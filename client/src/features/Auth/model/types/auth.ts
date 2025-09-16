export interface AuthResponse {
  token?: string;
  user?: User;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  login: string;
  managerId?: string | null;
}
