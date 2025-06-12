import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Username: {},
        Password: {},
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "http://localhost:4000/api/v1/auth/login",
            {
              Username: credentials?.Username,
              Password: credentials?.Password,
            }
          );

          const user = response.data;
          // node
          // if (user) return user;

          // nest
          if (user?.accesToken) {
            return {
              ...user.userTokenData,
              accessToken: user.accesToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Error en la autorización:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // nest
      if (user) {
        token.accessToken = user.token;
      }

      // para nest y node
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // node
      session.user = token as any;
      // nest
      session.user.token = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/(full-width-pages)/(auth)",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
