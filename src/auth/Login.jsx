import { useState } from "react";
import { Typography, Input, Button, Card } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./css/styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useAuth } from "../AuthContext.jsx";

export const Login = () => {
  const { login } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .trim(),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
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
    try {
      const response = await axios.post(
        `${process.env.BACKEND_URL}/login`,
        data
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        Cookies.set("token", response.data.token, { expires: 3 }); // Expires in 3 days

        // Storing the user data in local storage
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Log in the user using AuthContext
        login(response.data.user);
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response?.data.message || "Login failed.";
      toast.error(errorMessage);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="shape triangle"></div>
        <div className="shape cross"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
        <div className="shape cross"></div>
        <div className="shape square"></div>
        <div className="shape triangle"></div>
        <div className="shape cross"></div>
        <div className="shape square"></div>
      </div>

      {/* Form Card */}
      <Card className="p-8 shadow-xl w-full max-w-[28rem] md:max-w-[32rem] bg-white relative z-10">
        <Typography variant="h3" color="blue-gray" className="text-center mb-6">
          Sign In
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* Email */}
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

          {/* Password */}
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
            color="gray"
            type="submit"
            size="lg"
            className="mt-6 rounded-lg"
            fullWidth
          >
            Sign in
          </Button>

          {/* Google Sign-in */}
          <Button
            variant="outlined"
            size="lg"
            className="mt-4 flex items-center justify-center gap-2 h-12 rounded-lg border-gray-400"
            fullWidth
          >
            <img
              // src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />
            Sign in with Google
          </Button>

          {/* Sign In Link */}
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
