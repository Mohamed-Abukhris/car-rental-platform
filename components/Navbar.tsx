import Link from "next/link";
import Image from "next/image";
import { Button } from "@components/ui/button";

const NavBar = () => (
  <header className="w-full  absolute z-10">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/icons/logo.png"
          alt="logo"
          width={118}
          height={18}
          className="object-contain"
        />
      </Link>

      <Button
        type="button"
        className="text-primary-blue rounded-full bg-white min-w-[130px]"
      >
        Sign in
      </Button>
    </nav>
  </header>
);

export default NavBar;
