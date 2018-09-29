export interface RegisterForm {
  username: string;
  password: string;
  repeatPassword: string;
}

export interface LoginForm {
  username: string;
  password: string;
  keepLogin: boolean;
}

export interface ForgetPasswordForm {
  username: string;
}

export class Pattern {
  public static password = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d].{8,}$';
}
