import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";
import { authConfig } from "../Modal/auth";

export default async function RegistrationPage() {
  const session = await getServerSession(authConfig);

  // Check if the user is authenticated
  if (session !== null) {
    redirect("/blog");
  }

  return <RegisterForm />;
}
