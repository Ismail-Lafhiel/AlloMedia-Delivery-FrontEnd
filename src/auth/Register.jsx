import { useState } from "react";
import { Typography, Input, Button, Card } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./css/styles.css";

export const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisiblity = () =>
    setConfirmPasswordShown((cur) => !cur);
  // Validation schema
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
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
      <Card className="p-8 shadow-xl w-full max-w-[28rem] md:max-w-[40rem] bg-white relative z-10">
        <Typography variant="h3" color="blue-gray" className="text-center mb-6">
          Create New Account
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">
          Please fill in all fields to create your account
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  First Name
                </Typography>
              </label>
              <Input
                {...register("firstName")}
                color="gray"
                size="lg"
                type="text"
                name="firstName"
                placeholder="John"
                className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1 ml-0.5">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="last-name">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Last Name
                </Typography>
              </label>
              <Input
                {...register("lastName")}
                color="gray"
                size="lg"
                type="text"
                name="lastName"
                placeholder="Doe"
                className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1 ml-0.5">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
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
                className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
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

            <div>
              <label htmlFor="confirm-password">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Confirm Password
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
          </div>

          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6 rounded-lg"
            fullWidth
          >
            Register
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Register;
