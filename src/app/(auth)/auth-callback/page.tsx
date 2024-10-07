"use client";
import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "./action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import CustomSeparator from "../../../components/custom-seperator";

const Page = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  if (data?.success) {
    router.push("/dashboard");
  }

  return (
    <div className="w-full h-full flex grainy2 items-center justify-center">
      <div className="flex flex-col items-center gap-2 text-secondary">
        <Loader2 className="h-8 w-8 animate-spin" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
        <CustomSeparator />
      </div>
    </div>
  );
};

export default Page;
