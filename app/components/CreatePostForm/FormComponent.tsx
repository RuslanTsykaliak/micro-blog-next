"use client";

import {useState} from "react";

import styles from "./CreatePostForm.module.css";

export const Form = ({onSubmit}: {onSubmit: any}) => {
  const [title, setTitle] = useState("");
  const [description, setDdscription] = useState("");

  return (
    <form
      action={onSubmit}
      className={styles.form}
      onSubmit={() => {
        setDdscription("");
        setTitle("");
      }}
    >
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

      <label className={styles.label}>
        <p>Description</p>
        <textarea
          value={description}
          onChange={(e) => setDdscription(e.target.value)}
          name="description"
          required
          minLength={4}
          maxLength={500}
          className={styles.descr}
        />
      </label>

      <input type="submit" value="Add post" className={styles.btn} />
    </form>
  );
};
