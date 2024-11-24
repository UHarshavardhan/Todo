import React,{useEffect,useState} from "react";
import image1 from '../Assests/ach3 1.png'
import { toast, ToastContainer } from "react-toastify"; // Include ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import axios from "axios";

function LogIn(){

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
           console.log(response.error);
          if (response.status === 200) {
            toast.success("Login Sucessfull"); 
          }
        } catch (error) {
          console.log(error)
          const errorMessage = error?.response?.data?.message || 
          "An unexpected error occurred";
          toast.error(errorMessage); 
        }
      };
    
    

    return(
        <>
 <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="main-componet flex flex-row p-24">
       

        <div className="form flex flex-col gap-6  mt-9">
          <h5 className="text-5xl">Sign In</h5>

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
              Login
            </button>
          </div>
        </div>


        <div class="ml-[100px]">
          <img src={image1} alt="user image" width={700} height={400} />
        </div>
      </div>
        </>

    )

}

export default LogIn;