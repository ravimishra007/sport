'use client'
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { login } from "@/redux/features/adminAuthSlice";
import toast from "react-hot-toast";
import { getToken } from "@/config/token";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname()
  const token = getToken();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);

    const resultAction = await dispatch(login({ email, password }));
    console.log("Login attempt with resultAction:", resultAction);

    if (resultAction.meta.requestStatus === "fulfilled") {
      router.push("/dashboard");
    } else {
      toast.error(resultAction.payload ?? "Invalid credentials");
    }

  };

  useEffect(() => {
    if (pathname === '/' && token) {
      router.push('/dashboard');
    }
  }, [pathname, router, token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] from-white to-gray-50 p-4">
      <div className="w-full max-w-xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100 backdrop-blur-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-gray-500">Enter your credentials to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="text-right">
              <Link href="/auth/forgot-password"
                className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors">
                Forgot Password?
              </Link>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="relative w-full h-12 px-4 py-2  bg-[#742193] hover:bg-[#57176e] text-primary-foreground rounded-md font-medium transition-all duration-200 disabled:opacity-70"
            >
              {loading ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;