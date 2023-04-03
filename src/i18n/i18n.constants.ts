export interface I18n {
    value: string;
    label: string;
}

export const namespaces = {
    pages: {
        menu_nav: "pages.menu_nav",
        home: "pages.home",
        cartelera: "pages.cartelera",
        pie_de_pagina: "pages.pie_de_pagina",
        peliculas: "pages.peliculas",
        proximamente: "pages.proximamente",
        comidas: "pages.comidas",
        login: "pages.login",
        registro: "pages.registro",
        perfil: "pages.perfil",
        buscar_pelicula: "pages.buscar_pelicula",
        compra: "pages.compra",
    },
    common: "common",
};

export const languages = {
    es: {value: "es", label: "Español"},
    en: {value: "en", label: "English"},
}