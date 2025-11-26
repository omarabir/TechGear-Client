// client/src/app/login/page.js
"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, Chrome } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();

  const handleSocialLogin = async () => {
    // Google লগইন সফল হলে সরাসরি হোমে (/)-এ রিডাইরেক্ট করবে
    await signIn("google", { callbackUrl: "/" }); 
  };

  const handleCredentialsLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    // Credentials লগইন
    const res = await signIn("credentials", { 
      email, 
      password, 
      redirect: false // নিজে রিডাইরেক্ট হ্যান্ডেল করার জন্য
    });

    if(res.ok) {
        router.push("/");
    } else {
        alert("Login Failed: Check Credentials (admin@test.com / 123456)");
    }
  };

  return (
    <div className="hero min-h-[calc(100vh-64px)] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left p-6">
          <h1 className="text-5xl font-bold text-secondary">TechGear Login</h1>
          <p className="py-6 text-gray-600">Access your dashboard to manage products and settings.</p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 hover:shadow-xl transition-shadow">
          <form className="card-body" onSubmit={handleCredentialsLogin}>
            <div className="form-control">
              <label className="label"><span className="label-text flex items-center gap-2"><Mail size={16} /> Email</span></label>
              <input type="email" name="email" placeholder="admin@test.com" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text flex items-center gap-2"><Lock size={16} /> Password</span></label>
              <input type="password" name="password" placeholder="123456" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary font-semibold"><LogIn size={20} className="mr-2"/> Login</button>
            </div>
          </form>
          
          <div className="divider">OR</div>
          
          <div className="p-4 pt-0">
             <button onClick={handleSocialLogin} className="btn btn-outline btn-neutral w-full">
                <Chrome size={20} className="mr-2 text-error"/> Continue with Google
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;