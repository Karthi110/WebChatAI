import UrlDialog from "../url-dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

const MessageNav = ({ name }: { name: string }) => {
  return (
    <div className="h-9 flex items-center justify-between w-full border-b">
      <h1 className="font-semibold text-base tracking-tight">{name}</h1>
      <div className="flex gap-x-2">
        <UrlDialog />
        <Button variant="destructive" size="iconSm">
          <Trash className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default MessageNav;
