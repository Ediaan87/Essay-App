import React from "react";
import { Link } from "react-router-dom";
import { LoginForm } from "@wasp/auth/forms/Login";

export default function Login() {
  return (
    <div>
      <LoginForm
        appearance={{
          colors: {
            brand: 'var(--auth-form-brand)',
            brandAccent: 'var(--auth-form-brand-accent)',
            submitButtonText: 'var(--auth-form-submit-button-text-color)',
          }
        }}
      />
      <div className="mt-4 text-center">
        If you don't have an account go to{" "}
        <Link to="/signup" className="text-primary-500 hover:text-primary-800">
          sign up
        </Link>
      </div>
    </div>
  );
}