"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f9fafb" }}>
      <nav
        style={{
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 24px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>
          AI Code Review
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}
          >
            {user?.name}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "6px 14px",
              backgroundColor: "transparent",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              fontSize: "14px",
              cursor: "pointer",
              color: "#111827",
              fontWeight: "500",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main
        style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "4px",
            }}
          >
            Welcome back, {user?.name}
          </h2>
          <p style={{ color: "#374151", fontSize: "14px" }}>
            Your AI-powered code review tool is ready.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Total reviews
            </p>
            <p
              style={{ fontSize: "28px", fontWeight: "600", color: "#111827" }}
            >
              0
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              This week
            </p>
            <p
              style={{ fontSize: "28px", fontWeight: "600", color: "#111827" }}
            >
              0
            </p>
          </div>
          <div
            style={{
              backgroundColor: "white",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "20px",
            }}
          >
            <p
              style={{
                fontSize: "13px",
                color: "#6b7280",
                marginBottom: "4px",
              }}
            >
              Languages used
            </p>
            <p
              style={{ fontSize: "28px", fontWeight: "600", color: "#111827" }}
            >
              0
            </p>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#f3f4f6",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "24px",
            }}
          >
            {"</>"}
          </div>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "8px",
            }}
          >
            No reviews yet
          </h3>
          <p
            style={{ color: "#374151", fontSize: "14px", marginBottom: "24px" }}
          >
            Code submission is coming in Week 2. Check back soon.
          </p>
          <div
            style={{
              display: "inline-block",
              padding: "8px 16px",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
              borderRadius: "6px",
              fontSize: "14px",
              color: "#15803d",
              fontWeight: "500",
            }}
          >
            ✓ Auth working
          </div>
        </div>
      </main>
    </div>
  );
}
