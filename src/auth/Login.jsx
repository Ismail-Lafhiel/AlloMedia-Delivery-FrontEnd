import { useState, useEffect } from "react";
import { Typography, Input, Button, Card } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useAuth } from "../AuthContext.jsx";

export const Login = () => {
  const { login } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [isLocked, setIsLocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .trim(),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .trim(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    if (isLocked) return; // Prevent form submission while locked

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        data
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        Cookies.set("token", response.data.token, { expires: 3 });

        localStorage.setItem("user", JSON.stringify(response.data.user));
        login(response.data.user);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data.message || "Login failed.";
      toast.error(errorMessage);

      if (error.response?.data.lockout) {
        handleLockout();
      }
    }
  };

  const handleLockout = () => {
    setIsLocked(true);
    const lockoutDuration = 3600; // 1 hour
    const lockoutEndTime = Date.now() + lockoutDuration * 1000;
    localStorage.setItem("lockoutEndTime", lockoutEndTime);
    setRemainingTime(lockoutDuration);
    toast.error("You have been locked out due to too many failed attempts.");
  };

  useEffect(() => {
    // Check if lockoutEndTime exists in localStorage
    const lockoutEndTime = localStorage.getItem("lockoutEndTime");

    if (lockoutEndTime) {
      const timeLeft = Math.max(0, (lockoutEndTime - Date.now()) / 1000);

      // Only set the lockout if there's time left
      if (timeLeft > 0) {
        setIsLocked(true);
        setRemainingTime(timeLeft);
      } else {
        // Clear lockout if time has passed
        localStorage.removeItem("lockoutEndTime");
        setIsLocked(false);
      }
    }
  }, []);

  useEffect(() => {
    if (remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else if (remainingTime === 0 && isLocked) {
      setIsLocked(false);
      toast.info("You can try logging in again.");
      localStorage.removeItem("lockoutEndTime");
    }
  }, [remainingTime, isLocked]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 relative overflow-hidden">
      <div className="animated-background">
        <div className="shape triangle"></div>
        <div className="shape cross"></div>
        <div className="shape square"></div>
      </div>

      <Card className="p-8 shadow-xl w-full max-w-[28rem] md:max-w-[32rem] bg-white relative z-10">
        <Typography variant="h3" color="blue-gray" className="text-center mb-6">
          Sign In
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Email Field */}
          <div>
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Your Email
              </Typography>
            </label>
            <Input
              {...register("email")}
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1 ml-0.5">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Password
              </Typography>
            </label>
            <Input
              {...register("password")}
              size="lg"
              placeholder="********"
              className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-gray-400 rounded-lg"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5 cursor-pointer" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                  )}
                </i>
              }
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1 ml-0.5">
                {errors.password.message}
              </p>
            )}
            <Typography
              variant="small"
              color="gray"
              className="!mt-4 font-normal text-right"
            >
              Forgot password?{" "}
              <Link
                to="/reset-password-request"
                className="font-medium text-gray-700 underline ml-0.5"
              >
                reset here
              </Link>
            </Typography>
          </div>

          {/* Sign in Button */}
          <Button
            type="submit"
            fullWidth
            className="mt-6 rounded-lg"
            disabled={isLocked}
          >
            {isLocked
              ? `Please wait ${Math.ceil(remainingTime)} seconds`
              : "Sign In"}
          </Button>

          {/* Google Sign-in */}
          <Button
            variant="outlined"
            size="lg"
            className="mt-4 flex items-center justify-center gap-2 h-12 rounded-lg border-gray-400"
            fullWidth
          >
            <img alt="google" className="h-6 w-6" />
            Sign in with Google
          </Button>

          {/* Sign Up Link */}
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-gray-700 underline ml-0.5"
            >
              Register
            </Link>
          </Typography>
        </form>
      </Card>
      <ToastContainer />
    </section>
  );
};

export default Login;
