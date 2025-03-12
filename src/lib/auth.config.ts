import axios from 'axios';
import { AuthOptions } from 'next-auth';

import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60 // 7 hari
  },
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text'
        },
        password: {
          label: 'password',
          type: 'password'
        }
      },
      async authorize(credentials, req): Promise<any> {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('No input found');
          }

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-login`,
            {
              username: credentials?.username,
              password: credentials?.password
            },
            { withCredentials: true }
          );
          console.log({ response: response?.data });
          if (response?.data?.data) {
            return {
              ...response?.data?.data,
              name: response?.data?.data.full_name,
              username: response?.data?.data.username,
              accessToken: response?.data?.access_token,
              refreshToken: response?.data?.refresh_token,
              accessTokenExpires: Date.now() + 1 * 60 * 1000,
              role: response?.data?.data.role
            };
          }

          throw new Error('Invalid login credentials');
        } catch (error: any) {
          console.error('Login Error:', error.response?.data || error.message);

          throw new Error(
            error.response?.data?.message || 'Authentication failed'
          );
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
    newUser: '/register'
  },

  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      // the token object is passed done to the session call back for persistence
      if (user) {
        token.accessToken = user.accessToken;
        token.username = user.username;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user?.accessTokenExpires;
        token.role = user.role;
      }

      if (trigger === 'update') {
        token.companyId = session.companyId;
      }
      console.log(Date.now() > token.accessTokenExpires);
      // Cek apakah token sudah expired
      if (Date.now() > token.accessTokenExpires) {
        try {
          console.log({ token });
          console.log('🔄 Refreshing access token...');
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth-refresh`,
            {
              headers: {
                Authorization: `Bearer ${token.refreshToken}`
              }
            } // ⬅️ Kirim refreshToken ke server
          );

          if (res.data.refresh_token) {
            console.log('✅ Access token refreshed!');
            return {
              ...token,
              accessToken: res.data.access_token,
              accessTokenExpires: Date.now() + 1 * 60 * 1000 // 60 menit
            };
          }
        } catch (error: any) {
          console.error('❌ Refresh token failed:', error?.data?.message);
          console.log(error);
        }

        // Jika refresh gagal, hapus token agar user logout
        return { ...token, token: null, refreshToken: null };
      }

      return token;
    },
    async session({ session, token }) {
      session.user = token as any;
      // console.log({ session, token });

      return session;
    }
  },
  theme: {
    colorScheme: 'auto' // "auto" | "dark" | "light"
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      console.error(code, metadata);
    },
    warn(code) {
      console.warn(code);
    },
    debug(code, metadata) {
      console.debug(code, metadata);
    }
  }
};

export default authOptions;
