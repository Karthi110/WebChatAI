import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import Link from "next/link";
import { Settings } from "lucide-react";

const ChatDisplay = () => {
  return (
    <Card className="overflow-hidden border shadow-md">
      <CardContent className="p-0 w-[350px] h-[200px] flex flex-col">
        <Link href="/">
          <CardHeader className="flex items-center bg-emerald-100 p-0 w-[350px] h-[140px] relative">
            <Image
              src="/image.png"
              fill
              alt="chat image"
              className="object-cover border-b-2"
            />
          </CardHeader>
          <CardFooter className="flex flex-col">
            <div className="w-full flex items-center justify-between py-0.5">
              <h1 className="w-full text-sm truncate">Chat name</h1>
              <Settings className="size-5" />
            </div>
            <CardDescription className="w-full">url</CardDescription>
          </CardFooter>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ChatDisplay;
