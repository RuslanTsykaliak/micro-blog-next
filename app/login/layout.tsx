import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Blog | Login",
  description: "Test task - Blog.",
};

export default function LoginLayout({children}: {children: React.ReactNode}) {
  return <>{children}</>;
}
