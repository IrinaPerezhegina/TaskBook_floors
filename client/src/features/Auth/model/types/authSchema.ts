import { User } from "./auth";

export interface AuthSchema {
  user: User | undefined;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  middleName: string;
  managerId?: number | null;
  token: string | undefined;
  status: "idle" | "loading" | "failed";
  error: string | undefined;
  loading: boolean;
  loadingLogin: boolean;
  loadingRegister: boolean;
  errorRegister: string | undefined;
  errorLogin: string | undefined;
}
