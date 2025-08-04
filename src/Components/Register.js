import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Custom-Style/login.css';

function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost/kotong-web-crud/api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.success) {
      alert("Register berhasil, silakan login!");
      navigate('/login');
    } else {
      alert(data.message || 'Gagal mendaftar');
    }
  };

  return (
    <div className="register-page">
        <h2 className="text-center mb-4 fw-bold text-white greeting">Selamat Datang di KoTong!</h2>
        <div className="register-box">
            <h2 className="text-center mb-4 fw-bold text-white">Register</h2>
            <form onSubmit={handleRegister}>
                <input className="form-control mb-3" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
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
                <button type="button" className="btn btn-outline-light" onClick={() => setShowPassword(!showPassword)}>
                    <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
                </button>
                </div>
                <button type="submit" className="btn btn-success w-100">Register</button>
            </form>
            <p className="text-center mt-3 text-white">
                Sudah punya akun? <Link to="/login">Login</Link>
            </p>
        </div>
        <p className="text-white mt-3">KoTong - Copyright by Calz.</p>
    </div>
  );
}

export default Register;
