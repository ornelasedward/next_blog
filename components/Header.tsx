import Image from "next/image";
import Link from "next/link";

import Logo from "../public/images/logo.png";

const navigation = [{ name: "Profitwise", href: "/" }];

function Header() {
  return (
    <header className="bg-indigo-600">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="/">
              <span className="sr-only">Profitwise</span>
              <img
                className="h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt=""
              />
            </a>
            <div className="ml-2 space-x-8 block">
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-medium text-white hover:text-indigo-50"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
