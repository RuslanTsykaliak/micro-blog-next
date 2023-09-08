"use client";

import { useState } from "react";
import styles from "./CreatePostForm.module.css";

export const Form = ({ onSubmit }: { onSubmit: any }) => {
  // Define state variables for title and description.
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    // Render a form component with input fields for title and description.
    <form
      action={onSubmit}
      className={styles.form}
      onSubmit={() => {
        // Clear the input fields when the form is submitted.
        setDescription("");
        setTitle("");
      }}
    >
      {/* Input field for title */}
      <label className={styles.label}>
        <p>Title</p>
        <input
          required
          name="title"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      {/* Textarea for description */}
      <label className={styles.label}>
        <p>Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name="description"
          required
          minLength={4}
          maxLength={500}
          className={styles.descr}
        />
      </label>

      {/* Submit button */}
      <input type="submit" value="Add post" className={styles.btn} />
    </form>
  );
};
