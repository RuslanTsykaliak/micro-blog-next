"use client";

import { useState } from "react";
import styles from "./AddComment.module.css";

export const Form = ({ onSubmit }: { onSubmit: any }) => {
  const [comment, setComment] = useState("");

  return (
    <form
      action={onSubmit}
      className={styles.form}
      onSubmit={() => {
        setComment(""); // Clear the comment input field when the form is submitted.
      }}
    >
      <input
        required // Make the input field required, ensuring the user enters a comment.
        name="comment"
        className={styles.input}
        value={comment}
        onChange={(e) => setComment(e.target.value)} // Handle input changes and update the 'comment' state.
      />


      <input type="submit" value="Add comment" className={styles.btn} />
    </form>
  );
};
