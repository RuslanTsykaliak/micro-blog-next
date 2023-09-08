"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./RegisterForm.module.css";
import { useState } from "react";

// Define a React component called RegisterForm
export const RegisterForm = () => {
  // Initialize form state using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsRegister>(); // Define form input types using generics

  const { push } = useRouter(); // Get the router instance

  const [error, setError] = useState(""); // Initialize error state

  // Define the submit handler for the registration form
  const onSubmit: SubmitHandler<InputsRegister> = async ({
    email,
    password,
    role,
  }) => {
    setError(""); // Clear any previous error messages

    try {
      // Send a POST request to the registration endpoint
      const res = await fetch(
        "https://micro-blog-next-lac.vercel.app/api/auth/register", // Replace with the actual endpoint URL
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
        }
      );

      const { data } = await res.json(); // Parse the response data

      // Check if a user with the same email already exists
      if (res.status === 409) {
        throw new Error("This user already exists");
      }

      // Check if the request was unsuccessful
      if (!res.ok) {
        throw new Error(`${res.statusText}`);
      }

      // If registration is successful, sign in the user
      if (res.status === 200) {
        const res = await signIn("login", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        // If the sign-in is successful, redirect the user to the blog page
        if (res?.ok) {
          push("/blog");
        }
      }
    } catch (e: any) {
      setError(`${e?.message}`); // Set the error message in case of an error
    }
  };

  // Render the registration form component
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>Registration</h1>
        {error && <p className={styles.err_text}>{error}</p>}
        <div className={styles.form_wrap}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {/* Email input field */}
            <label className={styles.label}>
              <p>Email</p>
              <input
                required
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                })}
                className={styles.input}
              />
              {errors.email && (
                <span className={styles.error}>Invalid email address</span>
              )}
            </label>

            {/* Password input field */}
            <label className={styles.label}>
              <p>Password</p>
              <input
                required
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 4,
                  maxLength: 8,
                })}
                className={styles.input}
              />
              {errors.password && (
                <span className={styles.error}>
                  The field is required and must contain from 4 to 8 characters
                </span>
              )}
            </label>

            {/* Role selection dropdown */}
            <label className={styles.label}>
              <p>Role</p>
              <select
                {...register("role", { required: true })}
                className={styles.input}
              >
                <option value="">Select...</option>
                <option value="author">Author</option>
                <option value="commentator">Commentator</option>
              </select>
              {errors.role && (
                <span className={styles.error}>This field is required</span>
              )}
            </label>

            {/* Submit button */}
            <input type="submit" value="Register" className={styles.btn} />
          </form>
          <div className={styles.img_wrap}>
            {/* Display an image */}
            <Image
              src="/register.png"
              alt="register"
              width="300"
              height="300"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
