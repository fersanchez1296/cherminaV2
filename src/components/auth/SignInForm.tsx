"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Notification from "../ui/notification/Notification";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
export default function SignInForm() {
  const router = useRouter();
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [login, setLogin] = useState(false);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogin(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        Username,
        Password,
      });

      if (result?.ok) {
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
        return setSuccessMessage("Bienvenido a Chermina");
      } else {
        return setErrorMessage("Credenciales inválidas");
      }
    } catch (error) {
      return setErrorMessage("Ocurrio un error al iniciar sesion");
    } finally {
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      setLogin(false);
    }
  };
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Iniciar Sesión
            </h1>
          </div>
          <div>
            <form onSubmit={handleLogin}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Usuario <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    defaultValue={Username}
                    placeholder="USuario123$"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <Label>
                    Contraseña <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      defaultValue={Password}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div>
                  {login ? (
                    <>
                      <Button className="w-full" size="sm" type="submit">
                        Iniciar Sesión
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full" size="sm" type="submit">
                      Iniciar Sesión
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {successMessage && (
        <div className="flex justify-end w-full">
          <Notification
            variant="success"
            title="Operacion exitosa"
            description={successMessage}
          />
        </div>
      )}
      {errorMessage && (
        <div className="flex justify-end w-full">
          <Notification
            variant="error"
            title="Ocurrió un error"
            description={errorMessage}
          />
        </div>
      )}
    </div>
  );
}
