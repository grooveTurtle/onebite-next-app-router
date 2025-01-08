import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>문제가 발생했습니다..</div>;
  }

  const searchBooks: BookData[] = await response.json();

  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// export const metadata: Metadata = {
//   title: "한입 북스: 검색어",
//   description : "~~~",
// };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  // 현재 페이지의 메타 데이터를 동적으로 생성하는 역할을 합니다.
  return {
    title: `${q} : 한입 북스 검색 결과`,
    description: `${q}에 대한 검색 결과`,
    openGraph: {
      title: `${q} : 한입 북스 검색 결과`,
      description: `${q}에 대한 검색 결과`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  const { q } = await searchParams;

  return (
    <Suspense key={q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
