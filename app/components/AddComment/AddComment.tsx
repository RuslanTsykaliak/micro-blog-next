import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authConfig } from "@/app/Modal/auth";
import { Form } from "./FormComponent";
import styles from "./AddComment.module.css";

const { NEXTAUTH_URL } = process.env;

export const AddComment = async ({ id }: { id: string }) => {
  // Retrieve the user's session.
  const session = await getServerSession(authConfig);

  // Get the owner's email from the user's session.
  const ownerName = session?.user.data.email;

  // Define an onSubmit function to handle form submission.
  const onSubmit = async (form: FormData) => {
    // Ensure that this code is executed on the server.
    "use server";

    // Extract the post ID and comment from the form data.
    const _id = id;
    const comment = form.get("comment")?.toString();

    // Send a PUT request to the API endpoint to add a comment.
    const res = await fetch(`${NEXTAUTH_URL}/api/post/comment`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _id,
        data: { owner: ownerName, comment },
      }),
    });

    // If the request is successful (status code 200), trigger a revalidation of the "/blog" path.
    if (res.ok) {
      revalidatePath("/blog");
    }
  };

  return (
    <div className={styles.form_wrap}>
      {/* Render a form component and pass the onSubmit function. */}
      <Form onSubmit={onSubmit} />
    </div>
  );
};