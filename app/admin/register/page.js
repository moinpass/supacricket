"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";

export default function AdminRegister() {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const clubName = e.target.clubName.value;
    const logo = e.target.logo.value;
    const securityCode = e.target.securityCode.value;

    const { data, error } = await supabase
      .from("admins")
      .insert([
        {
          full_name: fullName,
          email: email,
          password: password,
          club_name: clubName,
          logo: logo,
          security_code: securityCode,
        }
      ]);

    setLoading(false);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Admin registered successfully");
      e.target.reset();
    }
  };

  return (
    <div style={{
      maxWidth: "400px",
      margin: "40px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      background: "#fafafa"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Admin Registration
      </h2>

      <form onSubmit={handleRegister}>
        <label>Full Name</label>
        <input name="fullName" required className="input" />

        <label>Email</label>
        <input name="email" type="email" required className="input" />

        <label>Password</label>
        <input name="password" type="password" required className="input" />

        <label>Club Name</label>
        <input name="clubName" required className="input" />

        <label>Logo URL (optional)</label>
        <input name="logo" className="input" />

        <label>Security Code</label>
        <input name="securityCode" required className="input" />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "15px",
            background: "#0070f3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {loading ? "Registering..." : "Register Admin"}
        </button>
      </form>
    </div>
  );
}
