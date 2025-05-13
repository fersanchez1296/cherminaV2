"use client";
import React, { useEffect, useState } from "react";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { getProfileInfo } from "@/services/profileService";
import { data } from "./intrface";
const ProfileComponent = () => {
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
      Puesto: "",
      Telefono: "",
      Ubicacion: "",
    },
  });

  useEffect(() => {
    getProfileInfo().then((p) => setProfileData(p.data));
  }, []);
  return (
    <>
      <UserMetaCard profile={profileData} />
      <UserInfoCard profile={profileData} />
      <UserAddressCard profile={profileData} />
    </>
  );
};

export default ProfileComponent;
