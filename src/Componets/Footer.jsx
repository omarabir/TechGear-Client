"use client";
import Link from "next/link";
import { Facebook, Twitter, Youtube } from "lucide-react";

const socials = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Youtube, href: "#" },
];


const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-10">
      <div className="">
        <nav className="grid grid-flow-col gap-4">
          <Link href="/about" className="link link-hover">
            About Us
          </Link>
          <Link href="/contact" className="link link-hover">
            Contact
          </Link>
          <Link href="/products" className="link link-hover">
            Products
          </Link>
          <Link href="/faq" className="link link-hover">
            FAQ
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            {socials.map((social, index) => (
              <a key={index} href={social.href}>
                <social.icon className="h-6 w-6 cursor-pointer hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </nav>
        <div>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            TechGear Hub
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
