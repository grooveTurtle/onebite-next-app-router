import { BookData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

// generateStaticParams에서 return 한 값 외의 dynamic하게 처리하는 여부
// false 일시, 1,2,3이외의 페이지는 404로 처리함.
// export const dynamicParams = false;

// page router의 getStaticPaths와 유사한 기능
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const p = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${p.id}`
  );
  if (!response.ok) {
    if (response.status == 404) {
      notFound();
    }
  }
  const book: BookData = await response.json();
  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
