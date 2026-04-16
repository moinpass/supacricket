"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Fetch admin by email
    const { data: admin, error } = await supabase
      .from("admins")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !admin) {
      setLoading(false);
      alert("Admin not found");
      return;
    }

    // Compare password (plain text for now)
    if (admin.password !== password) {
      setLoading(false);
      alert("Incorrect password");
      return;
    }

    // SUCCESS → redirect
    alert("Login successful");
    router.push("/admin/dashboard"); // Change if needed
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
        Admin Login
      </h2>

      <form onSubmit={handleLogin}>
        <label>Email</label>
        <input name="email" type="email" required className="input" />

        <label>Password</label>
        <input name="password" type="password" required className="input" />

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
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
