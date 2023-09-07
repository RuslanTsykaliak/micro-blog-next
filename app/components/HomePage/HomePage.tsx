import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styles from "./HomePage.module.css";

export const HomePage: FC = () => {
  return (
    <section className={styles.container}>
      <h1 className="visually-hidden">Blog</h1>
      <h2 className={styles.title}>Hi there!</h2>
      <div className={styles.content_box}>
        <div className={styles.descr_box}>
          <p className={styles.descr}>
          Welcome to our blog, where we share our thoughts, ideas, and discoveries on a wide range of topics. We&apos;re passionate about delving into everything around us, and we hope you will find something that piques your interest.
          </p>
          <p className={styles.descr}>
          Our articles are concise yet informative, and we always strive to bring fresh perspectives to each topic we touch. We hope you will read more and join us on this journey of exploration and discovery!
          </p>
          <p className={styles.descr}>
            We always welcome your comments and feedback, so do not hesitate to
            share your thoughts with us.
          </p>
          <p className={styles.descr}>
            Thank you for joining us on this journey of exploration and
            discovery!
          </p>
        </div>
        <Image
          src="/blog.webp"
          alt="blog"
          width="960"
          height="700"
          className={styles.img}
        />
      </div>
      <Link href="/registration" className={styles.start_btn}>
        Get Started
      </Link>
    </section>
  );
};
