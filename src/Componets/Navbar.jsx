"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex  items-center gap-6">
          <Link href="/">
            <span className="font-bold text-lg">TechGear</span>
          </Link>
          <div className="hidden md:flex  gap-4">
            <Link className="hover:text-blue-600" href="/products">
              Products
            </Link>
            <Link className="hover:text-blue-600" href="/about">
              About
            </Link>
            <Link className="hover:text-blue-600" href="/contact">
              Contact
            </Link>
            <Link className="hover:text-blue-600" href="/blog">
              Blog
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isMounted && status === "unauthenticated" && (
            <>
              <button onClick={() => signIn("google")} className="btn">
                Login
              </button>
              <Link href="/register" className="btn-outline">
                Register
              </Link>
            </>
          )}
          {isMounted && status === "authenticated" && (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="px-3 py-2 rounded-md border"
              >
                {session.user?.name || session.user?.email}
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow p-2">
                  <Link href="/add-product" className="block py-2">
                    Add Product
                  </Link>
                  <Link href="/manage-product" className="block py-2">
                    Manage Product
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full text-left py-2"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
