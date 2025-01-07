"use client";
import { createPortal } from "react-dom";
import style from "./modal.module.css";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  // #modal-root에 modal에 들어갈 children을 렌더링
  return createPortal(
    <dialog
      onClose={() => router.back()}
      onClick={(e) => {
        // 모달의 배경이 클릭되면 뒤로가기
        if ((e.target as any).nodeName === "DIALOG") {
          router.back();
        }
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement
  );
}
