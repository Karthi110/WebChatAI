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
import { Plus } from "lucide-react";
import { Input } from "./ui/input";

const UrlDialog = () => {
  const [url, setUrl] = useState<string>("");
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
        <form className="flex flex-col items-end gap-2">
          <Input
            value={url}
            placeholder="https://example.com..."
            onChange={(e) => setUrl(e.target.value)}
            required
            type="url"
          />
          <Button>create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UrlDialog;
