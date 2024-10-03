import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import Link from "next/link";

const ChatDisplay = () => {
  return (
    <Card className="w-[300px] h-[240px] overflow-hidden">
      <CardContent className="p-0">
        <Link href="/">
          <CardHeader className="flex items-center bg-emerald-100 p-0 ">
            <Image
              src="/image.png"
              width={250}
              height={50}
              alt="chat image"
              className="object-cover w-full"
            />
          </CardHeader>
          <CardFooter className="flex flex-col">
            <h1 className="w-full text-sm truncate">Chat name</h1>
            <CardDescription className="w-full">url</CardDescription>
          </CardFooter>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ChatDisplay;
