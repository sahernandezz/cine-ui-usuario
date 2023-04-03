import http from './conf';
import {Usuario} from "../model/Usuario";
import getToken from "./token-config";
import {TipoDocumento} from "../model/TipoDocumento";

export const registrarUsuario = async (usuario: Usuario) => {
    return await http.post('/usuario/api/v1/registrar', usuario, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const cambiarClaveUsuario = async (usuario: { id: number | null, clave: string }) => {
    return await http.post('/usuario/api/v1/cambiar_clave', usuario, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

export const cambiarInfoUsuario = async (
    usuario: {
        id: number | null, nombre: string, apellido: string, telefono: string, correo: string,
        tipoDocumento: TipoDocumento, numeroDocumento: string, direccion: string
    }) => {
    return await http.post('/usuario/api/v1/cambiar_info', usuario, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

export const puntosPorUsuario = async (usuario: Usuario) => {
    return await http.get(`/cliente/api/v1/puntos/${usuario.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

export const facturasComida = async (usuario: Usuario) => {
    return await http.get(`/cliente/api/v1/facturas/comida/${usuario.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}

export const facturasFuncion= async (usuario: Usuario) => {
    return await http.get(`/cliente/api/v1/facturas/funcion/${usuario.id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
        }
    });
}