import User from 'models/User';

export async function GET() {
  const users = await User.find();
  return Response.json(users);
}