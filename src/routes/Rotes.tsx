import React, {Fragment, useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MenuNav from "../components/menu_nav/MenuNav";
import Cartelera from "../pages/cartelera/Cartelera";
import Comidas from "../pages/comidas/Comidas";
import Proximamente from "../pages/proximamente/Proximamente";
import Error404 from "../pages/Error404/Error404";
import VisualizarPelicula from "../pages/visualizar_pelicula/VisualizarPelicula";
import "../assets/css/style.css";
import SelectParametros from "../components/select_parametros/SelectParametros";
import PiePagina from "../components/pie_pagina/PiePagina";
import Categorias from "../pages/categorias/Categorias";
import '../assets/css/style.css';
import Registrar from "../pages/registrar/Registrar";
import {useTranslation} from "react-i18next";
import {namespaces} from "../i18n/i18n.constants";
import Login from "../components/login/Login";
import Perfil from "../pages/perfil/Perfil";
import BuscarPelicula from "../pages/buscar_pelicula/BuscarPelicula";
import LocalidadCompra from "../pages/localidad_compra/LocalidadCompra";
import UbicacionCompra from "../pages/ubicacion_compra/UbicacionCompra";
import MenuCompra from "../components/menu_compra/MenuCompra";
import PagoCompra from "../pages/pago_compra/PagoCompra";

const Rotes = () => {

    const common: any = useTranslation(namespaces.common).t;
    const [estadoParametros, setEstadoParametros] = React.useState<boolean>(false);
    const [estadoLogin, setEstadoLogin] = React.useState<boolean>(false);

    useEffect(() => {
        document.title = common("title");
        if (window.localStorage.getItem('params') === null) {
            setEstadoParametros(true);
            setEstadoLogin(false);
        }
        if (window.localStorage.getItem('usuario') !== null
            && window.localStorage.getItem('USER_KEY') !== null) {
            setEstadoLogin(false);
        } else {
            setEstadoLogin(true);
        }
    }, []);


    return (
        <BrowserRouter>
            <MenuNav/>
            <main className="margin-container">
                <Routes>
                    <Route path="/" element={
                        <Fragment>
                            <Cartelera/>
                            <Login estado={estadoLogin} exit={() => setEstadoLogin(false)}/>
                        </Fragment>
                    }/>
                    <Route path="/catelera" element={<Cartelera/>}/>
                    <Route path="/comidas" element={<Categorias/>}/>
                    <Route path="/comidas/:comida" element={<Comidas/>}/>
                    <Route path="/proximamente" element={<Proximamente/>}/>
                    <Route path="/peliculas/:titulo" element={<VisualizarPelicula/>}/>
                    <Route path="/*" element={<Error404/>}/>
                    <Route path="*" element={<Error404/>}/>
                    <Route path="/perfil" element={<Perfil/>}/>
                    <Route path="/registrar" element={<Registrar/>}/>
                    <Route path="/compra" element={
                        <main className="md:flex">
                            <MenuCompra/>
                            <LocalidadCompra/>
                        </main>
                    }/>
                    <Route path="/compra/localidad" element={
                        <main className="md:flex">
                            <MenuCompra/>
                            <LocalidadCompra/>
                        </main>
                    }/>
                    <Route path="/compra/ubicacion" element={
                        <main className="md:flex">
                            <MenuCompra/>
                            <UbicacionCompra/>
                        </main>
                    }/>
                    <Route path="/compra/pago" element={
                        <main className="md:flex">
                            <MenuCompra/>
                            <PagoCompra/>
                        </main>
                    }/>
                    <Route path="/buscar/:titulo" element={<BuscarPelicula/>}/>
                </Routes>
                <SelectParametros estado={estadoParametros} opcional={false} exit={() => null}/>
            </main>
            <PiePagina/>
        </BrowserRouter>
    )
}

export default Rotes;