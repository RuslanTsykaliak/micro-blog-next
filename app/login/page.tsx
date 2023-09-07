import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "../components/LoginForm/LoginForm";
import { authConfig } from "../Modal/auth";

export default async function LoginPage() {
  const session = await getServerSession(authConfig);

  if (session !== null) {
    redirect("/blog");
  }

  return <LoginForm />;
}
