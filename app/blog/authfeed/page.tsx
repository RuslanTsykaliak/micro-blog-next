import {getServerSession} from "next-auth";
import { authConfig } from "@/app/Modal/auth";
import styles from "./authfeed.module.css";

const {NEXTAUTH_URL} = process.env;

export default async function AuthfeedPage() {
  // Retrieve the user session on the server side
  const session = await getServerSession(authConfig);

  // Get the owner's ID from the usre session
  const owner = session?.user.data._id;

  // Fetch the list of authorized posts
  const res = await fetch(`${NEXTAUTH_URL}/api/post/authlist`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({owner}),
    cache: "no-store",
  });

  // Parse the response to get the list of posts
  const {posts} = await res.json();

  // Render the component with the fetched posts
  return (
    <section>
      <ul className={styles.posts_wrap}>
        {posts &&
          posts.map((post: Post) => (
            <li key={post._id} className={styles.post_item}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>

              <ul className={styles.comments_wrap}>
                {post.comments.map(({comment, owner}, i) => (
                  <li key={comment + owner + i}>
                    <p>{comment}</p>
                    <p
                      className={styles.comment_author}
                    >{`Author: ${owner}`}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
    </section>
  );
}
