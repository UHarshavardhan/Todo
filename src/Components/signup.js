import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Include ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
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
       console.log(response.error);
      if (response.status === 200) {
        toast.success("Registering successful"); 
      }
    } catch (error) {
      console.log(error)
      const errorMessage = error?.response?.data?.message?.details?.[0]?.message || 
      "An unexpected error occurred";
      toast.error(errorMessage); 
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="main-componet flex flex-row p-16">
        <div>
          <img src={image1} alt="user image" width={400} height={400} />
        </div>

        <div className="form flex flex-col gap-6 ml-[400px] mt-9">
          <h5 className="text-5xl">Sign Up</h5>

          {inputFields.map((field, index) => (
            <div key={index}>
              <input
                className="border w-[500px] h-[40px] rounded-xl border-black p-4"
                type={field.type}
                name={field.name}
                required
                placeholder={field.placeholder}
                onChange={handleChange}
              />
              <div style={{ color: "red" }}></div>
            </div>
          ))}

          <div>
            <button
              className="bg-[#FF9090] w-[129px] h-[40px] rounded-lg"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>


{ }

    </>
  );
}

export default SignUp;
