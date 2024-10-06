import { type Message as TMessage } from "ai";
import { MessagesSquare } from "lucide-react";
import Message from "./message";

interface PageProps {
  messages: TMessage[];
}

const Messages = ({ messages }: PageProps) => {
  return (
    <div className="h-full w-full max-h-[calc(100vh-3.5rem-1rem-8rem)] overflow-y-auto text-start">
      {messages.length ? (
        messages.map((m, i) => <Message key={i} message={m} />)
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center gap-2 h-full">
          <MessagesSquare className="size-8 text-blue-500" />
          <h3 className="font-semibold text-xl">Your&apos;e all set!</h3>
          <p className="text-primary text-xs">
            Ask your queries to get started.
          </p>
        </div>
      )}
    </div>
  );
};

export default Messages;
