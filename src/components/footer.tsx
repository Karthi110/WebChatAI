import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" w-full border-t-2 grainy2 relative">
      <div className="wavy h-[3px] rounded-sm absolute top-0 inset-x-0 w-full" />
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-14 md:flex-row md:py-0 md:max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link
            href="/"
            className="text-2xl text-secondary/70 font-[700] tracking-wide px-2"
          >
            WebChatAI
          </Link>
        </div>
        <p className="text-sm text-secondary">
          &copy; {new Date().getFullYear()} WebChatAI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
