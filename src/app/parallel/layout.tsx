import Link from "next/link";

// @로 선언한 path의 컴포넌트가 자동으로 props에 전달됨.
export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  feed: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>parallel</Link>
        &nbsp;
        <Link href={"/parallel/setting"}>parallel/setting</Link>
      </div>
      {sidebar}
      {feed}
      {children}
    </div>
  );
}
