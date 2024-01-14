export const dynamic = "force-dynamic";
import NextAuth from "next-auth";

import { connectDB } from "Lib/mongoose";
import { authOptions } from "Lib/authOptions";
connectDB();

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
