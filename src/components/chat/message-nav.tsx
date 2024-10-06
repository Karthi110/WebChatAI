import UrlDialog from "../url-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const MessageNav = ({ name }: { name: string }) => {
  return (
    <div className="h-14 flex items-center justify-between w-full border-b-2 rounded-b-sm px-4">
      <h1 className="font-semibold text-lg capitalize tracking-wide">{name}</h1>
      <div className="flex gap-x-2 md:hidden">
        <UrlDialog />
        <Button variant="destructive" size="iconSm">
          <Trash className="size-4" />
        </Button>
      </div>
      <div className="flex gap-x-2">
        <UrlDialog text="create new chat" />
        <Button variant="destructive" size="sm">
          <Trash className="size-4" />
          Delete chat.
        </Button>
      </div>
    </div>
  );
};

export default MessageNav;
