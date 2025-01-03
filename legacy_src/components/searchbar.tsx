"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // app router navigation

export default function Searchbar() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  };

  return (
    <div>
      <input onChange={onChangeSearch} value={search} />
      <button onClick={onSubmit}>검색</button>
    </div>
  );
}
