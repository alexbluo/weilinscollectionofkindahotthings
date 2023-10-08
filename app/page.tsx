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
    <main className="h-screen w-screen">
      {!auth ? (
        <>
          <div>HAPPY BiTHRDAY :&#41;</div>
          <div>
            {/* <Image /> */}
            <h1>Weilin&apos;s Collection of Kinda Hot Things</h1>
          </div>

          <form className="" onSubmit={() => setAuth(true)}>
            <input
              className="border-2 border-black w-40 py-4 rounded-md px-4"
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
          <div>
            {data.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </>
      ) : (
        <>
          <input
            className="border-2 border-black w-40 py-4 rounded-md px-4"
            onChange={handlePasswordChange}
          />
        </>
      )}
    </main>
  );
}
