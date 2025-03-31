# Todo List

기존의 Todo-List를 업그레이드하여 디자인적으로 강화된 Todo 관리를 제공합니다.

---

## 목차

1. [소개]
2. [기능]
3. [설치]
4. [사용법]
5. [라이선스]

---

## 소개

> 이 프로젝트는 Next.js, TailwindCSS를 사용하여 구축된 작업 관리 도구입니다. 개인이 프로젝트를 효율적으로 조직하고 우선순위를 설정할 수 있도록 돕습니다.

---

## 기능

- Todo의 생성, 읽기, 수정, 삭제 (CRUD)
- 모바일 및 데스크탑에서 반응형 UI 제공

---

## 설치

### 1. 리포지토리 클론

```bash
git clone https://github.com/smd995/todo-list.git

```

### 2. 의존성 설치

```bash
cd todo-list
npm install

```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 필요한 변수를 추가합니다:

```bash

API_URL=https://assignment-todolist-api.vercel.app/api
TENANT_ID=your tenent id

NEXT_PUBLIC_API_URL=https://assignment-todolist-api.vercel.app/api
NEXT_PUBLIC_TENANT_ID=your tenent id

```

### 4. 개발 서버 실행

```bash

npm run dev

```

### 5. 애플리케이션 실행

브라우저에서 애플리케이션을 확인하려면:

```bash

http://localhost:3000

```

---

## 사용법

1. "/"에서 할 일을 추가합니다.
2. "/"에서 진행 상태를 변경할 수 있습니다.
3. 할 일 목록을 눌러 상세페이지로 이동할 수 있습니다.
4. 상세페이지에서 완료 여부, 제목, 이미지 추가, 메모를 수정할 수 있습니다.
5. 상세페이지에서 할일을 삭제할 수 있습니다다.

---

---

## 라이선스

MIT
