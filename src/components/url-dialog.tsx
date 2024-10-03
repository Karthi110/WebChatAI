"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { vectorizeData } from "@/drizzle/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const UrlDialog = () => {
  const router = useRouter();
  const { mutate: createUrl, isPending } = useMutation({
    mutationFn: async () => await vectorizeData(url),
    onSuccess: () => {
      toast.success("Url vectorized!");
      router.push(`/dashboard/url/${url}`);
    },
    onError: () => toast.error("Failed to vectorize Url"),
  });
  const [url, setUrl] = useState<string>("");
  if (isPending)
    return (
      <div className="h-full w-full backdrop-blur-sm flex items-center justify-center absolute inset-0 z-50">
        <Loader2 className="mr-0.5 size-5 animate-spin text-primary" />
        vectorizing url...
      </div>
    );
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="size-4 mr-0.5" />
          Create a new chat.
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter webpage url.</DialogTitle>
          <DialogDescription>
            Please provide the URL of the webpage you want to interact with.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={url}
          placeholder="https://example.com..."
          onChange={(e) => setUrl(e.target.value)}
          required
          type="url"
        />
        <Button onClick={() => createUrl()}>create</Button>
      </DialogContent>
    </Dialog>
  );
};

export default UrlDialog;
