import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const ConfirmEmail = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    const confirmEmail = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3000/api/confirm-email",
          { token }
        );

        if (response.status === 200) {
          setTimeout(() => {
            setLoading(false);
            setSuccess(true); // Set success to true
            setTimeout(() => {
              navigate("/login");
            }, 3000); // Redirecting after showing success message
          }, 1000);
        }
      } catch (error) {
        console.error(
          "Email confirmation error:",
          error.response ? error.response.data : error.message
        );
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred during email confirmation."
        );
        setLoading(false);
      }
    };

    if (token) {
      confirmEmail();
    } else {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div className="flex flex-col items-center">
          <ClipLoader color="#4A90E2" loading={loading} size={50} />
          <p className="mt-4 text-lg text-gray-700">Confirming your email...</p>
        </div>
      ) : errorMessage ? (
        <p className="text-lg text-red-600">{errorMessage}</p>
      ) : success ? (
        <div className="flex flex-col items-center">
          {/* Success checkmark icon */}
          <CheckCircleIcon className="h-12 w-12 text-green-600" />
          <p className="mt-4 text-lg text-gray-700">
            Email confirmed successfully! Redirecting...
          </p>
        </div>
      ) : (
        <p className="text-lg text-gray-700">
          Email confirmed successfully! Redirecting...
        </p>
      )}
    </div>
  );
};

export default ConfirmEmail;