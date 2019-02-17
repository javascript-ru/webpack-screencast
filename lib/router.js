import renderPage from 'utils/renderPage';

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

  route() {
    const activeRoute = decodeURI(window.location.pathname)
      .replace(/^\/|\/$/, '')
      .replace(/\?.*$/, '');

    if (this.currentRoute === activeRoute) return;
    this.currentRoute = activeRoute;

    const newRoute = this.routes
      .find(({route}) => typeof route === 'string' ? activeRoute === route : activeRoute.match(route));

    if (newRoute) {
      renderPage(newRoute.page, this.currentRoute);
    } else if (this.notFoundPage) {
      renderPage(this.notFoundPage, this.currentRoute);
    }
  }

  navigate(path) {
    history.pushState(null, null, path);
    this.route();
  }

  addRoute(route, page) {
    this.routes.push({route, page});
    return this;
  }

  setNotFoundPage(page) {
    this.notFoundPage = page;
    return this;
  }

  listen() {
    window.addEventListener('popstate', () => this.route());
    this.route();
  }
};
