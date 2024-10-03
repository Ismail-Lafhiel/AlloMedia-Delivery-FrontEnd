import { useState } from "react";
import { Typography, Input, Button, Card } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import "./css/styles.css";

export function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

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
          Login
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">
          Enter your email and password to sign in
        </Typography>
        <form action="#" className="space-y-6 w-full">
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
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-70 focus:border-t-gray-900 border-t-blue-gray-200 rounded-lg"
            />
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
            <Typography
              variant="small"
              color="gray"
              className="!mt-4 font-normal text-right"
            >
              Forgot password?{" "}
              <a
                href="#"
                className="font-medium text-gray-700 underline ml-0.5"
              >
                Reset here
              </a>
            </Typography>
          </div>
          {/* Sign in Button */}
          <Button color="gray" size="lg" className="mt-6 rounded-lg" fullWidth>
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
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
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
            <a href="#" className="font-medium text-gray-700 underline ml-0.5">
              Register
            </a>
          </Typography>
        </form>
      </Card>
    </section>
  );
}

export default Login;
