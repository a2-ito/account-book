import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
		}),
	],
  callbacks: {
    async redirect({ url }) {
      return url;
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        // サインイン時のみ実行
        return {
          ...token,
          access_token: account.access_token,
          id_token: account.id_token || null,
        };
      }

      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        access_token: token.access_token,
        id_token: token.id_token,
      };
    },
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
  },
};
