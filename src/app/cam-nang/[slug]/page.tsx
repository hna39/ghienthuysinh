import { PageStub } from "@/components/page-stub";

export default async function Page(props: PageProps<"/cam-nang/[slug]">) {
  const { slug } = await props.params;
  return (
    <PageStub
      eyebrow="Cẩm nang"
      title="Bài cẩm nang"
      description="Một bài hướng dẫn chi tiết."
      detail={`/cam-nang/${slug}`}
      todo={["Nội dung dài có mục lục", "Bài liên quan"]}
    />
  );
}
