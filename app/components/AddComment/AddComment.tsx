import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

import { authConfig } from "@/app/Modal/auth";
import { Form } from "./FormComponent";

import styles from "./AddComment.module.css";

const { NEXTAUTH_URL } = process.env;

export const AddComment = async ({ id }: { id: string }) => {
  const session = await getServerSession(authConfig);

  const ownerName = session?.user.data.email;

  const onSubmit = async (form: FormData) => {
    "use server";

    const _id = id;
    const comment = form.get("comment")?.toString();

    const res = await fetch(`${NEXTAUTH_URL}/api/post/comment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id,
        data: { owner: ownerName, comment },
      }),
    });

    if (res.ok) {
      revalidatePath("/blog");
    }
  };

  return (
    <div className={styles.form_wrap}>
      <Form onSubmit={onSubmit} />
    </div>
  );
};
