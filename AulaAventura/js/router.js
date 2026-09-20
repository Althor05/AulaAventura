window.Router = {
    routes: {},
    currentRoute: null,
    container: null,

    init(containerId) {
        this.container = document.getElementById(containerId);
        window.addEventListener('hashchange', () => this.handleRouting());
    },

    addRoute(path, template, controller) {
        this.routes[path] = { template, controller };
    },

    navigate(path) {
        window.location.hash = path;
    },

    handleRouting() {
        let path = window.location.hash.slice(1) || '/';
        const route = this.routes[path];
        
        if (route) {
            this.container.innerHTML = route.template();
            if (route.controller) {
                // Dar tiempo al DOM para renderizar antes de vincular eventos
                setTimeout(() => route.controller(), 0);
            }
            this.currentRoute = path;
        } else {
            console.warn(`Ruta ${path} no encontrada. Redirigiendo a /`);
            this.navigate('/');
        }
    }
};
