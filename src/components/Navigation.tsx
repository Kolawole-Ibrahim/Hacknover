"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/solutions", label: "Solutions" },
    { href: "/resources", label: "Resources" },
    { href: "/company", label: "Company" },
  ];

  return (
    <nav
      className={`shadow-sm ${
        isScrolled
          ? "bg-white"
          : "bg-transparent"
      } border-transparent transition-all duration-500 ease-in-out sticky top-0 left-4 mr-7 rounded-lg ml-7 z-50`}
    >
      <div
        className={`${
          isScrolled ? "h-20" : "h-35"
        } transition-all duration-500 ease-in-out container mx-auto`}
      >
        <div
          id="nav-container"
          className="relative flex flex-col space-y-4 py-4"
        >
          {/* Logo */}
          <div className="flex border-b rounded-lg px-4 py-2 justify-start">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2sm">AH</span>
              </div>
              <span className="font-bold text-2xl text-gray-900">
                AFRIHACKBOX
              </span>
            </Link>
          </div>

          {/* Navigation Links - Transform positioned when scrolled */}
          <div
            className={`relative px-4 transition-all duration-700 ease-in-out ${
              isScrolled
                ? "transform translate-x-180 -translate-y-17"
                : "transform translate-x-0 translate-y-0"
            }`}
          >
            <div
              className={`flex ${
                isScrolled ? "space-x-4" : "flex-row  "
              } transition-all duration-700 ease-in-out`}
            >
              <div className="flex space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-500 ${
                      pathname === item.href
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`flex flex-row space-x-4 transition-all duration-500 ${
            isScrolled
              ? "transform translate-x-273 -translate-y-32"
              : "transform translate-x-273 -translate-y-15 "
          }`}
        >
          {/* Contact Us Link */}
          <Link
            href="/contact"
            className={`px-4 py-2 rounded-lg text-sm font-medium  transition-all duration-500 ${
              pathname === "/contact"
                ? "bg-blue-100 text-blue-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Contact us
          </Link>
        </div>
      </div>
    </nav>
  );
}
