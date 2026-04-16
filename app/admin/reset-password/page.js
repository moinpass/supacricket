"use client";

import { useState } from "react";
import { supabase } from "@/supabaseClient";

export default function AdminResetPassword() {
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;
    const securityCode = e.target.securityCode.value;
    const newPassword = e.target.newPassword.value;

    // 1️⃣ Check if admin exists
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

    // 2️⃣ Check security code
    if (admin.security_code !== securityCode) {
      setLoading(false);
      alert("Incorrect security code");
      return;
    }

    // 3️⃣ Update password
    const { error: updateError } = await supabase
      .from("admins")
      .update({ password: newPassword })
      .eq("email", email);

    setLoading(false);

    if (updateError) {
      alert("Error updating password: " + updateError.message);
    } else {
      alert("Password reset successfully");
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
        Admin Reset Password
      </h2>

      <form onSubmit={handleReset}>
        <label>Email</label>
        <input name="email" type="email" required className="input" />

        <label>Security Code</label>
        <input name="securityCode" required className="input" />

        <label>New Password</label>
        <input name="newPassword" type="password" required className="input" />

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
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
