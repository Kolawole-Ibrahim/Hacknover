"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`shadow-sm ${
        isMounted && isScrolled ? "lg:bg-white" : "lg:bg-transparent"
      } border-transparent transition-all duration-100 ease-in-out sticky top-0 left-4 mr-7 rounded-lg ml-7 z-50`}
    >
      <div
        className={`${
          isMounted && isScrolled ? "lg:h-20" : "lg:h-35"
        } transition-all duration-500 ease-in-out container mx-auto`}
      >
        <div
          id="nav-container"
          className="relative flex flex-col space-y-4 lg:py-4"
        >
          {/* Logo and Mobile Menu Button */}
          <div className="flex border-b rounded-lg px-4 py-2 justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2sm">AH</span>
              </div>
              <span className="font-bold text-2xl text-gray-900">
                AFRIHACKBOX
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
              aria-label="Toggle mobile menu"
            >
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 py-2 space-y-2 bg-white rounded-lg shadow-lg">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t pt-2">
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === "/contact"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links - Transform positioned when scrolled */}
          <div
            className={`relative px-4 transition-all duration-700 ease-in-out hidden lg:block ${
              isMounted && isScrolled
                ? "transform translate-x-180 -translate-y-17"
                : "transform translate-x-0 translate-y-0"
            }`}
          >
            <div
              className={`flex ${
                isMounted && isScrolled ? "lg:space-x-4" : "flex-row  "
              } transition-all duration-700 ease-in-out`}
            >
              <div className="flex lg:space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 lg:py-2 rounded-lg text-sm font-medium transition-all duration-500 ${
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
          className={`flex flex-row space-x-4 transition-all duration-500 hidden lg:block ${
            isMounted && isScrolled
              ? "transform lg:translate-x-[1090px] lg:-translate-y-28"
              : "transform lg:translate-x-[1090px] lg:-translate-y-12"
          }`}
        >
          {/* Contact Us Link */}
          <Link
            href="/contact"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-500 ${
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
