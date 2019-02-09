export default new class Router {
  constructor() {
    this.routes = [];

    document.addEventListener('onclick', (event) => {
      let link = event.target.closest('a');
      if (link && !link.includes('://')) {
        event.preventDefault();
        this.navigate(link.getAttribute('href'));
      }
    });

  }

  route() {
    const activeRoute = decodeURI(window.location.pathname)
      .replace(/^\/|\/$/, '')
      .replace(/\?.*$/, '');

    if (this.currentRoute === activeRoute) return;

    this.currentRoute = activeRoute;

    const newRoute = this.routes.find(({route}) => {
      return typeof route === 'string' ? activeRoute === route : activeRoute.match(route);
    });

    if (newRoute) {
      newRoute.handler(activeRoute);
    } else if (this.fallbackHandler) {
      this.fallbackHandler(activeRoute);
    }
  }

  navigate(path) {
    history.pushState(null, null, path);
    this.route();
  }

  addRoute(route, handler) {
    this.routes.push({route, handler});
    return this;
  };

  setFallbackHandler(handler) {
    this.fallbackHandler = handler;
    return this;
  }

  listen() {
    window.addEventListener('popstate', () => this.route());
    this.route();
  };
};

