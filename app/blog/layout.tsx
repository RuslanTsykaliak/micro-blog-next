import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "../Modal/auth";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog posts.",
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Retrive the user session on the server side
  const session = await getServerSession(authConfig)

  return <>{children}</>
}
