// 파일 분리했을 때, use server를 최상단에 선언해준다.
"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // 서버 컴포넌트에서만 사용가능
    // 이 페이지에 포함된 모든 캐시(데이터 캐시는 물론 풀라우터 캐시)까지 무효화(Purge) 해버림. (***새롭게 생성하지 않음!!***)
    // 고로 무효화된(삭제된) 캐시라고 판단하여 사용하지 않고, 페이지 갱신시 dynamic 페이지처럼 재생성함
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 "모든" 동적 페이지를 재검증
    // revalidatePath(`/book/[id]`, "page");

    // 3. 특정 레이아웃을 갖는 모든 페이지 재검증
    // searchbar 레이아웃을 포함한 모든 페이지 재검증
    // revalidatePath(`/(with-searchbar)`, "layout");

    // 4. 모든 데이터를 재검증 (=root 레이아웃은 모든 페이지가 가지고 있으므로)
    // revalidatePath("/", "layout");

    // 5. 태그 기준으로 데이터 캐시를 재검증
    // 이러한 tag 값을 갖는 fetch가 모두 재검증 됨.
    revalidateTag(`review-${bookId}`);

    return {
      status: true,
      error: "",
    };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 저장에 실패 했습니다: ${err}`,
    };
  }
}
