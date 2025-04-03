import { connectDB } from "../../utils/database";

export async function GET(request) {
  try {
    const db = (await connectDB).db("board_next");
    const posts = await db.collection("next").find().toArray();
    return Response.json(posts);
  } catch (error) {
    console.error("데이터베이스 연결 오류:", error);
    return Response.json({ error: "데이터베이스 연결 실패" }, { status: 500 });
  }
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ received: body });
  
} 