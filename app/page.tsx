"use client";

import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState<string>("");
  const [auth, setAuth] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch("/api/get")
        .then((res) => res.json())
        .then(({ data }) => setData(data));
    };

    fetchData();
  }, []);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== process.env.NEXT_PUBLIC_PASSWORD) return;

    setAuth(false);

    fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ item: input }),
    })
      .then((res) => res.json())
      .then(({ data }) => setData(data));
  };

  return (
    <main className="min-h-screen w-screen">
      {!auth ? (
        <div className="flex h-full w-full flex-col gap-12 items-center justify-center">
          <div className="text-7xl font-bold">HAPPY BiTHRDAY :&#41;</div>
          <div className="flex items-center justify-center flex-col">
            <Image src="/whale.png" alt="whale" width={400} height={400} />
            <h1 className="text-7xl font-bold text-center">
              Weilin&apos;s Collection of Kinda Hot Things
            </h1>
          </div>

          <form className="" onSubmit={() => setAuth(true)}>
            <input
              className="border-2 border-black w-54 py-4 rounded-md px-4"
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <div className="text-xl h-64 overflow-y-scroll font-bold text-center animate-text">
            {data.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full gap-16">
          <h2 className="text-8xl font-bold">PASSWORD?</h2>
          <input
            className="border-2 border-black w-54 py-4 rounded-md px-4"
            onChange={handlePasswordChange}
          />
        </div>
      )}
    </main>
  );
}
