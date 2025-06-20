export interface Usuario {
    usuario?: {
        Area: Array<{ _id: string; Area: string }>;
        Nombre: string;
        Correo: string;
        Rol: { _id: string; Rol: string };
        Tickets_resueltos: { a_tiempo: number; fuera_tiempo: number };
        Username: string;
        _id: string;
        isActive: boolean;
        Telefono?: string;
        Extension?: string;
        Puesto?: { _id: string, Puesto: string };
        Dependencia?: { _id: string; Dependencia: string };
        Direccion_General?: { _id: string; Direccion_General: string };
        Ubicacion?: string;
        Celula: { label: string; value: string }[];
        Direccion?: {
            Pais?: string;
            Ciudad?: string;
            codigoPostal?: string;
        };
    };
}