# 시놀 유튜브 작업실

주제 선정 → 기획안 → 질문·답변 → 촬영 체크를 준비하는 비공개 웹 작업실입니다.

## 기능

- 촬영 예정일 지정 또는 미정
- 후보안 직접 추가·수정·보관, X를 통한 삭제 확인
- 후보 선택 시 질문을 기반으로 기본 기획안 초안 구성
- 후보마다 기획안·출연자 답변 별도 보관
- 캡처 보기, 서버 저장, 저장 충돌 확인

## AI 생성 상태

키워드 입력 화면은 준비되었지만 AI 후보 생성은 아직 활성화되지 않았습니다.
`/api/generate`는 연결 대기 안내(503)를 반환하며 AI 출력을 흉내 내지 않습니다.
OpenAI Developers 플러그인을 통한 승인된 API 연결과 서버 비밀키 설정 후 실제 생성 경로를 구현·검증해야 합니다.
현재 선택 시 생성하는 기획안은 AI가 아닌 후보 질문 기반의 기본 초안입니다.

## 실행

Node.js 22.13 이상이 필요합니다.

```sh
npm ci
npm run dev
```

```sh
npx tsc --noEmit
npm run build
```

Cloudflare D1의 `DB` 바인딩과 `drizzle/`의 마이그레이션을 사용합니다.
로컬 DB 초기화는 빌드 후 다음 명령으로 수행합니다.

```sh
node --import ./scripts/sites-env.mjs ./node_modules/wrangler/bin/wrangler.js d1 execute DB --local --config dist/server/wrangler.json --persist-to .wrangler/state --file drizzle/0000_past_human_robot.sql
```

## 배포 및 데이터

`.openai/hosting.json`은 기존 Sites 프로젝트의 배포 설정입니다.
GitHub는 소스를 보관하며, 사이트의 실제 후보안·기획안 데이터는 서버 DB에 저장됩니다.
GitHub에 푸시하는 것만으로 사이트가 자동 배포되지는 않습니다.
API 키, 로컬 DB, 빌드 산출물과 실행 상태는 Git에 포함하지 않습니다.
