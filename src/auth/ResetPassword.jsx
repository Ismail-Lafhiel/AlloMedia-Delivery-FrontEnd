import { useState } from "react";
import { Typography, Input, Button, Card } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./css/styles.css";

export function ResetPassword() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisiblity = () =>
    setConfirmPasswordShown((cur) => !cur);

  // Validation schema
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // registration logic here
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
          Reset Password
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">
          Enter your password and confirm password to reset it
        </Typography>
        <form
          onSubmit={handleSubmit(onsubmit)}
          action="#"
          className="space-y-6 w-full"
        >
          {/* Password */}
          <div>
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                New Password
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
          </div>
          {/* confirm password */}
          <div>
            <label htmlFor="confirm-password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Confirm New Password
              </Typography>
            </label>
            <Input
              {...register("confirmPassword")}
              size="lg"
              placeholder="********"
              className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
              type={confirmPasswordShown ? "text" : "password"}
              icon={
                <i onClick={toggleConfirmPasswordVisiblity}>
                  {confirmPasswordShown ? (
                    <EyeIcon className="h-5 w-5 cursor-pointer" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 cursor-pointer" />
                  )}
                </i>
              }
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1 ml-0.5">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          {/* reset password Button */}
          <Button
            color="gray"
            type="submit"
            size="lg"
            className="mt-6 rounded-lg"
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default ResetPassword;
