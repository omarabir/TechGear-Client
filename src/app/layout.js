import AuthProvider from "@/providers/AuthProviders";
import "./globals.css";

import { Inter } from "next/font/google";
import Navbar from "@/Componets/Navbar";
import Footer from "@/Componets/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TechGear",
  description: "The ultimate gadget store management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="grow pt-16">{children}</main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
