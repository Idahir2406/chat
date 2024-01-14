import User from "models/User";
import { connectDB } from "Lib/mongoose";

connectDB();

export async function GET() {
  try {
    const users = await User.find();
    
    return Response.json(users);
  } catch (error) {
    console.log(error);
    return Response.json({ message: error });
  }
}
