export interface data {
  profile: {
    _id: string;
    Nombre: string;
    Correo: string;
    isActive: boolean;
    Area: { _id: string; Area: string }[];
    Username: string;
    Direccion_General: {
      Direccion_General: string;
    };
    Dependencia: {
      Dependencia: string;
    };
    Direccion: {
      Pais: string;
      Ciudad: string;
      codigoPostal: string;
    };
    Extension: string;
    Puesto: {Puesto: string};
    Telefono: string;
    Ubicacion: string;
  };
}
