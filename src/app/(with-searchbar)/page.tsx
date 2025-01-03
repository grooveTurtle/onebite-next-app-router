import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";

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

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
