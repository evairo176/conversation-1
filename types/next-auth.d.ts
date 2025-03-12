import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  type UserSession = DefaultSession['user'];
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      imageUrl: string;
      role: {
        code: string;
        name: string;
        permissions: string[];
      };
      session_expiry?: string;
      token: string;
      refreshToken: string;
      iat: number;
      exp: number;
      expired_token: number;
      businessTypeCode: string;
      company: Company;
      accessTokenExpires: number;
      companyId: string;
      image: string;
      accessToken: string;
    };
  }

  interface CredentialsInputs {
    email: string;
    password: string;
  }
}
