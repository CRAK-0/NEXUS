import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { register as registerUser } from "@/services/authService.ts";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be less than 50 characters"),

  email: z
    .string()
    .email("Enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);

      navigate("/login");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "Unable to create account.";

      setError("root", {
        message,
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-border bg-surface p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-text">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-text/60">
              Create your NEXUS workspace account.
            </p>
          </div>

          {errors.root && (
            <div className="mb-5 rounded-md border border-border bg-background px-4 py-3">
              <p className="text-sm text-text/70">
                {errors.root.message}
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-text"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                {...register("username")}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-text/50"
                placeholder="Enter your username"
              />

              {errors.username && (
                <p className="mt-1.5 text-xs text-text/60">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-text"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-text/50"
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className="mt-1.5 text-xs text-text/60">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-text"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-text outline-none transition focus:border-text/50"
                placeholder="Create a password"
              />

              {errors.password && (
                <p className="mt-1.5 text-xs text-text/60">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-md bg-text px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-text/60">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-text hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
