import { Header } from "@/components/organisms/header";
import { TodoDetail } from "@/components/organisms/todo-detail";

export default async function TodoDetailPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <>
      <Header />
      <TodoDetail id={id} />
    </>
  );
}
