import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/effect/todo-api/todoApi";
import { Todo, TodoRequest } from "@/types/todo-list/type";

export const useTodoDetail = (id: number) => {
  const router = useRouter();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [memo, setMemo] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        setIsLoading(true);
        const data = await api.findOne(id);
        setTodo(data);
        setName(data.name);
        setMemo(data.memo ?? "");
        setImgUrl(data.imageUrl);
        setIsCompleted(data.isCompleted);
      } catch (err) {
        setError("할 일을 불러오는 데 실패했어요.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const onToggleCompletedClick = async () => {
    if (!todo) return;
    await api.isCompleted(todo.id, !isCompleted);
    setIsCompleted(!isCompleted);
  };

  const onImageClick = async (file: File) => {
    const filename = file.name;
    const isEnglish = /^[a-zA-Z0-9_\-.]+\.(jpg|jpeg|png|gif|svg|webp)$/i.test(
      filename
    );

    if (!isEnglish) {
      alert("이미지 파일명은 영어만 사용해주세요.");
      return;
    }

    const { url } = await api.uploadImage(file);
    setImgUrl(url);
  };

  const onEditClick = async () => {
    if (!todo) return;
    const request: TodoRequest = { name, memo, imageUrl: imgUrl, isCompleted };
    await api.updateOne(todo.id, request);
    router.push("/");
  };

  const onDeleteClick = async () => {
    if (!todo) return;
    await api.deleteOne(todo.id);
    router.push("/");
  };

  return {
    name,
    memo,
    imgUrl,
    isCompleted,
    isLoading,
    error,
    setName,
    setMemo,
    onImageClick,
    onEditClick,
    onDeleteClick,
    onToggleCompletedClick,
    todo,
  };
};
