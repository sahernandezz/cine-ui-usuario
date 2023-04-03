export const cerrarSesion = () => {
    window.localStorage.removeItem('usuario');
    window.localStorage.removeItem('USER_KEY');
    window.location.href = '/';
}