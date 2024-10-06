import UrlDialog from "../url-dialog";
import DeleteDialog from "../delete-dialog";

const MessageNav = ({ name, chatId }: { name: string; chatId: string }) => {
  return (
    <div className="h-14 flex items-center justify-between w-full border-b-2 rounded-b-sm px-4">
      <h1 className="font-semibold text-lg capitalize tracking-wide">{name}</h1>
      <div className="flex gap-x-2 md:hidden">
        <UrlDialog />
        <DeleteDialog chatId={chatId} />
      </div>
      <div className="md:flex gap-x-2 hidden">
        <UrlDialog text="Create new chat" />
        <DeleteDialog chatId={chatId} text="Delete chat" />
      </div>
    </div>
  );
};

export default MessageNav;
