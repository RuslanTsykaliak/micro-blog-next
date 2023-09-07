import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { authConfig } from "../Modal/auth";

export default async function RegistrationPage() {
  const session = await getServerSession(authConfig);

  if (session !== null) {
    redirect("/blog");
  }

  return <RegisterForm />;
}
