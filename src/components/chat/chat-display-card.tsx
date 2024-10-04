import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Link from "next/link";

interface PageProps {
  name: string;
  imageUrl: string;
  url: string;
}

const ChatDisplay = ({ name, imageUrl, url }: PageProps) => {
  const correctedUrl = url.slice(0, -1) + "/" + url.slice(-1);
  return (
    <Card className="overflow-hidden border shadow-md">
      <CardContent className="p-0 w-[350px] h-[200px] flex flex-col">
        <Link href={`/dashboard/chat/${correctedUrl}`}>
          <CardHeader className="flex items-center bg-emerald-100 p-0 w-[350px] h-[160px] relative">
            <Image
              src={imageUrl}
              fill
              alt="chat image"
              className="object-cover border-b-2"
            />
          </CardHeader>
          <CardFooter className="text-center p-1">
            <h1 className="w-full text-lg truncate font-medium">{name}</h1>
          </CardFooter>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ChatDisplay;
