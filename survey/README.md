# Supabase

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

## 실행

```bash
cd survey
npm install
npm run dev
```

브라우저에서 http://localhost:3000 으로 접속합니다.

## Supabase 설정

`responses` 테이블에 아래 컬럼이 있어야 합니다.

- `id` (uuid, primary key)
- `created_at` (timestamptz)
- `customer_answers` (jsonb)
- `feedback_answers` (jsonb)

익명 insert를 허용하려면 RLS 정책을 추가하세요.

```sql
alter table responses enable row level security;

create policy "Allow anonymous insert"
  on responses for insert
  to anon
  with check (true);
```

`.env.local`에 Supabase 프로젝트 URL과 anon key를 설정하세요.
