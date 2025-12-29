export interface User {
  name: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  message: string;
  user: User;
  token: string;
}
