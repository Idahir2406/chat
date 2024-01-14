import User from "models/User";
export async function GET(
  request: Request,
  { params }: { params: { receiverId: string } }
) {
  const user = await User.findById(params.receiverId);
  return Response.json(user);
}
