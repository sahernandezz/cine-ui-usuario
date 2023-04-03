import {TipoDocumento} from "./TipoDocumento";

export interface Usuario {
    id: number | null;
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
    clave: string;
    tipoDocumento: TipoDocumento;
    pt: number | null;
    numeroDocumento: string;
}