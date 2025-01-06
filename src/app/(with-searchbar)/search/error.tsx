// 에러 헨들링 담당 파일
// 클라이언트 컴포넌트로 지정하는 이유: 클라이언트 컴포넌트는 서버랑 클라이언트 둘 다 호출되므로 두 사이드에서 에러 확인이 가능하다.
"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
  }, [error]);

  return (
    <div>
      <h3>검색 과정에서 오류가 발생했습니다.</h3>
      <button
        onClick={() => {
          startTransition(() => {
            /**
             * router.refresh()는 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴.
             * *에러 상태가 초기화 되지는 않음.
             * **비동기로 동작함, 그러나 async ~ await 는 사용 불가
             * 사용하려면 startTransition을 사용해야한다.
             **/
            router.refresh();
            reset(); // error 상태를 초기화 하고, 컴포넌트를 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
