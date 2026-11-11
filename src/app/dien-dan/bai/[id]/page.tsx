import { PageStub } from "@/components/page-stub";

export default async function Page(props: PageProps<"/dien-dan/bai/[id]">) {
  const { id } = await props.params;
  return (
    <PageStub
      eyebrow="Diễn đàn"
      title="Bài viết"
      description="Nội dung bài và các trả lời."
      detail={`/dien-dan/bai/${id}`}
      todo={["Nội dung + ảnh, thẻ", "Bình luận & trả lời, thả tim", "Đánh dấu câu trả lời hay nhất", "Báo cáo vi phạm"]}
    />
  );
}
