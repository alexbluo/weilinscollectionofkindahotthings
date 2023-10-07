"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  // const data = fetch(`${process.env.KV_REST_API_URL}`);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/get")
        .then((res) => res.json())
        .then(({ data }) => setData(data));
    };

    fetchData();
  }, []);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ item: input }),
    })
      .then((res) => res.json())
      .then(({ data }) => setData(data));
  };

  return (
    <main className="h-screen w-screen">
      {password === process.env.NEXT_PUBLIC_PASSWORD ? (
        <>
          <div>HAPPY BiTHRDAY :&#41;</div>
          <div>
            {/* <Image /> */}
            <h1>Weilin&apos;s Collection of Kinda Hot Things</h1>
          </div>

          <form className="" onSubmit={handleSubmit}>
            <input onChange={(e) => setInput(e.target.value)} />
          </form>
        </>
      ) : (
        <>
          <input
            className="border-2 border-black w-40 py-4 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
        </>
      )}
    </main>
  );
}
