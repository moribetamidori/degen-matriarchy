"use client";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase/client";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  const { signIn, signUp, signOut, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const supabase = createClient();

      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
      }

      // Check if the user exists in the 'users' table
      const user = (await supabase.auth.getUser()).data.user;
      if (!user?.id) throw new Error("Failed to get user ID");

      const { data: existingUser } = await supabase
        .from('users')
        .select()
        .eq('id', user.id)
        .single();

      // If the user does not exist, insert them into the 'users' table
      if (!existingUser) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({ email: user.email, id: user.id });

        if (insertError) {
          console.error("Error inserting user:", {
            message: insertError.message,
            code: insertError.code,
            details: insertError.details,
            hint: insertError.hint,
          });
          throw insertError;
        }
      }

      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      onClose();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (!isOpen) return null;

  // If user is signed in, show sign out screen
  if (user) {
    return (
      <div className="fixed inset-0 z-50">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        />
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-black border border-[#1c41f1] p-8 rounded-lg max-w-md w-full m-4 relative">
            <h2 className="text-2xl font-bold text-[#1c41f1] mb-6">
              Account
            </h2>
            <p className="text-[#1c41f1] mb-4">Signed in as: {user.email}</p>
            <button
              onClick={handleSignOut}
              className="w-full bg-[#1c41f1] text-white py-2 rounded hover:bg-[#4361ee] transition-colors"
            >
              Sign Out
            </button>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#1c41f1] hover:text-[#4361ee]"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-black border border-[#1c41f1] p-8 rounded-lg max-w-md w-full m-4 relative">
          <h2 className="text-2xl font-bold text-[#1c41f1] mb-6">
            {isSignUp ? "Create Account" : "Login"}
          </h2>

          {error && (
            <div className="bg-red-500 bg-opacity-10 border border-red-500 text-red-500 p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-transparent border border-[#1c41f1] text-[#1c41f1] px-4 py-2 rounded"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-transparent border border-[#1c41f1] text-[#1c41f1] px-4 py-2 rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#1c41f1] text-white py-2 rounded hover:bg-[#4361ee] transition-colors"
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="mt-4 text-[#1c41f1] hover:text-[#4361ee] text-sm"
          >
            {isSignUp
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </button>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-[#1c41f1] hover:text-[#4361ee]"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 