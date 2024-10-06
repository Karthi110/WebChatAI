"use client";
import { deleteChat } from "@/drizzle/action";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button, buttonVariants } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageProps {
  text?: string;
  chatId: string;
  isIcon: boolean;
}

const RemoveDialog = ({ chatId, text, isIcon = false }: PageProps) => {
  const router = useRouter();
  const { mutate: removeChat } = useMutation({
    mutationFn: async () => await deleteChat({ chatId }),
    onError: () =>
      toast.error("Failed to delete chat", {
        description:
          "may be the chat doesn't exist or user is not the owner of the chat",
      }),
    onSuccess: () => {
      toast.success("Chat deleted successful!");
      router.replace("/dashboard");
      router.refresh();
    },
  });
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn("flex items-center gap-0.5", {
            "absolute top-2 right-2": isIcon,
          })}
          size={isIcon ? "iconSm" : "sm"}
          variant="destructive"
        >
          <Trash className="size-3.5" />
          {text ? text : null}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your chat
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive", size: "sm" })}
            onClick={() => removeChat()}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
