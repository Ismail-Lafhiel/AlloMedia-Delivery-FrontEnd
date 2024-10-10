import { useState } from "react";
import { Typography, Input, Button, Card } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "./css/styles.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [phone, setPhone] = useState("");

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisiblity = () =>
    setConfirmPasswordShown((cur) => !cur);

  // Validation schema
  const validationSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .matches(/^[A-Za-z]+$/, "First Name must contain only letters")
      .trim(),

    last_name: Yup.string()
      .required("Last Name is required")
      .matches(/^[A-Za-z]+$/, "Last Name must contain only letters")
      .trim(),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required")
      .trim(),

    phone: Yup.string().required("Phone number is required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .trim(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required")
      .trim(),
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    const userData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
      password: data.password.trim(),
      confirmPassword: data.confirmPassword.trim(),
    };

    console.log("User Data Being Sent:", userData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/register",
        userData
      );

      if (response.status === 201) {
        toast.success(
          response.data.message || "Account created successfully!",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (error) {
      // If there are validation errors, show them as toast messages
      if (error.response?.data?.message) {
        error.response.data.message.forEach((err) => {
          toast.error(err.msg || "An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else {
        toast.error(
          error.response?.data?.message ||
            "An error occurred. Please try again.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-200 py-12 px-4 relative overflow-hidden">
      {" "}
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
                {...register("first_name")}
                color="gray"
                size="lg"
                type="text"
                name="first_name"
                placeholder="John"
                className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
              />
              {errors.first_name && (
                <p className="text-red-600 text-sm mt-1 ml-0.5">
                  {errors.first_name.message}
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
                {...register("last_name")}
                color="gray"
                size="lg"
                type="text"
                name="last_name"
                placeholder="Doe"
                className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
              />
              {errors.last_name && (
                <p className="text-red-600 text-sm mt-1 ml-0.5">
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Email
                </Typography>
              </label>
              <Input
                {...register("email")}
                id="email"
                color="gray"
                size="lg"
                type="text"
                name="email"
                placeholder="John@domain.com"
                className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 ml-0.5">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone">
                <Typography
                  variant="small"
                  className="mb-2 block font-medium text-gray-900"
                >
                  Phone Number
                </Typography>
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone number is required" }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <PhoneInput
                    country={"us"}
                    value={value}
                    onChange={onChange} // Make sure to pass onChange here
                    onBlur={onBlur} // Pass onBlur to ensure validation
                    inputClass="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
                    buttonClass="border-t-blue-gray-200 rounded-lg"
                    containerClass="w-full"
                    inputProps={{
                      ref, // Register the input with the ref
                      required: true,
                      name: "phone",
                    }}
                  />
                )}
              />

              {errors.phone && (
                <p className="text-red-600 text-sm mt-1 ml-0.5">
                  {errors.phone.message}
                </p>
              )}
            </div>
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
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-700 underline ml-0.5"
            >
              Sign in
            </Link>
          </Typography>
        </form>
      </Card>
      {/* Toast Container */}
      <ToastContainer />
    </section>
  );
};

export default Register;
