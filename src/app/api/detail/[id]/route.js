import { connectDB } from "../../../utils/database";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function GET(request, { params }) {
  try {
    // 파라미터에서 ID 가져오기
    const id = params.id;
    
    // ID 유효성 검사
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "유효하지 않은 ID 형식입니다" }, 
        { status: 400 }
      );
    }
    
    // 데이터베이스 연결
    const client = await connectDB;
    const db = client.db("board_next");
    
    // 게시글 조회
    const post = await db.collection("next").findOne({ 
      _id: new ObjectId(id) 
    });
    
    // 게시글이 없는 경우
    if (!post) {
      return NextResponse.json(
        { error: "해당 게시글을 찾을 수 없습니다" }, 
        { status: 404 }
      );
    }
    
    // 성공 응답
    return NextResponse.json(post);
    
  } catch (error) {
    console.error("상세 조회 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" }, 
      { status: 500 }
    );
  }
} 