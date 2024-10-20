export async function GET(req: Request) {
  console.log(await req.json());
  return;
}

export async function POST(req: Request) {
  console.log(await req.json());
  return;
}
