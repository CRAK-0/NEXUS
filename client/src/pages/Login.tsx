import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  type LoginFormData,
} from "../schemas/authSchema.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");

      await login(data);
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "Unable to login. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-[0.25em] text-text">
            NEXUS
          </h1>

          <p className="mt-2 text-sm text-text/50">
            Personal workspace
          </p>
        </div>

        <Card className="border-border bg-surface">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-text">
              Welcome back
            </CardTitle>

            <CardDescription className="text-text/50">
              Sign in to continue to your workspace.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-text/70"
                >
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className="border-border bg-background text-text placeholder:text-text/30"
                />

                {errors.email && (
                  <p className="text-xs text-text/60">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-text/70"
                >
                  Password
                </Label>

                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                  className="border-border bg-background text-text placeholder:text-text/30"
                />

                {errors.password && (
                  <p className="text-xs text-text/60">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {error && (
                <div className="rounded-md border border-border bg-background px-3 py-2">
                  <p className="text-sm text-text/70">
                    {error}
                  </p>
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>

              {/* Register */}
              <p className="text-center text-sm text-text/50">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-text underline-offset-4 hover:underline"
                >
                  Create one
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;