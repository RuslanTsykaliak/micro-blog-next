import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authConfig } from "@/app/Modal/auth";
import { Form } from "./FormComponent";

import styles from "./CreatePostForm.module.css";

const { NEXTAUTH_URL } = process.env;

export const CreatePostForm = async () => {
  const session = await getServerSession(authConfig);

  const userId = session?.user.data._id;

  const onSubmit = async (form: FormData) => {
    "use server";

    const title = form.get("title")?.toString();
    const description = form.get("description")?.toString();

    const res = await fetch(`${NEXTAUTH_URL}/api/post/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, owner: userId }),
    });

    if (res.ok) {
      revalidatePath("/blog");
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.title}>Add post</p>
        <div className={styles.form_wrap}>
          <Form onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};
