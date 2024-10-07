import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import Link from "next/link";
import RemoveDialog from "../remove-dialog";

interface PageProps {
  name: string;
  imageUrl: string;
  chatId: string;
}

const ChatDisplay = ({ name, imageUrl, chatId }: PageProps) => {
  return (
    <Card className="overflow-hidden border shadow-md bg-muted/30 max-w-[350px] max-h-[200px]">
      <CardContent className="p-0 flex flex-col relative  group">
        <CardHeader className="flex items-center p-0">
          <Link href={`/dashboard/chat/${chatId}`}>
            <Image
              src={imageUrl}
              width={1920}
              height={1080}
              quality={100}
              alt="chat image"
              className="object-contain max-w-[300px] max-h-[180px]"
            />
            <CardDescription className="px-1 py-2 text-sm md:text-lg capitalize font-medium truncate w-full text-center text-black">
              {name}
            </CardDescription>
          </Link>
          <div className="opacity-0 group-hover:opacity-100">
            <RemoveDialog chatId={chatId} isIcon={true} />
          </div>
        </CardHeader>
      </CardContent>
    </Card>
  );
};

export default ChatDisplay;
