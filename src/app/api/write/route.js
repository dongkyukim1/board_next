import { connectDB } from "../../utils/database";

export async function POST(request) {
  try {
    // 요청 본문에서 데이터 추출
    const body = await request.json();
    
    // 필수 데이터 확인
    if (!body.title || !body.content) {
      return Response.json({ error: "제목과 내용은 필수입니다." }, { status: 400 });
    }
    
    // 현재 시간 (한국 시간)
    const date = new Date();
    
    // 데이터베이스에 저장할 문서
    const doc = {
      title: body.title,
      content: body.content,
      date: date
    };
    
    // 데이터베이스 연결 및 저장
    const db = (await connectDB).db("board_next");
    const result = await db.collection("next").insertOne(doc);
    
    // 결과 반환
    return Response.json({ 
      success: true, 
      id: result.insertedId.toString(),
      message: "글이 성공적으로 저장되었습니다." 
    }, { status: 201 });
    
  } catch (error) {
    console.error("글 저장 오류:", error);
    return Response.json({ error: "글 저장에 실패했습니다." }, { status: 500 });
  }
}





