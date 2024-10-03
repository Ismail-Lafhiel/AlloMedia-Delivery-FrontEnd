import { Typography, Input, Button, Card } from "@material-tailwind/react";
import "./css/styles.css";

export function ResetPasswordRequest() {

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
          Reset Password
        </Typography>
        <Typography className="mb-8 text-gray-600 font-normal text-center text-[18px]">
          Enter your email and to reset your password
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
          {/* Reset Password Button */}
          <Button color="gray" size="lg" className="mt-6 rounded-lg" fullWidth>
            Reset Password
          </Button>

          {/* Sign In Link */}
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Go back to{" "}
            <a href="#" className="font-medium text-gray-700 underline ml-0.5">
              Sign in
            </a>
          </Typography>
        </form>
      </Card>
    </section>
  );
}

export default ResetPasswordRequest;