import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/authSchema.ts";
import { useAuth } from "../context/AuthContext.tsx";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

const onSubmit = async (data: LoginFormData) => {
  try {
    setError("");

    await login(data);
    navigate("/dashboard");

    console.log("Login successful");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } else {
      setError("Something went wrong. Please try again.");
    }
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        {...register("email")}
      />

      {errors.email && <p>{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Password"
        {...register("password")}
      />

      {errors.password && <p>{errors.password.message}</p>}

      <button type="submit">
        Login
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;