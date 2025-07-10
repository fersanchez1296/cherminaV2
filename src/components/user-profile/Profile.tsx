"use client";
import React, { useEffect, useState } from "react";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { getProfileInfo } from "@/services/profileService";
import { data } from "./intrface";
import { useLoadingStore } from "@/stores/loadingStore";
import { useNotification } from "@/context/NotificationProvider";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const ProfileComponent = () => {
  const setLoading = useLoadingStore((state) => state.setLoading);
  const { showNotification } = useNotification();
  const router = useRouter()
  const [profileData, setProfileData] = useState<data>({
    profile: {
      _id: "",
      Nombre: "",
      Correo: "",
      isActive: false,
      Area: [{ _id: "", Area: "" }],
      Username: "",
      Direccion_General: { Direccion_General: "" },
      Dependencia: { Dependencia: "" },
      Direccion: {
        Pais: "",
        Ciudad: "",
        codigoPostal: "",
      },
      Extension: "",
      Puesto: { Puesto: "" },
      Telefono: "",
      Ubicacion: "",
    },
  });

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const result = await getProfileInfo();
      if (result.data) setProfileData(result.data);
    } catch (error) {
      const message =
        error.response?.data?.desc || "Ocurrió un error inesperado.";
      showNotification("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      <UserMetaCard profile={profileData} />
      <UserInfoCard profile={profileData} onProfileUpdated={fetchProfileData} />
      {/* <UserAddressCard profile={profileData} /> */}
      <Button size="sm" variant={"warning"} onClick={() => router.push("change-password")}>
        Cambiar Contraseña
      </Button>
    </>
  );
};

export default ProfileComponent;
