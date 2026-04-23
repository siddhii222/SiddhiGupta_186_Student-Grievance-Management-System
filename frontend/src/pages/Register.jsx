import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      alert("Registered");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.msg || "Error");
    }
  };

  return (
    <div className="box">
      <h2>Register</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input placeholder="Name" onChange={(e)=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Email" onChange={(e)=>setForm({...form,email:e.target.value})}/>
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form,password:e.target.value})}/>
        <button>Register</button>
      </form>

      <p onClick={()=>navigate("/")}>Already user? Login</p>
    </div>
  );
}