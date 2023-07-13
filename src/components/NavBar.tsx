"use client";
import * as React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Nav = {
  link: string;
  name: string;
};

const NAV_LIST: Nav[] = [
  { link: "/", name: "Home " },
  { link: "/simple", name: "Simple" },
];

function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="navbar bg-base-100 p-4">
      {NAV_LIST.map((nav) => {
        const isActive = pathname.startsWith(nav.link);
        return (
          <Link
            href={nav.link}
            key={nav.name}
            className={"btn btn-ghost normal-case text-xl bg-amber-200"}
          >
            {nav.name}
          </Link>
        );
      })}
    </nav>
  );
}

export default NavBar;
