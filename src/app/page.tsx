"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const router = useRouter();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/dashboard/chat/${url}`);
  };
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-5xl font-semibold">Enter website url</h1>
      <form onSubmit={handleSubmit} className="w-1/2 flex items-center gap-2">
        <Input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          type="url"
        />
        <Button type="submit">Get started</Button>
      </form>
      <Image
        src="https://ui.shadcn.com/og.jpg"
        width={500}
        height={500}
        alt="chat image"
      />
    </div>
  );
}
