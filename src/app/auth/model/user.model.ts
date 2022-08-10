export class UserInfo{
    id: number;
    username: string;
    password?: string;
    role: string
  }

  export class UserSecurityDto{
    id?: number;
    name: string;
    securityQuestion: string;
    username?: string;
  }

  export class UserDto{
    name: string;
    encodedCredentials: string;
    role: string;
    securityQuestion: string;
    securityAnswer: string;
  }