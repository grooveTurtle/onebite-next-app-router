// 파일 분리했을 때, use server를 최상단에 선언해준다.
"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (!reviewId) {
    return {
      status: false,
      error: "삭제할 리뷰 ID가 없습니다.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

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
      error: `리뷰 삭제에 실패 했습니다: ${err}`,
    };
  }
}
