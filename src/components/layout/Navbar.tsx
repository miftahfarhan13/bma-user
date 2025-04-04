import React from "react";
import UserProfile from "./UserProfile";
import Image from "next/image";
import Link from "next/link";
import NavbarMenu from "./NavbarMenu";

export default function Navbar() {
  return (
    <div className="shadow py-2 px-4 md:px-5">
      <div className="flex flex-row items-center justify-between max-w-[1440px] mx-auto">
        <Link href="/">
          <div className="relative w-[80px] md:w-[140px] h-[30px] md:h-[40px]">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        <div className="flex flex-row items-center gap-5">
          <div className="hidden md:block">
            <NavbarMenu />
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
