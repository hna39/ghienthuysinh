import { PageStub } from "@/components/page-stub";

export default async function Page(props: PageProps<"/dien-dan/[category]">) {
  const { category } = await props.params;
  return (
    <PageStub
      eyebrow="Diễn đàn"
      title="Chuyên mục"
      description="Các bài viết trong một chuyên mục."
      detail={`/dien-dan/${category}`}
      todo={["Danh sách bài, bài ghim", "Lọc loại bài: Thảo luận / Hỏi đáp / Khoe bể"]}
    />
  );
}
