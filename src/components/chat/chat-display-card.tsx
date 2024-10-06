import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import DeleteDialog from "../delete-dialog";

interface PageProps {
  name: string;
  imageUrl: string;
  url: string;
  chatId: string;
}

const ChatDisplay = ({ name, imageUrl, url, chatId }: PageProps) => {
  const correctedUrl = url.slice(0, -1) + "/" + url.slice(-1);

  return (
    <Card className="overflow-hidden border shadow-md bg-muted/30">
      <CardContent className="p-0 flex flex-col relative  group">
        <CardHeader className="flex items-center p-0">
          <Link href={`/dashboard/chat/${correctedUrl}`}>
            <Image
              src={imageUrl}
              width={1920}
              height={1080}
              quality={100}
              alt="chat image"
              className="object-contain"
            />
            <CardDescription className="px-1 py-2 text-sm md:text-lg capitalize font-medium truncate w-full text-center text-black">
              {name}
            </CardDescription>
          </Link>
          <div className="opacity-0 group-hover:opacity-100">
            <DeleteDialog chatId={chatId} />
          </div>
        </CardHeader>
      </CardContent>
    </Card>
  );
};

export default ChatDisplay;
