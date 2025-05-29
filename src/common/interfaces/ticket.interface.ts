export interface Ticket {
  Area: object;
  Asignado_a: Array<{
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  }>;
  Resuelto_por: {
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  };
  Cerrado_por: {
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  };
  Cliente: {
    Nombre: string;
    Correo: string;
    Telefono: string;
    Extension: string;
    Ubicacion: string;
    Direccion_General: { Direccion_General: string; _id: string };
    direccion_area: { direccion_area: string; _id: string };
    Dependencia: { Dependencia: string; _id: string };
  };
  Creado_por: {
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  };
  Descripcion: string;
  Estado: { Estado: string; _id: string };
  Fecha_hora_cierre: string;
  Fecha_hora_creacion: string;
  Fecha_hora_resolucion: string;
  Fecha_hora_ultima_modificacion: string;
  Fecha_limite_resolucion_SLA: string;
  Fecha_limite_respuesta_SLA: string;
  Files: Array<{ _id: string; name: string; url: string }>;
  Historia_ticket: Array<{
    _id: string;
    Fecha: string;
    Mensaje: string;
    Titulo: string;
    Nombre: { Nombre: string };
  }>;
  Id: string;
  Medio: { Medio: string; _id: string };
  NumeroRec_Oficio: string;
  Numero_Oficio: string;
  Reasignado_a?: Array<{
    _id: string;
    Nombre: string;
    Correo: string;
    Area: Array<{ _id: string; Area: string }>;
  }>;
  Subcategoria: {
    Servicio: string;
    Categoría: string;
    Subcategoria: string;
    Tipo: string;
    Prioridad: number;
    Equipo: { _id: string; Area: string };
    Descripcion_prioridad: string;
  };
  _id: string;
  createdAt: string;
  standby: boolean;
  updatedAt: string;
  vistoBueno: boolean;
  Descripcion_cierre: string;
  PendingReason: string;
  Respuesta_cierre_reasignado: string;
}
