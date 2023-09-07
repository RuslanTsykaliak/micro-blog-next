import type {Metadata} from "next";
import {getServerSession} from "next-auth";

import {authConfig} from "@/configs/auth";

export const metadata: Metadata = {
  title: "Blog | Main",
  description: "Test task - Blog.",
};

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);

  return <>{children}</>;
}
