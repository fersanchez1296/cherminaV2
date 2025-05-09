import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chermina - Iniciar Sesión",
  description: "Página de inicio de sesión del sistema Chermina",
};

export default function SignIn() {
  return <SignInForm />;
}
