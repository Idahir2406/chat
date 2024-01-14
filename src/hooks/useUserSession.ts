import { getServerSession } from "next-auth/next";
import { authOptions } from "Lib/authOptions";
export const useUserSession = async() => {
  const session = await getServerSession(authOptions);
  return session;
}