export default new class Router {
  constructor() {
    this.routes = [];

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      if (href && href.startsWith('/')) {
        event.preventDefault();
        this.navigate(href);
      }
    });
  }

  route(refresh) {
    const activeRoute = decodeURI(window.location.pathname)
      .replace(/^\/|\/$/, '')
      .replace(/\?.*$/, '');

    if (this.currentRoute === activeRoute && !refresh) return;
    this.currentRoute = activeRoute;

    const newRoute = this.routes
      .find(({route}) => typeof route === 'string' ? activeRoute === route : activeRoute.match(route));

    if (newRoute) {
      newRoute.handler(activeRoute);
    } else if (this.notFoundHandler) {
      this.notFoundHandler(activeRoute);
    }
  }

  navigate(path) {
    history.pushState(null, null, path);
    this.route();
  }

  addRoute(route, handler) {
    this.routes.push({route, handler});
    return this;
  }

  setNotFoundHandler(handler) {
    this.notFoundHandler = handler;
    return this;
  }

  listen() {
    window.addEventListener('popstate', () => this.route());
    this.route();
  }
};
