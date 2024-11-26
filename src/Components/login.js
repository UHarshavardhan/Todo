import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import image1 from "../Assests/ach3 1.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function LogIn() {
  const navigate = useNavigate();

  const inputFields = [
    { placeholder: "Enter Your Mail Id", name: "email", type: "email" },
    { placeholder: "Password", name: "password", type: "password" },
  ];

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", formData);

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log(response.data);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.userId); // Store the user ID
        localStorage.setItem("userName", user.name); // Store the user name
        localStorage.setItem("userEmail", user.email); // Store the user email

        toast.success("Login Successful");

        // Navigate to the home page after successful login
        navigate("/home");
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="main-component grid grid-cols-1 lg:grid-cols-2 items-center p-6 lg:p-24 min-h-screen bg-gradient-to-r from-blue-200 to-indigo-200">
        {/* Form Section */}
        <div className="form flex flex-col gap-6 mx-auto max-w-md lg:max-w-lg">
          <h5 className="text-3xl lg:text-5xl text-center">Sign In</h5>

          {inputFields.map((field, index) => (
            <div key={index} className="w-full">
              <input
                className="border w-full h-[40px] lg:h-[50px] rounded-xl border-gray-400 p-4 lg:text-lg lg:w-96"
                type={field.type}
                name={field.name}
                required
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="text-center">
            <button
              className="bg-[#FF9090] w-[129px] h-[40px] rounded-lg text-white shadow-lg hover:bg-[#FF7070]"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex justify-center mt-6 lg:mt-0">
          <img
            src={image1}
            alt="user illustration"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </>
  );
}

export default LogIn;
