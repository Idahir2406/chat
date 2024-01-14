import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "models/User";

export const authOptions:NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process?.env?.GOOGLE_ID as string,
      clientSecret: process?.env?.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn(user:any) {
      const existingUser = await User.findOne({ email: user.user.email });
      if (existingUser) {
        return true;
      } else {
        await User.create({
          username: user?.profile?.name,
          email: user?.user?.email,
          image: user?.profile?.image,
        });
      }
      return true;
    },
    async jwt({ token, user   }:{
      token: any,
      user: any
    }) {
      if (user) token.user = user;

      const userFinded = await User.findOne({ email: token.email });
      token.user = {
        _id : userFinded._id,
        email: userFinded.email,
        name: userFinded.username,
        image: userFinded.image,
      };
      return token;
    },
    async session({ session, token }:any) {
      session.user = token.user;
      return session;
    },
  },
};