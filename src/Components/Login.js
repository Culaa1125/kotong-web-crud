import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SplashScreen from "./SplashScreen";
import './Custom-Style/login.css';

function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost/kotong-web-crud/api/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => {
          navigate("/");
        }, 2500); // Delay untuk splash screen
      } else {
        setLoading(false);
        alert(data.message || "Login gagal");
      }
    } catch (error) {
      setLoading(false);
      alert("Terjadi kesalahan saat login.");
    }
  };

  if (loading) return <SplashScreen />;

  return (
    <div className="login-page">
        <h2 className="text-center mb-4 fw-bold text-white greeting">Selamat Datang di KoTong!</h2>
        <div className="login-box">
        <h2 className="text-center mb-4 fw-bold text-white">Login</h2>
        <form onSubmit={handleLogin}>
            <input
            className="form-control mb-3"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            />
            <div className="input-group mb-3">
            <input
                className="form-control"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />
            <button
                type="button"
                className="btn btn-outline-light"
                onClick={() => setShowPassword(!showPassword)}
            >
                <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
            </button>
            </div>
            <button type="submit" className="btn btn-primary w-100">
            Login
            </button>
        </form>
        <p className="text-center mt-3 text-white">
            Belum punya akun? <Link to="/register">Register</Link>
        </p>
        </div>
        <p className="text-white mt-3">KoTong - Copyright by Calz.</p>
    </div>
  );
}

export default Login;
