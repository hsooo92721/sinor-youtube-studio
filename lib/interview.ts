export type InterviewQuestion={q:string;intent:string;answer:string;followups?:string[];originalTitle?:string};
export type InterviewCandidate={description?:string;interviewNote?:string;sourceLabel?:string;outlineType?:"shorts";author?:string;id:string;title:string;long:string;questions:InterviewQuestion[];plan:string};
export function followupQuestions(q:InterviewQuestion){
 const existing=(q.followups||[]).map(s=>s.trim()).filter(Boolean);
 const defaults=['그렇게 생각하시게 된 계기나 현장에서 보신 상황이 있을까요?','말씀하신 내용을 조금 더 이해할 수 있게, 공개 가능한 사례로 설명해주실 수 있을까요?','비슷한 고민을 하는 시청자라면 먼저 무엇을 해보면 좋을까요?'];
 return [...existing,...defaults.slice(0,Math.max(0,3-existing.length))];
}
export function createInterviewDraft(c:InterviewCandidate){
 const blocks=c.questions.map((q,i)=>`질문 ${String(i+1).padStart(2,'0')}\nPD: “${q.q}”\n${q.intent?`[질문 의도] ${q.intent}\n`:''}\n[출연자 답변 메모]\n${q.answer||'본인의 생각·경험·공개 가능한 사례를 메모합니다. 실제 답변은 출연자가 준비합니다.'}\n\n${followupQuestions(q).map((f,j)=>`PD · 세부 질문 ${j+1}: “${f}”\n[출연자] 이 질문에 대한 생각이나 사례를 자연스럽게 이어갑니다.`).join('\n\n')}\n\n[PD 진행 메모] 답변에서 이미 다룬 세부 질문은 건너뜁니다. 이야기가 짧으면 다음 주제로 넘어가고, 구체적인 사례가 나오면 그 부분을 더 들어봅니다.`).join('\n\n────────────────────\n\n');
 return `촬영 기획안 · PD 대본\n${c.title}\n\n[작성자] ${c.author?.trim()||'미입력'}\n[롱폼 제목] ${c.long}\n\n[기획 의도]\n${c.description||'이 주제에 관심 있는 중장년 시청자의 고민을 실제 대화로 풀어봅니다.'}\n\n[촬영 방향]\n핵심 질문 ${c.questions.length}개는 촬영용 질문 풀입니다. 전부 사용하거나 전부 쇼츠로 제작할 필요는 없습니다.\n세부 질문은 질문마다 3개 이상 준비하되, 답변 흐름에 따라 골라 묻습니다.\n촬영 분량은 답변에 따라 조정하고, 편집할 때 전달력과 재미가 있는 구간을 고릅니다.\n\n[오프닝]\nPD: “오늘은 ‘${c.title}’에 대해 이야기 나눠보려고 해요. 비슷한 고민을 하는 분들이 편하게 참고하실 수 있도록, 현장에서 느끼신 점이나 경험을 들려주시면 좋겠습니다.”\n[출연자] 간단히 인사하고 오늘 주제와 관련된 생각을 나눕니다.\nPD: “그럼 가장 궁금한 이야기부터 여쭤볼게요.”\n\n[본론 · 핵심 질문과 세부 질문]\n${blocks}\n\n[마무리]\nPD: “오늘 이야기를 듣고 각자 생각나는 부분이 다를 것 같아요. 마지막으로, 지금 이 문제를 고민하는 분께 꼭 전하고 싶은 한마디가 있을까요?”\n[출연자] 본인의 생각으로 핵심을 정리합니다.\nPD: “오늘 함께 이야기 나눠주셔서 감사합니다. 보시는 분들도 어떤 부분이 가장 공감됐는지 댓글로 남겨주세요.”\n\n[촬영·편집 메모]\n- 출연자의 실제 답변을 미리 지어내지 않습니다.\n- 타인의 사례는 신원을 알아볼 수 없도록 준비합니다.\n- 질문별로 핵심 답변·구체적 사례·현장 반응을 표시해둡니다.\n- 쇼츠는 독립적으로 이해되는 이야기, 새로운 관점, 공감되는 표현이 있는 구간에서 선별합니다.\n- 설명이 짧거나 맥락이 필요한 답변은 쇼츠를 억지로 만들지 않습니다.\n- 전문적인 법률·재무 판단이 필요한 내용은 확인할 항목으로 남깁니다.`;
}
