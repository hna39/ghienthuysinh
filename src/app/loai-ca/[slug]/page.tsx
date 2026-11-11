import { PageStub } from "@/components/page-stub";

export default async function Page(props: PageProps<"/loai-ca/[slug]">) {
  const { slug } = await props.params;
  return (
    <PageStub
      eyebrow="Thư viện kiến thức"
      title="Hồ sơ loài"
      description="Mọi thứ cần biết để nuôi một loài."
      detail={`/loai-ca/${slug}`}
      todo={["Tên Việt, tên khoa học, ảnh, độ khó", "Nhiệt độ, pH, độ cứng, bể tối thiểu, thức ăn, tính cách, sống chung", "Tin đăng loài này gần bạn, bài diễn đàn liên quan"]}
    />
  );
}
