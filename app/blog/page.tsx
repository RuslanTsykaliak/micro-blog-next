import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { AddComment } from "../components/AddComment/AddComment";
import { CreatePostForm } from "../components/CreatePostForm/CreatePostForm";
import { authConfig } from "@/app/Modal/auth"
import styles from "./blog.module.css";

const { NEXTAUTH_URL } = process.env;

type Post = {
  _id: string;
  title: string;
  description: string;
  owner: string;
  comments: [];
};

export default async function FeedPage() {
  // Retrieve the user session on the server side
  const session = await getServerSession(authConfig);

  // Check if the user is authenticated
  // if (session?.user.status === "unauthenticated") {
  //   redirect("/login");
  // }

  // Fetch a list of posts from the server
  const res = await fetch(`${NEXTAUTH_URL}/api/post/authlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
    cache: "no-store",
  });

  const { posts } = await res.json();

  // Render the FeedPage component with posts, create post form, adn comment function
  return (
    <section className={styles.container}>
      {session && session.user.data.role === "author" && (
        <div>
          <CreatePostForm />
        </div>
      )}

      {/* Render the list of post and comments */}
      <ul className={styles.posts_wrap}>
        {posts &&
          posts.map((post: Post) => (
            <li key={post._id} className={styles.post_item}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>

              {/* Render the list of comments for each post */}
              <ul className={styles.comments_wrap}>
                {post.comments.map(({ comment, owner }, i) => (
                  <li key={comment + owner + i}>
                    <p>{comment}</p>
                    <p
                      className={styles.comment_author}
                    >{`Author: ${owner}`}</p>
                  </li>
                ))}
              </ul>
              {/* Render the AddComment component for commentators */}
              {session && session.user.data.role === "commentator" && (
                <AddComment id={post._id} />
              )}
            </li>
          ))}
      </ul>
    </section>
  );
}
