export const formatoValor = (valor: number, idioma: string, iso2: string, iso3: string) => {
    return new Intl.NumberFormat(idioma + '-' + iso2.toUpperCase(), {
        style: 'currency',
        currency: iso3.toUpperCase()
    }).format(valor);
}