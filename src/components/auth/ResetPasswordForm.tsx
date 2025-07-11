"use client";

import React from "react";
import Label from "../form/Label";
import Input from "@/components/form/input/InputField";
import { useNotification } from "@/context/NotificationProvider";
import { useLoadingStore } from "@/stores/loadingStore";
import { Controller, useForm } from "react-hook-form";
import { changePassword } from "@/services/userService";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ResetPasswordForm() {
  const { handleSubmit, control, watch } = useForm();
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  const { showNotification } = useNotification();
  const setLoading = useLoadingStore((state) => state.setLoading);
  const router = useRouter();
  const newPassword = watch("newPassword");

  const handleSave = async (data) => {
    try {
      setLoading(true);
      const result = await changePassword(userId, data);
      if (result.data && result.status === 200) {
        router.back();
        showNotification(
          "Éxito",
          result.data?.message || "Operación exitosa",
          "success"
        );
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Ocurrió un error inesperado.";
      showNotification("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md pt-10 mx-auto">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg
            className="stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M12.7083 5L7.5 10.2083L12.7083 15.4167"
              stroke=""
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Regresar
        </button>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Cambiar contraseña
          </h1>
        </div>
        <div>
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="space-y-5">
              {/* Contraseña actual */}
              <div>
                <Label>
                  Contraseña Actual<span className="text-error-500">*</span>
                </Label>
                <Controller
                  name="Password"
                  control={control}
                  rules={{ required: "Este campo es obligatorio" }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <Input
                      type="password"
                      id="current-password"
                      placeholder="Contraseña Actual"
                      {...field}
                      error={!!fieldState.error}
                      hint={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              {/* Nueva contraseña */}
              <div>
                <Label>
                  Nueva Contraseña<span className="text-error-500">*</span>
                </Label>
                <Controller
                  name="newPassword"
                  control={control}
                  rules={{
                    required: "Este campo es obligatorio",
                    minLength: {
                      value: 6,
                      message: "Debe tener al menos 6 caracteres",
                    },
                  }}
                  defaultValue=""
                  render={({ field, fieldState }) => (
                    <Input
                      type="password"
                      id="new-password"
                      placeholder="Nueva Contraseña"
                      {...field}
                      error={!!fieldState.error}
                      hint={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              {/* Repetir contraseña */}
              <div>
                <Label>
                  Repite la Nueva Contraseña
                  <span className="text-error-500">*</span>
                </Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Este campo es obligatorio",
                    validate: (value) =>
                      value === newPassword || "Las contraseñas no coinciden",
                  }}
                  render={({ field, fieldState }) => (
                    <Input
                      type="password"
                      id="repeat-new-password"
                      placeholder="Repite tu Nueva Contraseña"
                      {...field}
                      error={!!fieldState.error}
                      hint={fieldState.error?.message}
                    />
                  )}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600"
                >
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
