// AI generation is intentionally unavailable until the approved API connection is configured.
export async function POST(request:Request){
 if(request.headers.get("origin")!==new URL(request.url).origin)return Response.json({error:"허용되지 않은 요청입니다."},{status:403});
 const input=await request.json().catch(()=>null) as {idea?:unknown}|null;
 if(typeof input?.idea!=="string"||!input.idea.trim()||input.idea.length>2000)return Response.json({error:"키워드나 생각을 2,000자 이내로 입력해 주세요."},{status:400});
 return Response.json({error:"AI 연결 준비 중입니다. OpenAI Developers 플러그인 설치와 API 연결을 마치면 이 기능을 사용할 수 있어요. 지금은 ‘후보안 추가’로 직접 작성할 수 있습니다."},{status:503,headers:{"Cache-Control":"no-store"}});
}