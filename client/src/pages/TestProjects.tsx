import { useEffect } from "react";
import { getCurrentUser, login } from "../services/authService.ts";

const TestAuth = () => {
  useEffect(() => {
    const testAuth = async () => {
      try {
        const loginResponse = await login({
          email: "crak@example.com",
          password: "mySecret123",
        });

        console.log("Login:", loginResponse);

        const user = await getCurrentUser();

        console.log("Current user:", user);
      } catch (error) {
        console.error("Auth error:", error);
      }
    };

    testAuth();
  }, []);

  return <div>Check the console</div>;
};

export default TestAuth;