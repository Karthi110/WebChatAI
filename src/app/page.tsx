import { Viewport } from "next";
import { ArrowRight } from "lucide-react";
import CustomSeparator from "../components/custom-seperator";
import Footer from "../components/footer";
import MaxWidthWrapper from "../components/max-width-wrapper";
import { buttonVariants } from "../components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const viewport: Viewport = {
  themeColor: "#fff",
};

export default function Home() {
  return (
    <>
      <MaxWidthWrapper classname="pt-16 sm:pt-28 lg:pt-32 flex flex-col items-center justify-center text-center grainy2">
        <div className="mx-auto mb-6 sm:mb-8 lg:mb-10 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-xl grainy px-5 py-2 sm:px-7 shadow-md backdrop-blur transition-all">
          <p className="text-xs sm:text-sm lg:text-base font-semibold text-secondary">
            WebChatAI is now public!
          </p>
        </div>

        <h1 className="max-w-3xl sm:max-w-5xl text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-secondary">
          Chat with{" "}
          <span className="grainy rounded-3xl px-2 py-1 sm:px-4 sm:py-2 underline decoration-from-font">
            Webpages
          </span>{" "}
          in secs
        </h1>

        <p className="my-4 sm:my-5 max-w-xs sm:max-w-prose text-xs sm:text-sm lg:text-lg text-secondary">
          WebChatAI allows you to have conversations with any webpage. Simply
          copy-paste the URL and start asking questions right away.
        </p>

        <Link
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "text-lg grainy2 text-secondary",
          })}
          href="/dashboard"
        >
          Get started
          <ArrowRight className="size-5 ml-1" />
        </Link>

        <div className="h-full w-full mt-8">
          <CustomSeparator />
        </div>
      </MaxWidthWrapper>

      {/* value proposition section */}
      <div className="relative isolate p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 aspect-[1199/655] w-[30rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#e7699e] to-[#7068e8] opacity-40 sm:w-[50rem]"
          />
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-5xl px-4 lg:px-6">
          <div className="mt-8 sm:mt-16">
            <div className="rounded-xl bg-gray-900/5 p-4 ring-1 ring-inset ring-gray-900/10 grainy">
              <Image
                src="/dashboard.png"
                alt="preview"
                width={1199}
                height={655}
                quality={100}
                className="rounded-md shadow-lg ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>

        {/* Bottom background shape */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-1/2 aspect-[1199/655] w-[30rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#e7699e] to-[#7068e8] opacity-40 sm:w-[50rem]"
          />
        </div>
      </div>

      {/* feature section  */}
      <div className=" mx-auto mb-32 mt-24 max-w-5xl sm:mt-24">
        <CustomSeparator />
        <div className=" mb-12 px-6 lg:px-8">
          <div className=" mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">
              Start chatting in minutes
            </h2>
            <p className=" mt-4 text-lg text-gray-600">
              Reading Blogs and Docs made easier with WebChatAI
            </p>
          </div>
        </div>
        {/* steps  */}
        <ol className=" my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className=" flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className=" text-sm font-medium text-blue-600">step 1</span>
              <span className=" text-xl font-semibold">
                Sign up for an account
              </span>
              <span className=" mt-2 text-zinc-700">
                Either starting out with free paln or choose{" "}
                <Link
                  href="/pricing"
                  className=" text-blue-700 underline underline-offset-2"
                >
                  pro plan.
                </Link>
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className=" flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className=" text-sm font-medium text-blue-600">step 2</span>
              <span className=" text-xl font-semibold">
                Copy paste the Url.
              </span>
              <span className=" mt-2 text-zinc-700">
                We&apos;ll process your url and make it ready for you to chat
                with.
              </span>
            </div>
          </li>
          <li className="md:flex-1">
            <div className=" flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <span className=" text-sm font-medium text-blue-600">step 3</span>
              <span className=" text-xl font-semibold">
                Start asking Questions
              </span>
              <span className=" mt-2 text-zinc-700">
                It&apos;s that simple. Try out WebChatAI today - it really takes
                less than a minutes
              </span>
            </div>
          </li>
        </ol>
        <CustomSeparator />
        <div className="mx-auto max-w-5xl px-4 lg:px-6 mt-16 sm:mt-24 mb-24 ">
          <div className="flow-root mt-8 sm:mt-16">
            <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 grainy">
              <Image
                src="/preview.png"
                alt="preview"
                width={1096}
                height={600}
                quality={100}
                className="rounded-md bg-white p-2 sm:p-8 md:p-12 shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
