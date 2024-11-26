import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import image1 from "../Assests/R 2.png";

function SignUp() {
  const inputFields = [
    { placeholder: "Enter Your First Name", name: "firstName", type: "text" },
    { placeholder: "Enter Your Last Name", name: "lastName", type: "text" },
    { placeholder: "Enter Your Mail Id", name: "email", type: "email" },
    { placeholder: "Password", name: "password", type: "password" },
    { placeholder: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const { confirmPassword, ...dataToSubmit } = formData;

      const response = await axios.post("http://localhost:3000/api/v1/signup", dataToSubmit);
      if (response.status === 200) {
        toast.success("Registration successful");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message?.details?.[0]?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="main-component flex flex-col-reverse lg:flex-row items-center lg:justify-center min-h-screen bg-gradient-to-r from-blue-200 to-indigo-200">
        <div className="form bg-white p-6 rounded-lg shadow-lg w-full max-w-sm mx-4 sm:max-w-md lg:max-w-lg flex flex-col gap-y-4">
          <h5 className="text-3xl font-bold text-center mb-4">Sign Up</h5>

          {inputFields.map((field, index) => (
            <div key={index}>
              <input
                className="border w-full h-12 rounded-lg border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type={field.type}
                name={field.name}
                required
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            </div>
          ))}

          <button
            className="bg-[#FF9090] w-full h-12 rounded-lg text-white font-semibold shadow-md hover:bg-[#FF7070] transition"
            onClick={handleSubmit}
          >
            Register
          </button>

          <p className="text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-500 underline hover:text-indigo-700">
              Log in
            </Link>
          </p>
        </div>


        <div className="flex justify-center lg:w-1/2 mb-6 lg:mb-0">
          <img
            src={image1}
            alt="user illustration"
            className="w-4/5 sm:w-2/3 lg:w-full h-auto max-h-[700px] rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
}

export default SignUp;
