import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authConfig } from "@/app/Modal/auth";
import { Form } from "./FormComponent";
import styles from "./CreatePostForm.module.css";

const { NEXTAUTH_URL } = process.env;

export const CreatePostForm = async () => {
  // Retrieve the user's session information from the server.
  const session = await getServerSession(authConfig);

  // Extract the user's ID from the session data.
  const userId = session?.user.data._id;

  // Define a function 'onSubmit' that handles form submission.
  const onSubmit = async (form: FormData) => {
    // Indicate that this code runs on the server side.
    "use server";

    // Extract the title and description from the form data.
    const title = form.get("title")?.toString();
    const description = form.get("description")?.toString();

    // Send a POST request to create a new post with the provided data.
    const res = await fetch(`${NEXTAUTH_URL}/api/post/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, owner: userId }),
    });

    // If the POST request is successful, revalidate the /blog page.
    if (res.ok) {
      revalidatePath("/blog");
    }
  };

  return (
    // Render a form for creating a new post.
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.title}>Add post</p>
        <div className={styles.form_wrap}>
          {/* Render the form component and pass the 'onSubmit' function as a prop. */}
          <Form onSubmit={onSubmit} />
        </div>
      </div>
    </section>
  );
};
