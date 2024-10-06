"use client";
import { useQuery } from "@tanstack/react-query";
import { getAuthStatus } from "./action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["auth-callback"],
    queryFn: async () => await getAuthStatus(),
    retry: true,
    retryDelay: 500,
  });

  // if (data?.success) {
  //   router.push("/dashboard");
  // }
  const SquigglyLine = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="10"
        viewBox="0 0 100% 10" // Increased viewBox width for full width
        preserveAspectRatio="none"
      >
        <path
          d="M0,15 Q12.5,0 25,15 T50,15 T75,15 T100,15 T125,15 T150,15 T175,15 T200,15 T225,15 T250,15 T275,15 T300,15 T325,15 T350,15 T375,15 T400,15 T425,15 T450,15 T475,15 T500,15 T525,15 T550,15 T575,15 T600,15"
          fill="transparent"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    );
  };

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">Logging you in...</h3>
        <p>You will be redirected automatically.</p>
        <div>
          <h1>Hello, World!</h1>
          <SquigglyLine />
        </div>
      </div>
    </div>
  );
};

export default Page;
