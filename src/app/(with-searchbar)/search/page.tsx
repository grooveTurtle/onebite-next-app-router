// 컴포넌트에 props로 params가 전달이 됨.
// 서버 측에서 한 번만 실행이 되는 서버 컴포넌트이므로 비동기 사용이 가능.
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return <div>Search Page : {q}</div>;
}
