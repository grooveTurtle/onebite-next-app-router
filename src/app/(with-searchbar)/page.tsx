import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";

// 특정 페이지의 유형을 강제로 static 또는 dynamic으로 지정할 수 있음
// *정말 특별한 상황이 아니면 그닥 사용을 권장하지 않음.
// ** 테스트 용도로 사용해볼 수도 있을 것 같음.
// 1. auto : 기본값, build 시점에 자동으로 결정
// 2. force-dynamic : 페이지를 강제로 dynamic으로 설정
// 3. force-static : 페이지를 강제로 static으로 설정 <- 실제 dynamic 페이지에 사용하면 기능이 제대로 동작하지 않을 수 있음.
// 4. error : 페이지를 강제로 static으로 설정 <- dynamic 함수 등, dynamic 페이지로 판단되는 요소가 있다면 error 발생시킴
// export const dynamic = "auto";

async function AllBooks() {
  // no-store는 cache를 skip 함
  // 기본값은 cache를 사용하지 않게 되어있음. (15버전부터 바뀐 내용)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    return <div>문제가 발생했습니다..</div>;
  }

  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  // forch cache는 cache를 무조건 이용함
  // 처음에는 캐시가 없을 것이기 때문에 서버로부터 받아와서 set하고,
  // 이후부터는 cache data를 이용한다.
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
  //   { cache: "force-cache" }
  // );

  // 특정 시간을 주기로 캐시를 업데이트함
  // page router의 ISR 방식과 유사함.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>문제가 발생했습니다..</div>;
  }

  // page router의 on demand revalidate와 유사함
  // 요청이 들어왔을 때, 데이터를 최신화 함
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
  //   { next: { tags: ["a"] } }
  // );

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// dynamic 페이지로의 강제 설정
// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "한입 북스",
  description: "한입 북스의 등록된 도서를 만나보세요",
  openGraph: {
    title: "한입 북스",
    description: "한입 북스의 등록된 도서를 만나보세요",
    images: ["/thumbnail.png"],
  },
};

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={3} />}> */}
        <RecoBooks />
        {/* </Suspense> */}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {/* <Suspense fallback={<BookListSkeleton count={10} />}> */}
        <AllBooks />
        {/* </Suspense> */}
      </section>
    </div>
  );
}
