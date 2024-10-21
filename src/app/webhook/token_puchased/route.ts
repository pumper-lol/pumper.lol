export async function GET(req: Request) {
  console.log(await req.json());
  return Response.json({ message: "success" });
}

export async function POST(req: Request) {
  console.log(await req.json());
  return Response.json({ message: "success" });
}
