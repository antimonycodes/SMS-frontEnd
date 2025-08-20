import { useState } from "react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
type SignIn = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("role", formData.role);
    navigate("/");
    console.log(formData);
  };
  return (
    <div className=" h-screen w-full bg-primary-100">
      <div className=" w-full h-full flex items-center justify-center">
        <div className=" py-3 px-4 border space-y-4 border-black">
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <Input
              label="Email or Phone"
              placeholder="Enter your username or username"
              name="email"
              value={formData.email}
              onChange={handleFormInputChange}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleFormInputChange}
            />
            <Input
              label="role"
              placeholder="Enter your role"
              name="role"
              value={formData.role}
              onChange={handleFormInputChange}
            />
            <Button variant="primary" rounded="sm" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
