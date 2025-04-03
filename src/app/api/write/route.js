import { connectDB } from "../../utils/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    
    // 필수 필드 유효성 검사
    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "제목과 내용은 필수입니다" }, 
        { status: 400 }
      );
    }
    
    // 데이터베이스 연결
    const client = await connectDB;
    const db = client.db("board_next");
    
    // 현재 시간 추가
    const doc = {
      title: body.title,
      content: body.content,
      date: new Date()
    };
    
    // 데이터베이스에 저장
    const result = await db.collection("next").insertOne(doc);
    
    // 성공 응답
    return NextResponse.json({
      success: true,
      id: result.insertedId.toString(),
      message: "게시글이 저장되었습니다"
    }, { status: 201 });
    
  } catch (error) {
    console.error("API 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" }, 
      { status: 500 }
    );
  }
}





