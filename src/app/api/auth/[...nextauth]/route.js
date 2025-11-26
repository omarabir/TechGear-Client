import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    // 1. Google Provider (সোশ্যাল লগিনের জন্য)
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // 2. Credentials Provider (ইমেইল পাসওয়ার্ড দিয়ে লগিনের জন্য)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // এখানে আপনি আপনার ডাটাবেস চেক করতে পারেন।
        // আপাতত টেস্টিংয়ের জন্য আমরা একটি হার্ডকোড করা ইউজার দিচ্ছি।
        // ইউজার: admin@test.com, পাসওয়ার্ড: 123456

        if (
          credentials.email === "admin@test.com" &&
          credentials.password === "123456"
        ) {
          return {
            id: "1",
            name: "Admin User",
            email: "admin@test.com",
            image: "https://i.pravatar.cc/150?u=admin", // ডামি ছবি
          };
        }

        // লগিন ভুল হলে null রিটার্ন করবে
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login", // আমাদের কাস্টম লগিন পেজ
  },
  callbacks: {
    async session({ session, token }) {
      // সেশনে ইউজারের রোল বা আইডি পাঠাতে চাইলে এখানে কনফিগার করতে হয়
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // .env.local থেকে সিক্রেট নিবে
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
