import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      toast.success("✅ Login berhasil!");
      console.log("Login Response:", response.data);

      // Simpan token / redirect jika diperlukan
      // localStorage.setItem("token", response.data.token);
    } catch (error) {
      const msg = error.response?.data?.error || error.message;
      toast.error(`❌ Gagal login: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card bg-white p-5 shadow"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "15px",
        }}
      >
        <h3 className="text-center mb-4 text-success">
          <i className="bi bi-box-arrow-in-right me-2"></i>Sign In
        </h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3 input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill"></i>
            </span>
            <input
              type="email"
              className="form-control fs-5"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4 input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control fs-5"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="text-muted small mb-3 text-center">
            Belum punya akun? <a href="#">Sign up</a>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-bold fs-5"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" />
                Logging in...
              </>
            ) : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
