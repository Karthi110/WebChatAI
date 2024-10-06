"use client";
import { FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button, ButtonProps } from "./ui/button";
import { Info, Loader2, Lock, Plus } from "lucide-react";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { vectorizeData } from "@/drizzle/action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { VariantProps } from "class-variance-authority";

type Loaders = "S" | "R";
const UrlDialog = ({
  text,
  variant,
  icon = true,
}: {
  text?: string;
  variant?: "ghost" | "outline";
  icon?: boolean;
}) => {
  const [url, setUrl] = useState<string>("");
  const [loader, setLoader] = useState<Loaders>("S");
  const router = useRouter();

  const { mutate: createUrl, isPending } = useMutation({
    mutationFn: async () => await vectorizeData(url, loader),
    onSuccess: () => {
      toast.success("chat room created!");
      router.push(`/dashboard/chat/${url}/${loader}`);
      setUrl("");
      setLoader("S");
    },
    onError: () => toast.error("Failed to vectorize Url"),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUrl();
  };

  if (isPending)
    return (
      <div className="h-full w-full backdrop-blur-md flex items-center justify-center absolute inset-0 z-50">
        <Loader2 className="mr-0.5 size-5 animate-spin text-primary" />
        creating chat room...
      </div>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={text ? "sm" : "iconSm"} variant={variant ?? variant}>
          {icon ? <Plus className="size-4 mr-0.5" /> : null}
          {text ? text : null}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter webpage url.</DialogTitle>
          <DialogDescription>
            Please provide the URL of the webpage you want to interact with.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <Input
            value={url}
            placeholder="https://example.com..."
            onChange={(e) => setUrl(e.target.value)}
            required
            type="url"
          />
          <DialogDescription>Select the type of Loader.</DialogDescription>
          <Select
            defaultValue={loader}
            onValueChange={(e) => {
              setLoader(e as Loaders);
            }}
          >
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Select load type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Loaders</SelectLabel>
                <SelectItem value="S">Single Page</SelectItem>
                <SelectItem value="R">Multiple Pages (paid)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {loader === "R" ? (
            <div className="flex items-center gap-0.5 text-destructive">
              <Info className="size-3" />
              <p className="text-xs">
                The RecursiveLoader is in development (max depth of will be kept
                1).
              </p>
            </div>
          ) : null}
          <Button type="submit">create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UrlDialog;
