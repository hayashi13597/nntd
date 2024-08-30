import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full h-16 border-b-2">
      <div className="flex justify-around items-center w-full h-full">
        <Link href="/" className="text-2xl font-bold">
          S19 TMG - Ngự Uyển Viên
        </Link>
        <Link
          className="text-lg font-semibold hover:text-blue-500 transition-all duration-150"
          href="/cow-race"
        >
          Đua bò
        </Link>
      </div>
    </div>
  );
};

export default Header;
