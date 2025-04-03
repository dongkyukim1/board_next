import { connectDB } from "../../utils/database";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 데이터베이스 연결
    const client = await connectDB;
    const db = client.db("board_next");
    
    // 게시글 목록 조회 (최신순)
    const posts = await db.collection("next")
      .find()
      .sort({ date: -1 })  // 최신순 정렬
      .toArray();
    
    // 응답
    return NextResponse.json(posts);
    
  } catch (error) {
    console.error("목록 조회 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" }, 
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ received: body });
  
} 