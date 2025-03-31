// TodoList는 할 일 목록을 나타냅니다.
export interface TodoList {
  id: number; // 목록의 고유 ID
  name: string; // 목록의 이름
  isCompleted: boolean; // 완료 여부
}

// Todo는 개별 할 일을 나타냅니다.
export interface Todo {
  id: number; // 고유 ID
  tenantId: string; // 테넌트 ID
  name: string; // 할 일 이름
  memo: string | null; // 선택적 메모
  imageUrl: string | null; // 선택적 이미지 URL
  isCompleted: boolean; // 완료 여부
}

// TodoRequest는 새 할 일을 생성할 때 사용되는 타입입니다.
export type TodoRequest = Omit<Todo, "id" | "tenantId">;
