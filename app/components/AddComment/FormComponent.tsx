"use client";

import {useState} from "react";

import styles from "./AddComment.module.css";

export const Form = ({onSubmit}: {onSubmit: any}) => {
  const [comment, setComment] = useState("");

  return (
    <form
      action={onSubmit}
      className={styles.form}
      onSubmit={() => {
        setComment("");
      }}
    >
      <input
        required
        name="comment"
        className={styles.input}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <input type="submit" value="Add comment" className={styles.btn} />
    </form>
  );
};
