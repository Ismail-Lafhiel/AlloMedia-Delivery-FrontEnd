import { Typography, Input, Button, Card } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./css/styles.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ResetPasswordRequest = () => {
  const navigate = useNavigate();
  // Validation schema
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
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
        `${process.env.BACKEND_URL}/request-password-reset`,
        data
      );
      toast.success("Password reset request sent! Check your email."); // Show success message
      if (response.status === 200) {
        setTimeout(() => {
          navigate("/verify-2fa", { state: { email: data.email } });
        }, 3000); // Redirecting after showing success message
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to send password reset request. Please try again."); // Show error message
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
      <Card className="p-8 shadow-xl w-full max-w-[28rem] bg-white relative z-10">
        <Typography variant="h3" color="blue-gray" className="text-center mb-6">
          Reset Password Request
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">
          Enter your email and to send password reset request
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
          {/* Reset Password Button */}
          <Button
            color="gray"
            type="submit"
            size="lg"
            className="mt-6 rounded-lg"
            fullWidth
          >
            Send Reset Password
          </Button>

          {/* Sign In Link */}
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Go back to{" "}
            <Link
              to="/login"
              className="font-medium text-gray-700 underline ml-0.5"
            >
              Sign in
            </Link>
          </Typography>
        </form>
      </Card>
      <ToastContainer />
    </section>
  );
};

export default ResetPasswordRequest;
