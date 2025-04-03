export async function GET(request) {
  // 한국 시간으로 변환 (UTC+9)
  const koreaTime = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  
  return Response.json({ 
    time: koreaTime,
    utc: new Date().toISOString(),
    timezone: "Asia/Seoul (KST, UTC+9)"
  });
}

