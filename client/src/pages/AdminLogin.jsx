import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

 const login = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/admin/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      // Save JWT
      localStorage.setItem("token", data.token);

      // Redirect to Admin Dashboard
      navigate("/admin", { replace: true });
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Login Failed");
  }
};

  return (
    <div className="admin-login">
      <div className="login-card">

        <h1>🍽️ Food Lovers</h1>

        <h2>Admin Login</h2>

        <p>Restaurant Management Portal</p>

        <form onSubmit={login}>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;