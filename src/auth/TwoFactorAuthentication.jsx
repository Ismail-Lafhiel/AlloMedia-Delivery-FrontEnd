import { Typography, Input, Button, Card } from "@material-tailwind/react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./css/styles.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TwoFactorAuthentication = () => {
  const location = useLocation();
  const email = location.state?.email;
  // Validation schema for the 6-digit code
  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^\d{6}$/, "Code must be exactly 6 digits")
      .required("2FA code is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/verify-2fa`,
        { email, confirmationCode: data.code }
      );
      // console.log(response.data);
      // Show success message
      toast.success("2FA code verified successfully!");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message ||
            "Failed to verify 2FA code. Please try again."
        );
      } else {
        toast.error("Failed to verify 2FA code. Please try again.");
      }
    }
  };
  // Function to handle resending the code
  const handleResendCode = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/resend-code`,
        { email }
      );
      toast.success("Verification code resent! Check your email.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to resend verification code. Please try again.");
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
      </div>

      {/* Form Card */}
      <Card className="p-8 shadow-xl w-full max-w-[28rem] bg-white relative z-10">
        <Typography variant="h3" color="blue-gray" className="text-center mb-6">
          Two-Factor Authentication
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">
          Enter the 6-digit code sent to your email
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          {/* 2FA Code */}
          <div>
            <label htmlFor="code">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                2FA Code
              </Typography>
            </label>
            <Input
              {...register("code")}
              id="code"
              color="gray"
              size="lg"
              type="text"
              name="code"
              placeholder="Enter 6-digit code"
              maxLength="6"
              className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
            />
            {errors.code && (
              <p className="text-red-600 text-sm mt-1 ml-0.5">
                {errors.code.message}
              </p>
            )}
          </div>
          {/* Verify Button */}
          <Button
            color="gray"
            type="submit"
            size="lg"
            className="mt-6 rounded-lg"
            fullWidth
          >
            Verify Code
          </Button>

          {/* Resend Link */}
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Didn’t receive the code?{" "}
            <button
              onClick={handleResendCode}
              className="font-medium text-gray-700 underline ml-0.5"
              color="transparent"
            >
              Resend code
            </button>
          </Typography>
        </form>
      </Card>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </section>
  );
};

export default TwoFactorAuthentication;
