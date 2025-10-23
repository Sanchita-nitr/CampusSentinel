"use client";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react"; 
import { useAuth } from "../../context/authContext"; 

const FullPageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-950">
    <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
  </div>
);

function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access", data.tokens.access);
        localStorage.setItem("refresh", data.tokens.refresh);
        login(data.tokens.access); // This updates the context
        router.push("/pages/dashboard"); // Redirect on success
      } else {
        const data = await response.json();
        setError(data.detail || "Invalid email or password");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // ... (Your full JSX for the login form goes here) ...
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* ... Floating Accent Elements ... */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-400 text-sm">Sign in to your account</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <Mail className="w-4 h-4 mr-2 text-cyan-400" />
                Email
              </label>
              {/* ... email input ... */}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 flex items-center"
              >
                <Lock className="w-4 h-4 mr-2 text-emerald-400" />
                Password
              </label>
              {/* ... password input ... */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800/50 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all duration-300 backdrop-blur-sm pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
            <button
              type="submit" // <-- Changed to type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-t from-cyan-500 to-blue-900 text-white font-semibold py-3 px-6 rounded-xl hover:from-cyan-600 hover:to-blue-950 cursor-pointer focus:outline-none focus:ring-4 focus:ring-cyan-500/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50  flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          {/* ... other buttons ... */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
          </div>
          <button
            onClick={() => router.push("/auth/signup")}
            className="w-full bg-gray-800/50 border-2 cursor-pointer border-gray-600 text-gray-300 font-semibold py-3 px-6 rounded-xl hover:bg-gray-700/50 hover:border-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-500/20 transition-all duration-300 flex items-center justify-center group"
          >
            Create New Account
            <Zap className="w-4 h-4 ml-2 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
          </button>
          <button onClick={() => router.push("/auth/forgotpassword")}>
            Forgot Password
          </button>
        </div>
      </div>
    </div>
  );
}

// This is the new Page component that wraps your login logic
export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait for auth check
    if (isAuthenticated) {
      router.replace("/pages/dashboard"); // Redirect if already logged in
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <FullPageLoader />; // Show loader while checking auth
  }

  // If not authenticated, show the login page
  if (!isAuthenticated) {
    return <LoginComponent />;
  }

  // If authenticated, return null while redirecting
  return null;
}