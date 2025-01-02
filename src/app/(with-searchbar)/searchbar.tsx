"use client";

import React, { useState } from "react";

export default function Searchbar() {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <input onChange={onChangeSearch} value={search} />
      <button>검색 </button>
    </div>
  );
}
